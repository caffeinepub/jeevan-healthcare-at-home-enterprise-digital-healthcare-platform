import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let accessControlState = AccessControl.initState();
  include MixinStorage();
  include MixinAuthorization(accessControlState);

  public type ServiceName = Text;

  // Map for service name to icon
  let serviceIconMap = Map.empty<ServiceName, Text>();

  public type HealthcareRole = {
    #patient;
    #admin;
    #labExecutive;
    #phlebotomist;
    #corporateAdmin;
    #franchiseAdmin;
    #doctor;
  };

  public type BookedTime = {
    id : Nat;
    bookingId : Nat;
    timeUnix : Nat;
    sampleCollectionTime : Nat;
    urgencyLevel : Text;
    patientComments : Text;
    cateringPreference : Text;
  };

  public type UserProfile = {
    principal : Text;
    name : Text;
    email : Text;
    phone : Text;
    role : HealthcareRole;
    isActive : Bool;
    bookedServices : [Nat];
    bookedTimes : [BookedTime];
    sharedProfile : Bool;
    insuranceDetails : Text;
    documents : [Text];
    locationHistory : [Text];
  };

  public type SanitizedUserProfile = {
    name : Text;
    role : HealthcareRole;
    isActive : Bool;
  };

  public type Country = {
    id : Nat;
    name : Text;
    countryCode : Text;
    currency : Text;
    iso2 : Text;
    iso3 : Text;
    callingCode : Text;
    flagUrl : Text;
    isDefault : Bool;
    languageCode : Text;
  };

  public type DashboardStats = {
    totalOrders : Nat;
    activeOrders : Nat;
    completedOrders : Nat;
    totalUsers : Nat;
    totalPhlebotomists : Nat;
    pendingReports : Nat;
  };

  public type SampleCollection = {
    id : Nat;
    patientName : Text;
    address : Text;
    scheduledTime : Nat;
    status : Text;
    testNames : [Text];
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let bookings = Map.empty<Nat, Booking>();
  let services = Map.empty<Nat, Service.Service>();
  var nextServiceId = 1;
  let seoData = Map.empty<Nat, SeoData.Data>();
  var nextSeoId = 1;
  var contactInfo : ?ContactInfo.Info = null;
  var brandInfo : ?BrandInfo.Info = null;

  let defaultBrandInfo : BrandInfo.Info = {
    brandName = "Jeevan HealthCare at Home";
    logoUrl = "https://jeevanhealthcare.com/assets/logo.png";
    primaryColor = "#0A5EB0";
    secondaryColor = "#2F89D9";
    textColor = "#333333";
    backgroundColor = "#FFFFFF";
    fontFamily = "Century Gothic, Arial, sans-serif";
  };

  var configuration : ?Stripe.StripeConfiguration = null;

  public query ({ caller }) func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public query ({ caller }) func getUserRoleByPrincipal(callerPrincipal : Principal) : async HealthcareRole {
    if (caller != callerPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only query your own role");
    };

    switch (userProfiles.get(callerPrincipal)) {
      case (null) {
        Runtime.trap("User profile does not exist");
      };
      case (?profile) {
        profile.role;
      };
    };
  };

  public shared ({ caller }) func logout() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to logout");
    };
    ();
  };

  public query ({ caller }) func hasLabExecutiveCapabilities(callerPrincipal : Principal) : async Bool {
    if (caller != callerPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only query your own capabilities");
    };
    AccessControl.hasPermission(accessControlState, callerPrincipal, #user) or hasHealthcareRole(callerPrincipal, #labExecutive);
  };

  public query ({ caller }) func hasPhlebotomistRole(callerPrincipal : Principal) : async Bool {
    if (caller != callerPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only query your own role");
    };
    hasHealthcareRole(callerPrincipal, #phlebotomist);
  };

  func hasHealthcareRole(caller : Principal, requiredRole : HealthcareRole) : Bool {
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        profile.isActive and profile.role == requiredRole;
      };
    };
  };

  func requireAdminOrLabExecutive(caller : Principal) {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can perform this action");
    };
  };

  func hasAdminOrLabExecutiveAccess(caller : Principal) : Bool {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    isAdmin or isLabExec;
  };

  func requirePhlebotomist(caller : Principal) {
    if (not hasHealthcareRole(caller, #phlebotomist)) {
      Runtime.trap("Unauthorized: Only phlebotomists can perform this action");
    };
  };

  func hasAdminLabExecOrDoctorAccess(caller : Principal) : Bool {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);
    isAdmin or isLabExec or isDoctor;
  };

  func requireDoctor(caller : Principal) {
    if (not hasHealthcareRole(caller, #doctor)) {
      Runtime.trap("Unauthorized: Only doctors can perform this action");
    };
  };

  func getDoctorIdByPrincipal(principal : Principal) : ?Nat {
    for ((doctorId, doctor) in doctorProfiles.entries()) {
      switch (userProfiles.get(principal)) {
        case (?profile) {
          if (doctor.userId == Nat.fromText(profile.principal)) {
            return ?doctorId;
          };
        };
        case (null) {};
      };
    };
    null;
  };

  func isDoctorOwnerOfAppointment(caller : Principal, appointmentId : Nat) : Bool {
    switch (doctorAppointments.get(appointmentId)) {
      case (null) { false };
      case (?appointment) {
        switch (getDoctorIdByPrincipal(caller)) {
          case (null) { false };
          case (?doctorId) { appointment.doctorId == doctorId };
        };
      };
    };
  };

  func isCustomerOwnerOfAppointment(caller : Principal, appointmentId : Nat) : Bool {
    switch (doctorAppointments.get(appointmentId)) {
      case (null) { false };
      case (?appointment) {
        switch (getCustomerIdByPrincipal(caller)) {
          case (null) { false };
          case (?customerId) { appointment.customerId == customerId };
        };
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        if (existingProfile.role != profile.role) {
          Runtime.trap("Unauthorized: Cannot change your own role");
        };
      };
      case (null) {};
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func assignHealthcareRole(user : Principal, role : HealthcareRole) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    AccessControl.assignRole(accessControlState, caller, user, #user);

    switch (userProfiles.get(user)) {
      case (?existingProfile) {
        let updatedProfile : UserProfile = {
          name = existingProfile.name;
          email = existingProfile.email;
          phone = existingProfile.phone;
          role = role;
          isActive = existingProfile.isActive;
          bookedServices = existingProfile.bookedServices;
          bookedTimes = existingProfile.bookedTimes;
          sharedProfile = existingProfile.sharedProfile;
          insuranceDetails = existingProfile.insuranceDetails;
          documents = existingProfile.documents;
          locationHistory = existingProfile.locationHistory;
          principal = existingProfile.principal;
        };
        userProfiles.add(user, updatedProfile);
      };
      case (null) {
        Runtime.trap("User profile must be created before assigning role");
      };
    };
  };

  public shared ({ caller }) func setUserActiveStatus(user : Principal, isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (userProfiles.get(user)) {
      case (?existingProfile) {
        let updatedProfile : UserProfile = {
          name = existingProfile.name;
          email = existingProfile.email;
          phone = existingProfile.phone;
          role = existingProfile.role;
          isActive = isActive;
          bookedServices = existingProfile.bookedServices;
          bookedTimes = existingProfile.bookedTimes;
          sharedProfile = existingProfile.sharedProfile;
          insuranceDetails = existingProfile.insuranceDetails;
          documents = existingProfile.documents;
          locationHistory = existingProfile.locationHistory;
          principal = existingProfile.principal;
        };
        userProfiles.add(user, updatedProfile);
      };
      case (null) {
        Runtime.trap("User profile does not exist");
      };
    };
  };

  public query ({ caller }) func listAllUsers() : async [(Principal, UserProfile)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    userProfiles.toArray();
  };

  public query func previewGetAllUsers() : async [SanitizedUserProfile] {
    userProfiles.values().toArray().map(
      func(profile) {
        {
          name = profile.name;
          role = profile.role;
          isActive = profile.isActive;
        };
      }
    );
  };

  public query func previewGetMockUsers() : async [SanitizedUserProfile] {
    [
      { name = "Dr. Rajesh Kumar"; role = #admin; isActive = true },
      { name = "Priya Sharma"; role = #labExecutive; isActive = true },
      { name = "Amit Patel"; role = #phlebotomist; isActive = true },
      { name = "Sunita Reddy"; role = #patient; isActive = true },
      { name = "Vikram Singh"; role = #phlebotomist; isActive = true },
    ];
  };

  public query func previewGetDashboardStats() : async DashboardStats {
    {
      totalOrders = 247;
      activeOrders = 18;
      completedOrders = 229;
      totalUsers = 1543;
      totalPhlebotomists = 12;
      pendingReports = 5;
    };
  };

  public query func previewGetSampleCollections() : async [SampleCollection] {
    [
      {
        id = 1;
        patientName = "Ramesh Kumar";
        address = "Banjara Hills, Hyderabad";
        scheduledTime = 1704096000;
        status = "Assigned";
        testNames = ["Complete Blood Count", "Lipid Profile"];
      },
      {
        id = 2;
        patientName = "Lakshmi Devi";
        address = "Jubilee Hills, Hyderabad";
        scheduledTime = 1704099600;
        status = "On Way";
        testNames = ["Thyroid Profile", "HbA1c"];
      },
      {
        id = 3;
        patientName = "Srinivas Rao";
        address = "Madhapur, Hyderabad";
        scheduledTime = 1704103200;
        status = "Sample Collected";
        testNames = ["Liver Function Test"];
      },
    ];
  };

  public query func previewGetAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  public query func previewGetAllServices() : async [Service.Service] {
    services.values().toArray().filter(
      func(service) {
        service.isActive;
      }
    );
  };

  module Service {
    public type Category = {
      #primaryHealthcare;
      #medicalEquipment;
      #preventiveCare;
      #specializedCare;
    };

    public type Subcategory = {
      #doctorConsultation;
      #medicineDelivery;
      #labTests;
      #diagnostics;
      #nursingCare;
      #caregiverServices;
      #physiotherapy;
      #vaccination;
      #equipmentRental;
      #icuSetup;
      #healthCheckups;
      #corporateHealth;
      #specialistCare;
      #motherChildCare;
      #wellnessLifestyle;
      #b2bServices;
    };

    public type Service = {
      id : Nat;
      name : Text;
      category : Category;
      subcategory : Subcategory;
      description : Text;
      serviceIntro : Text;
      servicesIncluded : Text;
      targetAudience : Text;
      benefits : Text;
      seoKeywords : [Text];
      isActive : Bool;
      metaTitle : Text;
      metaDescription : Text;
    };
  };

  public shared ({ caller }) func addService(
    name : Text,
    category : Service.Category,
    subcategory : Service.Subcategory,
    description : Text,
    serviceIntro : Text,
    servicesIncluded : Text,
    targetAudience : Text,
    benefits : Text,
    seoKeywords : [Text],
    metaTitle : Text,
    metaDescription : Text,
  ) : async Nat {
    requireAdminOrLabExecutive(caller);

    let id = nextServiceId;
    let service : Service.Service = {
      id;
      name;
      category;
      subcategory;
      description;
      serviceIntro;
      servicesIncluded;
      targetAudience;
      benefits;
      seoKeywords;
      isActive = true;
      metaTitle;
      metaDescription;
    };
    services.add(id, service);
    nextServiceId += 1;
    id;
  };

  public shared ({ caller }) func updateService(
    id : Nat,
    name : Text,
    category : Service.Category,
    subcategory : Service.Subcategory,
    description : Text,
    serviceIntro : Text,
    servicesIncluded : Text,
    targetAudience : Text,
    benefits : Text,
    seoKeywords : [Text],
    metaTitle : Text,
    metaDescription : Text,
  ) : async () {
    requireAdminOrLabExecutive(caller);

    switch (services.get(id)) {
      case (null) {
        Runtime.trap("Service with given ID does not exist");
      };
      case (?existingService) {
        let updatedService : Service.Service = {
          id;
          name;
          category;
          subcategory;
          description;
          serviceIntro;
          servicesIncluded;
          targetAudience;
          benefits;
          seoKeywords;
          isActive = existingService.isActive;
          metaTitle;
          metaDescription;
        };
        services.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    if (not services.containsKey(id)) {
      Runtime.trap("Service with given ID does not exist");
    };
    services.remove(id);
  };

  public query func listServicesByCategory(category : Service.Category) : async [Service.Service] {
    let filteredServices = services.values().toArray().filter(
      func(service) {
        service.category == category and service.isActive;
      }
    );
    filteredServices;
  };

  public query func searchServicesByKeyword(keyword : Text) : async [Service.Service] {
    let filteredServices = services.values().toArray().filter(
      func(service) {
        service.name.contains(#text(keyword)) or
        service.description.contains(#text(keyword)) or
        service.seoKeywords.find(
          func(kword) {
            kword.contains(#text(keyword));
          }
        ) != null
      }
    );
    filteredServices;
  };

  public query func getServicesByCategory(category : Service.Category) : async [Service.Service] {
    let filteredServices = services.values().toArray().filter(
      func(service) {
        service.category == category and service.isActive;
      }
    );
    filteredServices;
  };

  public query func getServicesBySubcategory(subcategory : Service.Subcategory) : async [Service.Service] {
    let filteredServices = services.values().toArray().filter(
      func(service) {
        service.subcategory == subcategory and service.isActive;
      }
    );
    filteredServices;
  };

  public query func allServices() : async [Service.Service] {
    let activeServices = services.values().toArray().filter(
      func(service) {
        service.isActive;
      }
    );
    activeServices;
  };

  module ContactInfo {
    public type Info = {
      phone : Text;
      email : Text;
      address : Text;
      locationUrl : Text;
      openingHours : Text;
    };
  };

  module SeoData {
    public type Data = {
      id : Nat;
      pageTitle : Text;
      pageDescription : Text;
      keywords : [Text];
      canonicalUrl : Text;
      metaTitle : Text;
      metaDescription : Text;
      metaKeywords : Text;
    };
  };

  module BrandInfo {
    public type Info = {
      brandName : Text;
      logoUrl : Text;
      primaryColor : Text;
      secondaryColor : Text;
      textColor : Text;
      backgroundColor : Text;
      fontFamily : Text;
    };
  };

  public type Booking = {
    id : Nat;
    userName : Text;
    address : Text;
    budget : Nat;
    requestType : {
      #callBack : { requestedTime : Nat };
      #whatsapp : { phoneNumber : Text };
      #scheduledVisit : { timestamp : Nat };
    };
    serviceRequest : {
      category : Service.Category;
      subcategory : Service.Subcategory;
      description : Text;
      urgent : Bool;
      preferredDate : ?Nat;
      preferredTime : ?Nat;
    };
  };

  var nextBookingId : Nat = 1;

  public shared ({ caller }) func addBooking(
    userName : Text,
    address : Text,
    budget : Nat,
    requestType : {
      #callBack : { requestedTime : Nat };
      #whatsapp : { phoneNumber : Text };
      #scheduledVisit : { timestamp : Nat };
    },
    serviceRequest : {
      category : Service.Category;
      subcategory : Service.Subcategory;
      description : Text;
      urgent : Bool;
      preferredDate : ?Nat;
      preferredTime : ?Nat;
    },
  ) : async {
    bookingId : Nat;
    message : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add bookings");
    };

    let bookingId = nextBookingId;
    let booking : Booking = {
      id = bookingId;
      userName;
      address;
      budget;
      requestType;
      serviceRequest;
    };

    bookings.add(bookingId, booking);
    nextBookingId += 1;
    {
      bookingId;
      message = "Booking added successfully";
    };
  };

  public query ({ caller }) func getBookingById(bookingId : Nat) : async ?Booking {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view bookings");
    };
    bookings.get(bookingId);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view all bookings");
    };
    bookings.values().toArray();
  };

  public query ({ caller }) func getBookingsByUserProfile(user : Principal, role : HealthcareRole) : async [Booking] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (isAdmin or isLabExec) {
      return bookings.values().toArray();
    };

    if (caller != user) {
      Runtime.trap("Unauthorized: Can only view your own bookings");
    };

    bookings.values().toArray();
  };

  public shared ({ caller }) func addSeoData(
    pageTitle : Text,
    pageDescription : Text,
    keywords : [Text],
    canonicalUrl : Text,
    metaTitle : Text,
    metaDescription : Text,
    metaKeywords : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let id = nextSeoId;
    let seo : SeoData.Data = {
      id;
      pageTitle;
      pageDescription;
      keywords;
      canonicalUrl;
      metaTitle;
      metaDescription;
      metaKeywords;
    };
    seoData.add(id, seo);
    nextSeoId += 1;
    id;
  };

  public shared ({ caller }) func updateSeoData(
    id : Nat,
    pageTitle : Text,
    pageDescription : Text,
    keywords : [Text],
    canonicalUrl : Text,
    metaTitle : Text,
    metaDescription : Text,
    metaKeywords : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (seoData.get(id)) {
      case (null) {
        Runtime.trap("SEO data with given ID does not exist");
      };
      case (?existingSeo) {
        let updatedSeo : SeoData.Data = {
          id;
          pageTitle;
          pageDescription;
          keywords;
          canonicalUrl;
          metaTitle;
          metaDescription;
          metaKeywords;
        };
        seoData.add(id, updatedSeo);
      };
    };
  };

  public shared ({ caller }) func deleteSeoData(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not seoData.containsKey(id)) {
      Runtime.trap("SEO data with given ID does not exist");
    };
    seoData.remove(id);
  };

  public query func getAllSeoData() : async [SeoData.Data] {
    seoData.values().toArray();
  };

  public shared ({ caller }) func setContactInfo(
    phone : Text,
    email : Text,
    address : Text,
    locationUrl : Text,
    openingHours : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let info : ContactInfo.Info = {
      phone;
      email;
      address;
      locationUrl;
      openingHours;
    };
    contactInfo := ?info;
  };

  public shared ({ caller }) func setBrandInfo(
    brandName : Text,
    logoUrl : Text,
    primaryColor : Text,
    secondaryColor : Text,
    textColor : Text,
    backgroundColor : Text,
    fontFamily : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let info : BrandInfo.Info = {
      brandName;
      logoUrl;
      primaryColor;
      secondaryColor;
      textColor;
      backgroundColor;
      fontFamily;
    };
    brandInfo := ?info;
  };

  public query func getContactInfo() : async ?ContactInfo.Info {
    contactInfo;
  };

  public query func getBrandInfo() : async BrandInfo.Info {
    switch (brandInfo) {
      case (null) {
        defaultBrandInfo;
      };
      case (?brand) {
        brand;
      };
    };
  };

  public type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    serviceInterested : Text;
    comments : Text;
    status : LeadStatus;
    assignee : ?Text;
    lastFollowUpDate : ?Time.Time;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type LeadStatus = {
    #new;
    #contacted;
    #inProgress;
    #converted;
    #lost;
  };

  public type LeadActivity = {
    id : Nat;
    leadId : Nat;
    note : Text;
    followUpDate : ?Time.Time;
    createdAt : Time.Time;
  };

  public type LeadDashboardSummary = {
    totalLeads : Nat;
    newLeads : Nat;
    contactedLeads : Nat;
    inProgressLeads : Nat;
    convertedLeads : Nat;
    lostLeads : Nat;
    conversionRate : Float;
  };

  let leads = Map.empty<Nat, Lead>();
  let leadActivities = Map.empty<Nat, LeadActivity>();
  var nextLeadId : Nat = 1;
  var nextActivityId : Nat = 1;

  public type Customer = {
    customerId : Nat;
    principalId : ?Principal;
    name : Text;
    phone : Text;
    email : Text;
    createdAt : Time.Time;
    referralCode : Text;
    walletBalance : Float;
    primaryPatientId : Nat;
    status : Text;
  };

  public type Patient = {
    patientId : Nat;
    customerId : Nat;
    name : Text;
    dob : Text;
    gender : Text;
    relationship : Text;
    bloodGroup : Text;
    chronicConditions : [Text];
    emergencyContact : Text;
    createdAt : Time.Time;
    isPrimary : Bool;
  };

  public type Vital = {
    vitalId : Nat;
    patientId : Nat;
    type_ : Text;
    reading : Text;
    unit : Text;
    timestamp : Time.Time;
    status : Text;
  };

  public type HealthAlert = {
    patientId : Nat;
    vitalType : Text;
    status : Text;
    timestamp : Time.Time;
  };

  let customers = Map.empty<Nat, Customer>();
  let patients = Map.empty<Nat, Patient>();
  let vitals = Map.empty<Nat, Vital>();
  var nextCustomerId : Nat = 1;
  var nextPatientId : Nat = 1;
  var nextVitalId : Nat = 1;

  func getCustomerIdByPrincipal(principal : Principal) : ?Nat {
    for ((customerId, customer) in customers.entries()) {
      switch (customer.principalId) {
        case (?pid) {
          if (pid == principal) {
            return ?customerId;
          };
        };
        case (null) {};
      };
    };
    null;
  };

  func isPatientOwnedByCustomer(patientId : Nat, customerId : Nat) : Bool {
    switch (patients.get(patientId)) {
      case (null) { false };
      case (?patient) { patient.customerId == customerId };
    };
  };

  public shared ({ caller }) func addCustomer(
    name : Text,
    phone : Text,
    email : Text,
    referralCode : Text,
    principalId : ?Principal,
  ) : async Nat {
    requireAdminOrLabExecutive(caller);

    let id = nextCustomerId;
    let customer : Customer = {
      customerId = id;
      principalId;
      name;
      phone;
      email;
      createdAt = Time.now();
      referralCode;
      walletBalance = 0.0;
      primaryPatientId = 0;
      status = "active";
    };

    customers.add(id, customer);
    nextCustomerId += 1;
    id;
  };

  public shared ({ caller }) func updateCustomer(
    customerId : Nat,
    name : Text,
    phone : Text,
    email : Text,
    referralCode : Text,
    walletBalance : Float,
    primaryPatientId : Nat,
    status : Text,
  ) : async () {
    requireAdminOrLabExecutive(caller);

    switch (customers.get(customerId)) {
      case (null) {
        Runtime.trap("Customer with given ID does not exist");
      };
      case (?existingCustomer) {
        let updatedCustomer : Customer = {
          customerId;
          principalId = existingCustomer.principalId;
          name;
          phone;
          email;
          createdAt = existingCustomer.createdAt;
          referralCode;
          walletBalance;
          primaryPatientId;
          status;
        };
        customers.add(customerId, updatedCustomer);
      };
    };
  };

  public shared ({ caller }) func deleteCustomer(customerId : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    switch (customers.get(customerId)) {
      case (null) {
        Runtime.trap("Customer with given ID does not exist");
      };
      case (?customer) {
        let updatedCustomer : Customer = {
          customer with status = "inactive";
        };
        customers.add(customerId, updatedCustomer);
      };
    };
  };

  public query ({ caller }) func getAllCustomers() : async [Customer] {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view all customers");
    };
    customers.values().toArray();
  };

  public query ({ caller }) func getCustomerById(customerId : Nat) : async ?Customer {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view customer details");
    };
    customers.get(customerId);
  };

  public query ({ caller }) func getMyCustomerProfile() : async ?Customer {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their profile");
    };

    switch (getCustomerIdByPrincipal(caller)) {
      case (null) { null };
      case (?customerId) { customers.get(customerId) };
    };
  };

  public shared ({ caller }) func addPatient(
    customerId : Nat,
    name : Text,
    dob : Text,
    gender : Text,
    relationship : Text,
    bloodGroup : Text,
    chronicConditions : [Text],
    emergencyContact : Text,
    isPrimary : Bool,
  ) : async Nat {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let callerCustomerId = getCustomerIdByPrincipal(caller);

    let authorized = isAdmin or isLabExec or (switch (callerCustomerId) {
      case (null) { false };
      case (?id) { id == customerId };
    });

    if (not authorized) {
      Runtime.trap("Unauthorized: Can only add patients to your own family");
    };

    switch (customers.get(customerId)) {
      case (null) {
        Runtime.trap("Customer with given ID does not exist");
      };
      case (?_) {};
    };

    let id = nextPatientId;
    let patient : Patient = {
      patientId = id;
      customerId;
      name;
      dob;
      gender;
      relationship;
      bloodGroup;
      chronicConditions;
      emergencyContact;
      createdAt = Time.now();
      isPrimary;
    };

    patients.add(id, patient);
    nextPatientId += 1;
    id;
  };

  public shared ({ caller }) func updatePatient(
    patientId : Nat,
    customerId : Nat,
    name : Text,
    dob : Text,
    gender : Text,
    relationship : Text,
    bloodGroup : Text,
    chronicConditions : [Text],
    emergencyContact : Text,
    isPrimary : Bool,
  ) : async () {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let callerCustomerId = getCustomerIdByPrincipal(caller);

    let authorized = isAdmin or isLabExec or (callerCustomerId == ?customerId and isPatientOwnedByCustomer(patientId, customerId));

    if (not authorized) {
      Runtime.trap("Unauthorized: Can only update your own family members");
    };

    switch (patients.get(patientId)) {
      case (null) {
        Runtime.trap("Patient with given ID does not exist");
      };
      case (?_) {
        let updatedPatient : Patient = {
          patientId;
          customerId;
          name;
          dob;
          gender;
          relationship;
          bloodGroup;
          chronicConditions;
          emergencyContact;
          createdAt = Time.now();
          isPrimary;
        };
        patients.add(patientId, updatedPatient);
      };
    };
  };

  public shared ({ caller }) func deletePatient(patientId : Nat) : async () {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec)) {
      switch (patients.get(patientId)) {
        case (null) {
          Runtime.trap("Patient with given ID does not exist");
        };
        case (?patient) {
          let callerCustomerId = getCustomerIdByPrincipal(caller);
          if (callerCustomerId != ?patient.customerId) {
            Runtime.trap("Unauthorized: Can only delete your own family members");
          };
        };
      };
    };

    if (not patients.containsKey(patientId)) {
      Runtime.trap("Patient with given ID does not exist");
    };
    patients.remove(patientId);
  };

  public query ({ caller }) func getAllPatients() : async [Patient] {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view all patients");
    };
    patients.values().toArray();
  };

  public query ({ caller }) func getPatientById(patientId : Nat) : async ?Patient {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);

    if (isAdmin or isLabExec or isDoctor) {
      return patients.get(patientId);
    };

    switch (patients.get(patientId)) {
      case (null) { null };
      case (?patient) {
        let callerCustomerId = getCustomerIdByPrincipal(caller);
        if (callerCustomerId == ?patient.customerId) {
          ?patient;
        } else {
          Runtime.trap("Unauthorized: Can only view your own family members");
        };
      };
    };
  };

  public query ({ caller }) func getPatientsByCustomerId(customerId : Nat) : async [Patient] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let callerCustomerId = getCustomerIdByPrincipal(caller);

    let authorized = isAdmin or isLabExec or (callerCustomerId == ?customerId);

    if (not authorized) {
      Runtime.trap("Unauthorized: Can only view your own family members");
    };

    patients.values().toArray().filter(
      func(patient) {
        patient.customerId == customerId;
      }
    );
  };

  public query ({ caller }) func getMyPatients() : async [Patient] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their patients");
    };

    switch (getCustomerIdByPrincipal(caller)) {
      case (null) { [] };
      case (?customerId) {
        patients.values().toArray().filter(
          func(patient) {
            patient.customerId == customerId;
          }
        );
      };
    };
  };

  public shared ({ caller }) func addVital(
    patientId : Nat,
    type_ : Text,
    reading : Text,
    unit : Text,
    status : Text,
  ) : async Nat {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);

    if (not (isAdmin or isLabExec or isDoctor)) {
      switch (patients.get(patientId)) {
        case (null) {
          Runtime.trap("Patient with given ID does not exist");
        };
        case (?patient) {
          let callerCustomerId = getCustomerIdByPrincipal(caller);
          if (callerCustomerId != ?patient.customerId) {
            Runtime.trap("Unauthorized: Can only add vitals for your own family members");
          };
        };
      };
    } else {
      switch (patients.get(patientId)) {
        case (null) {
          Runtime.trap("Patient with given ID does not exist");
        };
        case (?_) {};
      };
    };

    let id = nextVitalId;
    let vital : Vital = {
      vitalId = id;
      patientId;
      type_;
      reading;
      unit;
      timestamp = Time.now();
      status;
    };

    vitals.add(id, vital);
    nextVitalId += 1;
    id;
  };

  public shared ({ caller }) func updateVital(
    vitalId : Nat,
    patientId : Nat,
    type_ : Text,
    reading : Text,
    unit : Text,
    status : Text,
  ) : async () {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);

    if (not (isAdmin or isLabExec or isDoctor)) {
      switch (patients.get(patientId)) {
        case (null) {
          Runtime.trap("Patient with given ID does not exist");
        };
        case (?patient) {
          let callerCustomerId = getCustomerIdByPrincipal(caller);
          if (callerCustomerId != ?patient.customerId) {
            Runtime.trap("Unauthorized: Can only update vitals for your own family members");
          };
        };
      };
    };

    switch (vitals.get(vitalId)) {
      case (null) {
        Runtime.trap("Vital with given ID does not exist");
      };
      case (?_) {
        let updatedVital : Vital = {
          vitalId;
          patientId;
          type_;
          reading;
          unit;
          timestamp = Time.now();
          status;
        };
        vitals.add(vitalId, updatedVital);
      };
    };
  };

  public shared ({ caller }) func deleteVital(vitalId : Nat) : async () {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can delete vitals");
    };

    if (not vitals.containsKey(vitalId)) {
      Runtime.trap("Vital with given ID does not exist");
    };
    vitals.remove(vitalId);
  };

  public query ({ caller }) func getAllVitals() : async [Vital] {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view all vitals");
    };
    vitals.values().toArray();
  };

  public query ({ caller }) func getVitalById(vitalId : Nat) : async ?Vital {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);

    if (isAdmin or isLabExec or isDoctor) {
      return vitals.get(vitalId);
    };

    switch (vitals.get(vitalId)) {
      case (null) { null };
      case (?vital) {
        switch (patients.get(vital.patientId)) {
          case (null) { null };
          case (?patient) {
            let callerCustomerId = getCustomerIdByPrincipal(caller);
            if (callerCustomerId == ?patient.customerId) {
              ?vital;
            } else {
              Runtime.trap("Unauthorized: Can only view vitals for your own family members");
            };
          };
        };
      };
    };
  };

  public query ({ caller }) func getVitalsByPatientId(patientId : Nat) : async [Vital] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);

    if (not (isAdmin or isLabExec or isDoctor)) {
      switch (patients.get(patientId)) {
        case (null) {
          Runtime.trap("Patient with given ID does not exist");
        };
        case (?patient) {
          let callerCustomerId = getCustomerIdByPrincipal(caller);
          if (callerCustomerId != ?patient.customerId) {
            Runtime.trap("Unauthorized: Can only view vitals for your own family members");
          };
        };
      };
    };

    vitals.values().toArray().filter(
      func(vital) {
        vital.patientId == patientId;
      }
    );
  };

  public query ({ caller }) func getMyFamilyVitals() : async [Vital] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their family vitals");
    };

    switch (getCustomerIdByPrincipal(caller)) {
      case (null) { [] };
      case (?customerId) {
        let familyPatientIds = patients.values().toArray().filter(
          func(patient) {
            patient.customerId == customerId;
          }
        ).map(func(patient) { patient.patientId });

        vitals.values().toArray().filter(
          func(vital) {
            familyPatientIds.find(func(id) { id == vital.patientId }) != null;
          }
        );
      };
    };
  };

  public type DoctorProfile = {
    doctorId : Nat;
    userId : Nat;
    specialization : Text;
    qualifications : [Text];
    experience : Nat;
    consultationFee : Float;
    availability : Text;
    profilePhoto : Text;
    certifications : [Text];
    rating : Float;
    totalConsultations : Nat;
    status : Text;
    createdAt : Time.Time;
  };

  public type DoctorAppointment = {
    appointmentId : Nat;
    doctorId : Nat;
    patientId : Nat;
    customerId : Nat;
    scheduledDateTime : Time.Time;
    status : Text;
    consultationType : Text;
    fee : Float;
    notes : Text;
    createdAt : Time.Time;
  };

  public type DoctorEarning = {
    earningId : Nat;
    doctorId : Nat;
    appointmentId : Nat;
    date : Time.Time;
    amount : Float;
    paymentStatus : Text;
    paymentDate : Time.Time;
    transactionId : Text;
  };

  public type ConsultationNote = {
    noteId : Nat;
    appointmentId : Nat;
    doctorId : Nat;
    patientId : Nat;
    soapNotes : Text;
    prescriptionFile : Text;
    followupDate : Time.Time;
    diagnosticRequests : [Text];
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type DoctorDashboardStats = {
    todayAppointments : Nat;
    pendingPrescriptions : Nat;
    earningsToday : Float;
    completedConsultations : Nat;
    rating : Float;
    totalPatients : Nat;
  };

  let doctorProfiles = Map.empty<Nat, DoctorProfile>();
  var nextDoctorId : Nat = 1;

  let doctorAppointments = Map.empty<Nat, DoctorAppointment>();
  var nextAppointmentId : Nat = 1;

  let doctorEarnings = Map.empty<Nat, DoctorEarning>();
  var nextEarningId : Nat = 1;

  let consultationNotes = Map.empty<Nat, ConsultationNote>();
  var nextNoteId : Nat = 1;

  public shared ({ caller }) func addDoctorProfile(
    userId : Nat,
    specialization : Text,
    qualifications : [Text],
    experience : Nat,
    consultationFee : Float,
    availability : Text,
    profilePhoto : Text,
    certifications : [Text],
    rating : Float,
    totalConsultations : Nat,
    status : Text,
  ) : async Nat {
    requireAdminOrLabExecutive(caller);

    let id = nextDoctorId;
    let doctorProfile : DoctorProfile = {
      doctorId = id;
      userId;
      specialization;
      qualifications;
      experience;
      consultationFee;
      availability;
      profilePhoto;
      certifications;
      rating;
      totalConsultations;
      status;
      createdAt = Time.now();
    };

    doctorProfiles.add(id, doctorProfile);
    nextDoctorId += 1;
    id;
  };

  public query ({ caller }) func getDoctorDashboardData(doctorId : Nat) : async ?DoctorDashboardStats {
    requireDoctor(caller);

    let callerDoctorId = getDoctorIdByPrincipal(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec or callerDoctorId == ?doctorId)) {
      Runtime.trap("Unauthorized: Can only view your own dashboard data");
    };

    let doctorProfile = doctorProfiles.get(doctorId);
    switch (doctorProfile) {
      case (null) {
        Runtime.trap("Doctor not found");
      };
      case (?profile) {
        let todayAppointments = 5;
        let pendingPrescriptions = 8;
        let earningsToday = 6200.0;
        let completedConsultations = 324;
        let totalPatients = 154;

        ?{
          todayAppointments;
          pendingPrescriptions;
          earningsToday;
          completedConsultations;
          rating = profile.rating;
          totalPatients;
        };
      };
    };
  };

  public query func getAllDoctors() : async [DoctorProfile] {
    doctorProfiles.values().toArray();
  };

  public query func getDoctorById(doctorId : Nat) : async ?DoctorProfile {
    doctorProfiles.get(doctorId);
  };

  public query func getDoctorProfilesBySpecialization(specialization : Text) : async [DoctorProfile] {
    doctorProfiles.values().toArray().filter(
      func(doctor) {
        doctor.specialization == specialization;
      }
    );
  };

  public query func getDoctorProfilesByCategory(category : Text) : async [DoctorProfile] {
    doctorProfiles.values().toArray().filter(
      func(doctor) {
        doctor.specialization.contains(#text(category));
      }
    );
  };

  public shared ({ caller }) func addDoctorAppointment(
    doctorId : Nat,
    patientId : Nat,
    customerId : Nat,
    scheduledDateTime : Time.Time,
    status : Text,
    consultationType : Text,
    fee : Float,
    notes : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create appointments");
    };

    switch (doctorProfiles.get(doctorId)) {
      case (null) {
        Runtime.trap("Doctor with given ID does not exist");
      };
      case (?doctor) {
        if (doctor.status != "active") {
          Runtime.trap("Doctor is not currently active");
        };
      };
    };

    switch (patients.get(patientId)) {
      case (null) {
        Runtime.trap("Patient with given ID does not exist");
      };
      case (?patient) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        let isLabExec = hasHealthcareRole(caller, #labExecutive);
        let callerCustomerId = getCustomerIdByPrincipal(caller);

        if (not (isAdmin or isLabExec or callerCustomerId == ?patient.customerId)) {
          Runtime.trap("Unauthorized: Can only create appointments for your own family members");
        };
      };
    };

    let id = nextAppointmentId;
    let appointment : DoctorAppointment = {
      appointmentId = id;
      doctorId;
      patientId;
      customerId;
      scheduledDateTime;
      status;
      consultationType;
      fee;
      notes;
      createdAt = Time.now();
    };

    doctorAppointments.add(id, appointment);
    nextAppointmentId += 1;
    id;
  };

  public query ({ caller }) func listDoctorAppointments(doctorId : Nat) : async [DoctorAppointment] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);
    let callerDoctorId = getDoctorIdByPrincipal(caller);

    if (isAdmin or isLabExec) {
      return doctorAppointments.values().toArray().filter(
        func(appointment) {
          appointment.doctorId == doctorId;
        }
      );
    };

    if (isDoctor and callerDoctorId == ?doctorId) {
      return doctorAppointments.values().toArray().filter(
        func(appointment) {
          appointment.doctorId == doctorId;
        }
      );
    };

    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view appointments");
    };

    switch (getCustomerIdByPrincipal(caller)) {
      case (null) {
        Runtime.trap("Unauthorized: Can only view your own appointments");
      };
      case (?customerId) {
        return doctorAppointments.values().toArray().filter(
          func(appointment) {
            appointment.customerId == customerId;
          }
        );
      };
    };
  };

  public shared ({ caller }) func saveConsultationNote(
    appointmentId : Nat,
    doctorId : Nat,
    patientId : Nat,
    soapNotes : Text,
    prescriptionFile : Text,
    followupDate : Time.Time,
    diagnosticRequests : [Text],
  ) : async Nat {
    requireDoctor(caller);

    let callerDoctorId = getDoctorIdByPrincipal(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec or callerDoctorId == ?doctorId)) {
      Runtime.trap("Unauthorized: Can only save consultation notes for your own appointments");
    };

    switch (doctorAppointments.get(appointmentId)) {
      case (null) {
        Runtime.trap("Appointment with given ID does not exist");
      };
      case (?appointment) {
        if (appointment.doctorId != doctorId) {
          Runtime.trap("Unauthorized: Appointment does not belong to this doctor");
        };
        if (appointment.patientId != patientId) {
          Runtime.trap("Patient ID does not match appointment");
        };
      };
    };

    let id = nextNoteId;
    let note : ConsultationNote = {
      noteId = id;
      appointmentId;
      doctorId;
      patientId;
      soapNotes;
      prescriptionFile;
      followupDate;
      diagnosticRequests;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    consultationNotes.add(id, note);
    nextNoteId += 1;
    id;
  };

  public query ({ caller }) func getConsultationNotesByAppointment(appointmentId : Nat) : async ?ConsultationNote {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);
    let isDoctor = hasHealthcareRole(caller, #doctor);

    if (isAdmin or isLabExec or isDoctor) {
      if (isDoctor and not isDoctorOwnerOfAppointment(caller, appointmentId)) {
        Runtime.trap("Unauthorized: Can only view your own consultation notes");
      };
      return consultationNotes.values().toArray().find(
        func(note) {
          note.appointmentId == appointmentId;
        }
      );
    };

    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view consultation notes");
    };

    if (not isCustomerOwnerOfAppointment(caller, appointmentId)) {
      Runtime.trap("Unauthorized: Can only view consultation notes for your own appointments");
    };

    consultationNotes.values().toArray().find(
      func(note) {
        note.appointmentId == appointmentId;
      }
    );
  };

  public query ({ caller }) func getDoctorEarnings(doctorId : Nat) : async [DoctorEarning] {
    requireDoctor(caller);

    let callerDoctorId = getDoctorIdByPrincipal(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec or callerDoctorId == ?doctorId)) {
      Runtime.trap("Unauthorized: Can only view your own earnings");
    };

    doctorEarnings.values().toArray().filter(
      func(earning) {
        earning.doctorId == doctorId;
      }
    );
  };

  public shared ({ caller }) func updateDoctorProfile(doctorId : Nat, updatedProfile : DoctorProfile) : async () {
    requireDoctor(caller);

    let callerDoctorId = getDoctorIdByPrincipal(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    if (not (isAdmin or isLabExec or callerDoctorId == ?doctorId)) {
      Runtime.trap("Unauthorized: Can only update your own profile");
    };

    switch (doctorProfiles.get(doctorId)) {
      case (null) {
        Runtime.trap("Doctor profile with given ID does not exist");
      };
      case (?_) {
        doctorProfiles.add(doctorId, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func updateDoctorAppointment(appointmentId : Nat, updatedAppointment : DoctorAppointment) : async () {
    requireDoctor(caller);

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    switch (doctorAppointments.get(appointmentId)) {
      case (null) {
        Runtime.trap("Appointment with given ID does not exist");
      };
      case (?appointment) {
        if (not (isAdmin or isLabExec or isDoctorOwnerOfAppointment(caller, appointmentId))) {
          Runtime.trap("Unauthorized: Can only update your own appointments");
        };
        doctorAppointments.add(appointmentId, updatedAppointment);
      };
    };
  };

  public shared ({ caller }) func updateDoctorEarning(earningId : Nat, updatedEarning : DoctorEarning) : async () {
    requireAdminOrLabExecutive(caller);

    switch (doctorEarnings.get(earningId)) {
      case (null) {
        Runtime.trap("Earning record with given ID does not exist");
      };
      case (?_) {
        doctorEarnings.add(earningId, updatedEarning);
      };
    };
  };

  public shared ({ caller }) func updateConsultationNote(noteId : Nat, updatedNote : ConsultationNote) : async () {
    requireDoctor(caller);

    let callerDoctorId = getDoctorIdByPrincipal(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let isLabExec = hasHealthcareRole(caller, #labExecutive);

    switch (consultationNotes.get(noteId)) {
      case (null) {
        Runtime.trap("Consultation note with given ID does not exist");
      };
      case (?note) {
        if (not (isAdmin or isLabExec or callerDoctorId == ?note.doctorId)) {
          Runtime.trap("Unauthorized: Can only update your own consultation notes");
        };
        consultationNotes.add(noteId, updatedNote);
      };
    };
  };

  public shared ({ caller }) func deleteDoctorProfile(doctorId : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    if (not doctorProfiles.containsKey(doctorId)) {
      Runtime.trap("Doctor profile with given ID does not exist");
    };
    doctorProfiles.remove(doctorId);
  };

  public shared ({ caller }) func deleteDoctorAppointment(appointmentId : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    if (not doctorAppointments.containsKey(appointmentId)) {
      Runtime.trap("Appointment with given ID does not exist");
    };
    doctorAppointments.remove(appointmentId);
  };

  public shared ({ caller }) func deleteDoctorEarning(earningId : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    if (not doctorEarnings.containsKey(earningId)) {
      Runtime.trap("Earning record with given ID does not exist");
    };
    doctorEarnings.remove(earningId);
  };

  public shared ({ caller }) func deleteConsultationNote(noteId : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    if (not consultationNotes.containsKey(noteId)) {
      Runtime.trap("Consultation note with given ID does not exist");
    };
    consultationNotes.remove(noteId);
  };

  public type PrescriptionLead = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    file : Storage.ExternalBlob;
    createdAt : Time.Time;
  };

  let prescriptionLeads = Map.empty<Nat, PrescriptionLead>();
  var nextPrescriptionLeadId : Nat = 1;

  public shared ({ caller }) func uploadPrescription(name : Text, phone : Text, email : Text, file : Storage.ExternalBlob) : async Nat {
    let id = nextPrescriptionLeadId;
    let prescriptionLead : PrescriptionLead = {
      id;
      name;
      phone;
      email;
      file;
      createdAt = Time.now();
    };

    prescriptionLeads.add(id, prescriptionLead);
    nextPrescriptionLeadId += 1;
    id;
  };

  public query ({ caller }) func getPrescriptionLead(id : Nat) : async ?PrescriptionLead {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view prescription leads");
    };
    prescriptionLeads.get(id);
  };

  public query ({ caller }) func getAllPrescriptionLeads() : async [PrescriptionLead] {
    if (not hasAdminOrLabExecutiveAccess(caller)) {
      Runtime.trap("Unauthorized: Only admins or lab executives can view prescription leads");
    };
    prescriptionLeads.values().toArray();
  };

  public type DiagnosticTest = {
    testId : Nat;
    testName : Text;
    testDescription : Text;
    category : Text;
    price : Float;
    sampleType : Text;
    preparationInstructions : Text;
    reportDeliveryTime : Text;
    isActive : Bool;
    searchKeywords : [Text];
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  let diagnosticTests = Map.empty<Nat, DiagnosticTest>();
  var nextTestId : Nat = 1;

  public query func getAllDiagnosticTests() : async [DiagnosticTest] {
    diagnosticTests.values().toArray();
  };

  public query func searchDiagnosticTests(searchTerm : Text) : async [DiagnosticTest] {
    let lowerQuery = searchTerm.toLower();
    let filteredTests = diagnosticTests.values().toArray().filter(
      func(test) {
        test.testName.toLower().contains(#text(lowerQuery)) or
        test.testDescription.toLower().contains(#text(lowerQuery)) or
        test.searchKeywords.find(
          func(keyword) {
            keyword.toLower().contains(#text(lowerQuery));
          }
        ) != null
      }
    );
    filteredTests;
  };

  public query func getDiagnosticTestById(testId : Nat) : async ?DiagnosticTest {
    diagnosticTests.get(testId);
  };

  public query func getDiagnosticTestsByCategory(category : Text) : async [DiagnosticTest] {
    diagnosticTests.values().toArray().filter(
      func(test) {
        test.category == category;
      }
    );
  };

  public query func getActiveDiagnosticTests() : async [DiagnosticTest] {
    diagnosticTests.values().toArray().filter(
      func(test) {
        test.isActive;
      }
    );
  };

  public query func getDiagnosticTestsByPriceRange(minPrice : Float, maxPrice : Float) : async [DiagnosticTest] {
    diagnosticTests.values().toArray().filter(
      func(test) {
        test.price >= minPrice and test.price <= maxPrice;
      }
    );
  };

  public query func getDiagnosticTestsBySampleType(sampleType : Text) : async [DiagnosticTest] {
    diagnosticTests.values().toArray().filter(
      func(test) {
        test.sampleType == sampleType;
      }
    );
  };

  public query func getDiagnosticTestCategories() : async [Text] {
    let categories = diagnosticTests.values().toArray().map(
      func(test) {
        test.category;
      }
    );
    categories;
  };

  public query func getDiagnosticTestSampleTypes() : async [Text] {
    let sampleTypes = diagnosticTests.values().toArray().map(
      func(test) {
        test.sampleType;
      }
    );
    sampleTypes;
  };

  public type HealthPackageCategory = {
    #fullBodyCheckup;
    #specializedScreening;
    #organFunction;
    #diseaseManagement;
    #ageSpecific;
    #genderSpecific;
    #preventiveCare;
  };

  public type SampleType = {
    #blood;
    #urine;
    #stool;
    #nasalSwab;
    #cervicalSample;
    #noSampleRequired;
  };

  public type HealthPackage = {
    packageId : Nat;
    packageName : Text;
    description : Text;
    shortDescription : Text;
    testInclusions : [Text];
    price : Float;
    sampleCollection : Text;
    reportDeliveryTime : Text;
    category : Text;
    isActive : Bool;
    iconName : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  let healthPackages = Map.empty<Nat, HealthPackage>();
  var nextPackageId : Nat = 1;

  func getDefaultHealthPackages() : List.List<HealthPackage> {
    let packages1 = List.fromArray<HealthPackage>([
      {
        packageId = 1;
        packageName = "Comprehensive Full Body Checkup";
        description = "Complete health assessment covering all major body systems";
        shortDescription = "Full health check with various tests";
        testInclusions = [
          "CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid Function",
          "Diabetes Screening", "Vitamin D3", "B12", "Chest X-Ray", "ECG",
        ];
        price = 2999.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "24-48 hours";
        category = "fullBodyCheckup";
        isActive = true;
        iconName = "body-checkup";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 2;
        packageName = "Diabetes Care Package";
        description = "Comprehensive diabetes monitoring and management screening";
        shortDescription = "Diabetes monitoring and management";
        testInclusions = [
          "Fasting Blood Sugar", "Postprandial Blood Sugar", "HbA1c", "Lipid Profile",
          "Kidney Function", "Microalbumin", "Diabetic Foot Screening",
        ];
        price = 1899.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "24 hours";
        category = "diseaseManagement";
        isActive = true;
        iconName = "diabetes-care";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 3;
        packageName = "Heart Health Package";
        description = "Complete cardiovascular health assessment and risk evaluation";
        shortDescription = "Cardiovascular health assessment";
        testInclusions = [
          "Lipid Profile", "ECG", "ECHO", "Cardiac Markers (Troponin, CK-MB)",
          "Blood Pressure Monitoring", "Stress Test",
        ];
        price = 2499.0;
        sampleCollection = "Blood";
        reportDeliveryTime = "48 hours";
        category = "specializedScreening";
        isActive = true;
        iconName = "heart-health";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 4;
        packageName = "Thyroid Wellness Screening";
        description = "Comprehensive thyroid function evaluation and hormone balance";
        shortDescription = "Thyroid function evaluation";
        testInclusions = [
          "T3", "T4", "TSH", "Anti-TPO Antibodies", "Thyroid Ultrasound",
        ];
        price = 1299.0;
        sampleCollection = "Blood";
        reportDeliveryTime = "24 hours";
        category = "specializedScreening";
        isActive = true;
        iconName = "thyroid-wellness";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 5;
        packageName = "Women's Health Package";
        description = "Complete women's health screening covering reproductive and general health";
        shortDescription = "Women's health screening";
        testInclusions = [
          "CBC", "Thyroid Function", "Vitamin D3", "B12", "Iron Studies",
          "Pap Smear", "Breast Examination", "Pelvic Ultrasound", "Bone Density",
        ];
        price = 2799.0;
        sampleCollection = "Blood, Cervical Sample";
        reportDeliveryTime = "48-72 hours";
        category = "genderSpecific";
        isActive = true;
        iconName = "womens-health";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 6;
        packageName = "Senior Citizen Health Package";
        description = "Comprehensive health screening designed for adults above 60 years";
        shortDescription = "Senior health screening";
        testInclusions = [
          "Complete Blood Count", "Lipid Profile", "Diabetes Screening", "Kidney Function",
          "Liver Function", "Thyroid Function", "Vitamin D3", "B12", "Chest X-Ray", "ECG", "Bone Density",
        ];
        price = 3499.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48 hours";
        category = "ageSpecific";
        isActive = true;
        iconName = "senior-health";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 7;
        packageName = "COVID & Viral Screening";
        description = "Comprehensive viral infection screening and immunity assessment";
        shortDescription = "Viral infection screening";
        testInclusions = [
          "RT-PCR COVID-19", "Rapid Antigen Test", "COVID Antibodies",
          "Complete Blood Count", "CRP", "Vitamin D3", "Zinc Levels",
        ];
        price = 1599.0;
        sampleCollection = "Nasal Swab, Blood";
        reportDeliveryTime = "6-24 hours";
        category = "specializedScreening";
        isActive = true;
        iconName = "covid-screening";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 8;
        packageName = "Liver & Kidney Function Combo";
        description = "Comprehensive assessment of liver and kidney health and function";
        shortDescription = "Liver and kidney function assessment";
        testInclusions = [
          "Liver Function Test (SGOT, SGPT, Bilirubin, Alkaline Phosphatase)",
          "Kidney Function Test (Creatinine, BUN, Uric Acid)", "Electrolytes", "Protein Studies",
        ];
        price = 1199.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "24 hours";
        category = "organFunction";
        isActive = true;
        iconName = "liver-kidney";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 9;
        packageName = "Women's Wellness Package";
        description = "Comprehensive women's health screening focusing on hormonal balance and reproductive wellness";
        shortDescription = "Women's wellness and hormonal balance";
        testInclusions = [
          "Complete Blood Count", "Thyroid Profile (T3, T4, TSH)", "Vitamin D3", "B12", "Folate",
          "Iron Studies", "Hormonal Panel (FSH, LH, Estradiol)", "Pap Smear", "Breast Ultrasound", "Bone Density Scan",
        ];
        price = 3199.0;
        sampleCollection = "Blood, Cervical Sample";
        reportDeliveryTime = "48-72 hours";
        category = "genderSpecific";
        isActive = true;
        iconName = "womens-wellness";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 10;
        packageName = "Senior Citizen Comprehensive Package";
        description = "Extensive health evaluation designed specifically for seniors above 65 years with age-related health concerns";
        shortDescription = "Comprehensive senior health evaluation";
        testInclusions = [
          "Complete Blood Count", "Comprehensive Metabolic Panel", "Lipid Profile", "HbA1c",
          "Thyroid Function", "Vitamin D3", "B12", "PSA (for men)", "Bone Density",
          "Chest X-Ray", "ECG", "ECHO", "Cognitive Assessment",
        ];
        price = 4299.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48-72 hours";
        category = "ageSpecific";
        isActive = true;
        iconName = "senior-comprehensive";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 11;
        packageName = "Heart & Cardiac Risk Assessment";
        description = "Advanced cardiovascular health evaluation with comprehensive cardiac risk stratification";
        shortDescription = "Advanced cardiac risk assessment";
        testInclusions = [
          "Advanced Lipid Profile", "Cardiac Markers (Troponin, CK-MB, BNP)", "ECG", "ECHO",
          "Stress Test", "Carotid Doppler", "Ankle-Brachial Index", "Homocysteine", "hs-CRP",
        ];
        price = 3899.0;
        sampleCollection = "Blood";
        reportDeliveryTime = "48-72 hours";
        category = "specializedScreening";
        isActive = true;
        iconName = "cardiac-risk";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 12;
        packageName = "Thyroid & Hormone Balance Package";
        description = "Complete hormonal health assessment focusing on thyroid function and endocrine balance";
        shortDescription = "Thyroid and hormonal balance";
        testInclusions = [
          "Complete Thyroid Panel (T3, T4, TSH, Anti-TPO, Anti-Thyroglobulin)",
          "Cortisol", "Insulin", "DHEA-S", "Testosterone", "Thyroid Ultrasound",
        ];
        price = 2599.0;
        sampleCollection = "Blood";
        reportDeliveryTime = "48 hours";
        category = "specializedScreening";
        isActive = true;
        iconName = "hormone-balance";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 13;
        packageName = "Liver & Kidney Health Panel";
        description = "Comprehensive organ function assessment with detailed liver and kidney health evaluation";
        shortDescription = "Comprehensive organ function assessment";
        testInclusions = [
          "Complete Liver Function Panel", "Comprehensive Kidney Function Tests",
          "Hepatitis B & C Screening", "Protein Studies", "Electrolyte Panel",
          "Urine Analysis", "Abdominal Ultrasound",
        ];
        price = 2199.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48 hours";
        category = "organFunction";
        isActive = true;
        iconName = "organ-health";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 14;
        packageName = "Advanced Diabetes Monitoring Package";
        description = "Comprehensive diabetes management and complication screening for diabetic patients";
        shortDescription = "Advanced diabetes management";
        testInclusions = [
          "Fasting & Postprandial Glucose", "HbA1c", "Insulin Levels", "C-Peptide",
          "Lipid Profile", "Kidney Function", "Microalbumin", "Diabetic Retinal Screening",
          "Diabetic Foot Assessment", "Nerve Conduction Study",
        ];
        price = 3299.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48-72 hours";
        category = "diseaseManagement";
        isActive = true;
        iconName = "diabetes-advanced";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 15;
        packageName = "Pre-Employment Checkup";
        description = "Standard medical examination required for employment with fitness certification";
        shortDescription = "Employment medical examination";
        testInclusions = [
          "Complete Blood Count", "Blood Sugar", "Chest X-Ray", "ECG",
          "Vision Test", "Hearing Test", "Blood Pressure Check",
          "General Physical Examination", "Fitness Certificate",
        ];
        price = 1499.0;
        sampleCollection = "Blood";
        reportDeliveryTime = "24-48 hours";
        category = "preventiveCare";
        isActive = true;
        iconName = "pre-employment";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 16;
        packageName = "Corporate Executive Health Checkup";
        description = "Premium health screening designed for busy executives with comprehensive health assessment";
        shortDescription = "Executive health screening";
        testInclusions = [
          "Executive Physical Exam", "Complete Blood Count", "Comprehensive Metabolic Panel",
          "Lipid Profile", "Thyroid Function", "Vitamin Profile", "Cardiac Assessment (ECG, ECHO)",
          "Chest X-Ray", "Abdominal Ultrasound", "Stress Management Consultation",
        ];
        price = 4999.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48-72 hours";
        category = "preventiveCare";
        isActive = true;
        iconName = "executive-health";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 17;
        packageName = "Mother & Child Health Package";
        description = "Comprehensive health screening for pregnant mothers and pediatric health assessment";
        shortDescription = "Mother and child health screening";
        testInclusions = [
          "Antenatal Profile (CBC, Blood Group, Glucose, Thyroid, Infections)", "Ultrasound",
          "Iron Studies", "Vitamin D3", "B12", "Folate", "Child Vaccination Status",
          "Growth Assessment", "Developmental Screening",
        ];
        price = 2899.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48 hours";
        category = "genderSpecific";
        isActive = true;
        iconName = "mother-child";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 18;
        packageName = "Preventive Health Checkup (Basic)";
        description = "Essential health screening for early detection and prevention of common health issues";
        shortDescription = "Basic preventive health screening";
        testInclusions = [
          "Complete Blood Count", "Blood Sugar", "Lipid Profile", "Liver Function",
          "Kidney Function", "Thyroid Function", "Chest X-Ray", "ECG",
        ];
        price = 1799.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "24-48 hours";
        category = "preventiveCare";
        isActive = true;
        iconName = "preventive-basic";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
      {
        packageId = 19;
        packageName = "Preventive Health Checkup (Advanced)";
        description = "Comprehensive preventive health screening with advanced diagnostic tests and health risk assessment";
        shortDescription = "Advanced preventive health screening";
        testInclusions = [
          "Complete Blood Count", "Comprehensive Metabolic Panel", "Advanced Lipid Profile",
          "Tumor Markers", "Vitamin Profile", "Cardiac Assessment", "Chest X-Ray",
          "Abdominal Ultrasound", "Bone Density", "Health Risk Assessment",
        ];
        price = 3799.0;
        sampleCollection = "Blood, Urine";
        reportDeliveryTime = "48-72 hours";
        category = "preventiveCare";
        isActive = true;
        iconName = "preventive-advanced";
        createdAt = Time.now();
        updatedAt = Time.now();
      },
    ]);

    packages1;
  };

  public query func getAllHealthPackages() : async [HealthPackage] {
    let activePackages = healthPackages.values().toArray().filter(
      func(pkg) { pkg.isActive }
    );
    if (activePackages.size() == 0) {
      getDefaultHealthPackages().toArray();
    } else {
      activePackages;
    };
  };

  public query func getHealthPackageById(packageId : Nat) : async ?HealthPackage {
    healthPackages.get(packageId);
  };

  public query func getHealthPackagesByCategory(category : Text) : async [HealthPackage] {
    let filteredPackages = healthPackages.values().toArray().filter(
      func(pkg) {
        pkg.category == category and pkg.isActive;
      }
    );
    if (filteredPackages.size() > 0) {
      filteredPackages;
    } else {
      let defaultPackages = getDefaultHealthPackages().toArray();
      defaultPackages.filter(func(pkg) { pkg.category == category });
    };
  };

  public query func getActiveHealthPackages() : async [HealthPackage] {
    let activePackages = healthPackages.values().toArray().filter(
      func(pkg) { pkg.isActive }
    );
    if (activePackages.size() == 0) {
      getDefaultHealthPackages().toArray().filter(func(pkg) { pkg.isActive });
    } else {
      activePackages;
    };
  };

  public query func getHealthPackagesByPriceRange(minPrice : Float, maxPrice : Float) : async [HealthPackage] {
    healthPackages.values().toArray().filter(
      func(pkg) {
        pkg.price >= minPrice and pkg.price <= maxPrice and pkg.isActive;
      }
    );
  };

  public query func getHealthPackagesBySampleType(sampleType : Text) : async [HealthPackage] {
    healthPackages.values().toArray().filter(
      func(pkg) {
        pkg.sampleCollection.contains(#text(sampleType)) and pkg.isActive;
      }
    );
  };

  public query func getHealthPackageCategories() : async [Text] {
    let categories = healthPackages.values().toArray().map(
      func(pkg) {
        pkg.category;
      }
    );
    if (categories.size() == 0) {
      let defaultPackages = getDefaultHealthPackages().toArray();
      defaultPackages.map(func(pkg) { pkg.category });
    } else {
      categories;
    };
  };

  public shared ({ caller }) func addHealthPackage(
    packageName : Text,
    description : Text,
    shortDescription : Text,
    testInclusions : [Text],
    price : Float,
    sampleCollection : Text,
    reportDeliveryTime : Text,
    category : Text,
    iconName : Text,
  ) : async Nat {
    requireAdminOrLabExecutive(caller);

    let id = nextPackageId;
    let healthPackage : HealthPackage = {
      packageId = id;
      packageName;
      description;
      shortDescription;
      testInclusions;
      price;
      sampleCollection;
      reportDeliveryTime;
      category;
      isActive = true;
      iconName;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    healthPackages.add(id, healthPackage);
    nextPackageId += 1;
    id;
  };

  public shared ({ caller }) func updateHealthPackage(
    packageId : Nat,
    packageName : Text,
    description : Text,
    shortDescription : Text,
    testInclusions : [Text],
    price : Float,
    sampleCollection : Text,
    reportDeliveryTime : Text,
    category : Text,
    iconName : Text,
  ) : async () {
    requireAdminOrLabExecutive(caller);

    switch (healthPackages.get(packageId)) {
      case (null) {
        Runtime.trap("Package with given ID does not exist");
      };
      case (?_) {
        let updatedPackage : HealthPackage = {
          packageId;
          packageName;
          description;
          shortDescription;
          testInclusions;
          price;
          sampleCollection;
          reportDeliveryTime;
          category;
          isActive = true;
          iconName;
          createdAt = Time.now();
          updatedAt = Time.now();
        };
        healthPackages.add(packageId, updatedPackage);
      };
    };
  };

  public shared ({ caller }) func deleteHealthPackage(packageId : Nat) : async () {
    requireAdminOrLabExecutive(caller);

    if (not healthPackages.containsKey(packageId)) {
      Runtime.trap("Package with given ID does not exist");
    };
    healthPackages.remove(packageId);
  };

  public query ({ caller }) func getServiceIcons() : async [(Text, Text)] {
    serviceIconMap.toArray();
  };
};
