import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface Data {
    id: bigint;
    metaDescription: string;
    pageDescription: string;
    metaKeywords: string;
    keywords: Array<string>;
    metaTitle: string;
    canonicalUrl: string;
    pageTitle: string;
}
export interface DoctorProfile {
    status: string;
    doctorId: bigint;
    userId: bigint;
    createdAt: Time;
    profilePhoto: string;
    qualifications: Array<string>;
    experience: bigint;
    availability: string;
    specialization: string;
    totalConsultations: bigint;
    rating: number;
    certifications: Array<string>;
    consultationFee: number;
}
export interface Vital {
    reading: string;
    status: string;
    vitalId: bigint;
    patientId: bigint;
    type: string;
    unit: string;
    timestamp: Time;
}
export interface Patient {
    dob: string;
    relationship: string;
    patientId: bigint;
    name: string;
    createdAt: Time;
    emergencyContact: string;
    isPrimary: boolean;
    bloodGroup: string;
    gender: string;
    customerId: bigint;
    chronicConditions: Array<string>;
}
export interface PrescriptionLead {
    id: bigint;
    file: ExternalBlob;
    name: string;
    createdAt: Time;
    email: string;
    phone: string;
}
export interface DoctorDashboardStats {
    completedConsultations: bigint;
    todayAppointments: bigint;
    totalPatients: bigint;
    pendingPrescriptions: bigint;
    rating: number;
    earningsToday: number;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface BookedTime {
    id: bigint;
    urgencyLevel: string;
    bookingId: bigint;
    patientComments: string;
    sampleCollectionTime: bigint;
    cateringPreference: string;
    timeUnix: bigint;
}
export interface Booking {
    id: bigint;
    userName: string;
    address: string;
    serviceRequest: {
        subcategory: Subcategory;
        description: string;
        preferredDate?: bigint;
        preferredTime?: bigint;
        category: Category;
        urgent: boolean;
    };
    budget: bigint;
    requestType: {
        __kind__: "whatsapp";
        whatsapp: {
            phoneNumber: string;
        };
    } | {
        __kind__: "callBack";
        callBack: {
            requestedTime: bigint;
        };
    } | {
        __kind__: "scheduledVisit";
        scheduledVisit: {
            timestamp: bigint;
        };
    };
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface SampleCollection {
    id: bigint;
    status: string;
    scheduledTime: bigint;
    testNames: Array<string>;
    address: string;
    patientName: string;
}
export interface DoctorAppointment {
    fee: number;
    status: string;
    doctorId: bigint;
    patientId: bigint;
    createdAt: Time;
    notes: string;
    customerId: bigint;
    scheduledDateTime: Time;
    appointmentId: bigint;
    consultationType: string;
}
export interface DiagnosticTest {
    reportDeliveryTime: string;
    createdAt: Time;
    testName: string;
    sampleType: string;
    isActive: boolean;
    updatedAt: Time;
    preparationInstructions: string;
    category: string;
    searchKeywords: Array<string>;
    testDescription: string;
    price: number;
    testId: bigint;
}
export interface Service {
    id: bigint;
    metaDescription: string;
    subcategory: Subcategory;
    name: string;
    description: string;
    isActive: boolean;
    targetAudience: string;
    serviceIntro: string;
    seoKeywords: Array<string>;
    metaTitle: string;
    category: Category;
    benefits: string;
    servicesIncluded: string;
}
export interface DashboardStats {
    totalOrders: bigint;
    pendingReports: bigint;
    totalPhlebotomists: bigint;
    completedOrders: bigint;
    activeOrders: bigint;
    totalUsers: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Customer {
    status: string;
    primaryPatientId: bigint;
    referralCode: string;
    name: string;
    createdAt: Time;
    email: string;
    customerId: bigint;
    phone: string;
    walletBalance: number;
    principalId?: Principal;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface Info {
    locationUrl: string;
    email: string;
    address: string;
    openingHours: string;
    phone: string;
}
export interface SanitizedUserProfile {
    name: string;
    role: HealthcareRole;
    isActive: boolean;
}
export interface DoctorEarning {
    doctorId: bigint;
    paymentStatus: string;
    earningId: bigint;
    date: Time;
    paymentDate: Time;
    amount: number;
    appointmentId: bigint;
    transactionId: string;
}
export interface Info__1 {
    backgroundColor: string;
    primaryColor: string;
    logoUrl: string;
    fontFamily: string;
    secondaryColor: string;
    brandName: string;
    textColor: string;
}
export interface ConsultationNote {
    doctorId: bigint;
    diagnosticRequests: Array<string>;
    noteId: bigint;
    patientId: bigint;
    createdAt: Time;
    soapNotes: string;
    prescriptionFile: string;
    updatedAt: Time;
    followupDate: Time;
    appointmentId: bigint;
}
export interface HealthPackage {
    packageName: string;
    testInclusions: Array<string>;
    sampleCollection: string;
    reportDeliveryTime: string;
    createdAt: Time;
    description: string;
    isActive: boolean;
    iconName: string;
    updatedAt: Time;
    shortDescription: string;
    category: string;
    price: number;
    packageId: bigint;
}
export interface UserProfile {
    principal: string;
    documents: Array<string>;
    bookedTimes: Array<BookedTime>;
    bookedServices: Array<bigint>;
    name: string;
    role: HealthcareRole;
    insuranceDetails: string;
    isActive: boolean;
    email: string;
    locationHistory: Array<string>;
    phone: string;
    sharedProfile: boolean;
}
export enum Category {
    specializedCare = "specializedCare",
    medicalEquipment = "medicalEquipment",
    preventiveCare = "preventiveCare",
    primaryHealthcare = "primaryHealthcare"
}
export enum HealthcareRole {
    patient = "patient",
    corporateAdmin = "corporateAdmin",
    admin = "admin",
    doctor = "doctor",
    franchiseAdmin = "franchiseAdmin",
    labExecutive = "labExecutive",
    phlebotomist = "phlebotomist"
}
export enum Subcategory {
    motherChildCare = "motherChildCare",
    vaccination = "vaccination",
    wellnessLifestyle = "wellnessLifestyle",
    healthCheckups = "healthCheckups",
    caregiverServices = "caregiverServices",
    icuSetup = "icuSetup",
    b2bServices = "b2bServices",
    nursingCare = "nursingCare",
    doctorConsultation = "doctorConsultation",
    specialistCare = "specialistCare",
    equipmentRental = "equipmentRental",
    labTests = "labTests",
    physiotherapy = "physiotherapy",
    corporateHealth = "corporateHealth",
    diagnostics = "diagnostics",
    medicineDelivery = "medicineDelivery"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBooking(userName: string, address: string, budget: bigint, requestType: {
        __kind__: "whatsapp";
        whatsapp: {
            phoneNumber: string;
        };
    } | {
        __kind__: "callBack";
        callBack: {
            requestedTime: bigint;
        };
    } | {
        __kind__: "scheduledVisit";
        scheduledVisit: {
            timestamp: bigint;
        };
    }, serviceRequest: {
        subcategory: Subcategory;
        description: string;
        preferredDate?: bigint;
        preferredTime?: bigint;
        category: Category;
        urgent: boolean;
    }): Promise<{
        bookingId: bigint;
        message: string;
    }>;
    addCustomer(name: string, phone: string, email: string, referralCode: string, principalId: Principal | null): Promise<bigint>;
    addDoctorAppointment(doctorId: bigint, patientId: bigint, customerId: bigint, scheduledDateTime: Time, status: string, consultationType: string, fee: number, notes: string): Promise<bigint>;
    addDoctorProfile(userId: bigint, specialization: string, qualifications: Array<string>, experience: bigint, consultationFee: number, availability: string, profilePhoto: string, certifications: Array<string>, rating: number, totalConsultations: bigint, status: string): Promise<bigint>;
    addHealthPackage(packageName: string, description: string, shortDescription: string, testInclusions: Array<string>, price: number, sampleCollection: string, reportDeliveryTime: string, category: string, iconName: string): Promise<bigint>;
    addPatient(customerId: bigint, name: string, dob: string, gender: string, relationship: string, bloodGroup: string, chronicConditions: Array<string>, emergencyContact: string, isPrimary: boolean): Promise<bigint>;
    addSeoData(pageTitle: string, pageDescription: string, keywords: Array<string>, canonicalUrl: string, metaTitle: string, metaDescription: string, metaKeywords: string): Promise<bigint>;
    addService(name: string, category: Category, subcategory: Subcategory, description: string, serviceIntro: string, servicesIncluded: string, targetAudience: string, benefits: string, seoKeywords: Array<string>, metaTitle: string, metaDescription: string): Promise<bigint>;
    addVital(patientId: bigint, type: string, reading: string, unit: string, status: string): Promise<bigint>;
    allServices(): Promise<Array<Service>>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignHealthcareRole(user: Principal, role: HealthcareRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteConsultationNote(noteId: bigint): Promise<void>;
    deleteCustomer(customerId: bigint): Promise<void>;
    deleteDoctorAppointment(appointmentId: bigint): Promise<void>;
    deleteDoctorEarning(earningId: bigint): Promise<void>;
    deleteDoctorProfile(doctorId: bigint): Promise<void>;
    deleteHealthPackage(packageId: bigint): Promise<void>;
    deletePatient(patientId: bigint): Promise<void>;
    deleteSeoData(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    deleteVital(vitalId: bigint): Promise<void>;
    getActiveDiagnosticTests(): Promise<Array<DiagnosticTest>>;
    getActiveHealthPackages(): Promise<Array<HealthPackage>>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllCustomers(): Promise<Array<Customer>>;
    getAllDiagnosticTests(): Promise<Array<DiagnosticTest>>;
    getAllDoctors(): Promise<Array<DoctorProfile>>;
    getAllHealthPackages(): Promise<Array<HealthPackage>>;
    getAllPatients(): Promise<Array<Patient>>;
    getAllPrescriptionLeads(): Promise<Array<PrescriptionLead>>;
    getAllSeoData(): Promise<Array<Data>>;
    getAllVitals(): Promise<Array<Vital>>;
    getBookingById(bookingId: bigint): Promise<Booking | null>;
    getBookingsByUserProfile(user: Principal, role: HealthcareRole): Promise<Array<Booking>>;
    getBrandInfo(): Promise<Info__1>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConsultationNotesByAppointment(appointmentId: bigint): Promise<ConsultationNote | null>;
    getContactInfo(): Promise<Info | null>;
    getCustomerById(customerId: bigint): Promise<Customer | null>;
    getDiagnosticTestById(testId: bigint): Promise<DiagnosticTest | null>;
    getDiagnosticTestCategories(): Promise<Array<string>>;
    getDiagnosticTestSampleTypes(): Promise<Array<string>>;
    getDiagnosticTestsByCategory(category: string): Promise<Array<DiagnosticTest>>;
    getDiagnosticTestsByPriceRange(minPrice: number, maxPrice: number): Promise<Array<DiagnosticTest>>;
    getDiagnosticTestsBySampleType(sampleType: string): Promise<Array<DiagnosticTest>>;
    getDoctorById(doctorId: bigint): Promise<DoctorProfile | null>;
    getDoctorDashboardData(doctorId: bigint): Promise<DoctorDashboardStats | null>;
    getDoctorEarnings(doctorId: bigint): Promise<Array<DoctorEarning>>;
    getDoctorProfilesByCategory(category: string): Promise<Array<DoctorProfile>>;
    getDoctorProfilesBySpecialization(specialization: string): Promise<Array<DoctorProfile>>;
    getHealthPackageById(packageId: bigint): Promise<HealthPackage | null>;
    getHealthPackageCategories(): Promise<Array<string>>;
    getHealthPackagesByCategory(category: string): Promise<Array<HealthPackage>>;
    getHealthPackagesByPriceRange(minPrice: number, maxPrice: number): Promise<Array<HealthPackage>>;
    getHealthPackagesBySampleType(sampleType: string): Promise<Array<HealthPackage>>;
    getMyCustomerProfile(): Promise<Customer | null>;
    getMyFamilyVitals(): Promise<Array<Vital>>;
    getMyPatients(): Promise<Array<Patient>>;
    getPatientById(patientId: bigint): Promise<Patient | null>;
    getPatientsByCustomerId(customerId: bigint): Promise<Array<Patient>>;
    getPrescriptionLead(id: bigint): Promise<PrescriptionLead | null>;
    getServiceIcons(): Promise<Array<[string, string]>>;
    getServicesByCategory(category: Category): Promise<Array<Service>>;
    getServicesBySubcategory(subcategory: Subcategory): Promise<Array<Service>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserRoleByPrincipal(callerPrincipal: Principal): Promise<HealthcareRole>;
    getVitalById(vitalId: bigint): Promise<Vital | null>;
    getVitalsByPatientId(patientId: bigint): Promise<Array<Vital>>;
    hasLabExecutiveCapabilities(callerPrincipal: Principal): Promise<boolean>;
    hasPhlebotomistRole(callerPrincipal: Principal): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllUsers(): Promise<Array<[Principal, UserProfile]>>;
    listDoctorAppointments(doctorId: bigint): Promise<Array<DoctorAppointment>>;
    listServicesByCategory(category: Category): Promise<Array<Service>>;
    logout(): Promise<void>;
    previewGetAllBookings(): Promise<Array<Booking>>;
    previewGetAllServices(): Promise<Array<Service>>;
    previewGetAllUsers(): Promise<Array<SanitizedUserProfile>>;
    previewGetDashboardStats(): Promise<DashboardStats>;
    previewGetMockUsers(): Promise<Array<SanitizedUserProfile>>;
    previewGetSampleCollections(): Promise<Array<SampleCollection>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveConsultationNote(appointmentId: bigint, doctorId: bigint, patientId: bigint, soapNotes: string, prescriptionFile: string, followupDate: Time, diagnosticRequests: Array<string>): Promise<bigint>;
    searchDiagnosticTests(searchTerm: string): Promise<Array<DiagnosticTest>>;
    searchServicesByKeyword(keyword: string): Promise<Array<Service>>;
    setBrandInfo(brandName: string, logoUrl: string, primaryColor: string, secondaryColor: string, textColor: string, backgroundColor: string, fontFamily: string): Promise<void>;
    setContactInfo(phone: string, email: string, address: string, locationUrl: string, openingHours: string): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    setUserActiveStatus(user: Principal, isActive: boolean): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateConsultationNote(noteId: bigint, updatedNote: ConsultationNote): Promise<void>;
    updateCustomer(customerId: bigint, name: string, phone: string, email: string, referralCode: string, walletBalance: number, primaryPatientId: bigint, status: string): Promise<void>;
    updateDoctorAppointment(appointmentId: bigint, updatedAppointment: DoctorAppointment): Promise<void>;
    updateDoctorEarning(earningId: bigint, updatedEarning: DoctorEarning): Promise<void>;
    updateDoctorProfile(doctorId: bigint, updatedProfile: DoctorProfile): Promise<void>;
    updateHealthPackage(packageId: bigint, packageName: string, description: string, shortDescription: string, testInclusions: Array<string>, price: number, sampleCollection: string, reportDeliveryTime: string, category: string, iconName: string): Promise<void>;
    updatePatient(patientId: bigint, customerId: bigint, name: string, dob: string, gender: string, relationship: string, bloodGroup: string, chronicConditions: Array<string>, emergencyContact: string, isPrimary: boolean): Promise<void>;
    updateSeoData(id: bigint, pageTitle: string, pageDescription: string, keywords: Array<string>, canonicalUrl: string, metaTitle: string, metaDescription: string, metaKeywords: string): Promise<void>;
    updateService(id: bigint, name: string, category: Category, subcategory: Subcategory, description: string, serviceIntro: string, servicesIncluded: string, targetAudience: string, benefits: string, seoKeywords: Array<string>, metaTitle: string, metaDescription: string): Promise<void>;
    updateVital(vitalId: bigint, patientId: bigint, type: string, reading: string, unit: string, status: string): Promise<void>;
    uploadPrescription(name: string, phone: string, email: string, file: ExternalBlob): Promise<bigint>;
}
