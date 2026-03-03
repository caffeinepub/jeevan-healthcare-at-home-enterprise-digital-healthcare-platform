import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Service, Info, Info__1, UserProfile, HealthcareRole, DashboardStats, SampleCollection, SanitizedUserProfile, Booking, Time, Customer, Patient, Vital, DoctorProfile, DoctorAppointment, DoctorEarning, DoctorDashboardStats, ConsultationNote, ExternalBlob, HealthPackage } from '../backend';
import { Principal } from '@dfinity/principal';
import { HealthcareRole as HealthcareRoleEnum } from '../backend';

export function useAllServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.allServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<Info | null>({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBrandInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<Info__1>({
    queryKey: ['brandInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getBrandInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasLabExecutiveCapabilities() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['hasLabExecutiveCapabilities'],
    queryFn: async () => {
      if (!actor) return false;
      const principal = await actor.getCallerUserProfile().then(profile => {
        if (!profile) return null;
        return Principal.fromText(profile.principal);
      });
      if (!principal) return false;
      return actor.hasLabExecutiveCapabilities(principal);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasPhlebotomistRole() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['hasPhlebotomistRole'],
    queryFn: async () => {
      if (!actor) return false;
      const principal = await actor.getCallerUserProfile().then(profile => {
        if (!profile) return null;
        return Principal.fromText(profile.principal);
      });
      if (!principal) return false;
      return actor.hasPhlebotomistRole(principal);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasDoctorRole() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['hasDoctorRole'],
    queryFn: async () => {
      if (!actor) return false;
      const profile = await actor.getCallerUserProfile();
      if (!profile) return false;
      return profile.role === HealthcareRoleEnum.doctor;
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useListAllUsers() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, UserProfile]>>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAssignHealthcareRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, role }: { user: Principal; role: HealthcareRole }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.assignHealthcareRole(user, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

export function useSetUserActiveStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, isActive }: { user: Principal; isActive: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setUserActiveStatus(user, isActive);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });
}

export function useLogout() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.logout();
    },
  });
}

// ============ Admin Dashboard Queries ============

export function useDashboardStats() {
  const { actor, isFetching } = useActor();

  return useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.previewGetDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['allBookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

// ============ Phlebotomist Queries ============

export function useSampleCollections() {
  const { actor, isFetching } = useActor();

  return useQuery<SampleCollection[]>({
    queryKey: ['sampleCollections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.previewGetSampleCollections();
    },
    enabled: !!actor && !isFetching,
  });
}

// ============ Customer Management Queries ============

export function useAllCustomers() {
  const { actor, isFetching } = useActor();

  return useQuery<Customer[]>({
    queryKey: ['allCustomers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCustomers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useCustomerById(customerId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Customer | null>({
    queryKey: ['customer', customerId?.toString()],
    queryFn: async () => {
      if (!actor || !customerId) return null;
      return actor.getCustomerById(customerId);
    },
    enabled: !!actor && !isFetching && customerId !== null,
  });
}

export function useMyCustomerProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<Customer | null>({
    queryKey: ['myCustomerProfile'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyCustomerProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCustomer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      referralCode: string;
      principalId: Principal | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addCustomer(data.name, data.phone, data.email, data.referralCode, data.principalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] });
    },
  });
}

export function useUpdateCustomer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      customerId: bigint;
      name: string;
      phone: string;
      email: string;
      referralCode: string;
      walletBalance: number;
      primaryPatientId: bigint;
      status: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateCustomer(
        data.customerId,
        data.name,
        data.phone,
        data.email,
        data.referralCode,
        data.walletBalance,
        data.primaryPatientId,
        data.status
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', variables.customerId.toString()] });
    },
  });
}

export function useDeleteCustomer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteCustomer(customerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] });
    },
  });
}

// ============ Patient Management Queries ============

export function useAllPatients() {
  const { actor, isFetching } = useActor();

  return useQuery<Patient[]>({
    queryKey: ['allPatients'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPatients();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function usePatientById(patientId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Patient | null>({
    queryKey: ['patient', patientId?.toString()],
    queryFn: async () => {
      if (!actor || !patientId) return null;
      return actor.getPatientById(patientId);
    },
    enabled: !!actor && !isFetching && patientId !== null,
  });
}

export function usePatientsByCustomerId(customerId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Patient[]>({
    queryKey: ['patientsByCustomer', customerId?.toString()],
    queryFn: async () => {
      if (!actor || !customerId) return [];
      return actor.getPatientsByCustomerId(customerId);
    },
    enabled: !!actor && !isFetching && customerId !== null,
  });
}

export function useMyPatients() {
  const { actor, isFetching } = useActor();

  return useQuery<Patient[]>({
    queryKey: ['myPatients'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPatient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      customerId: bigint;
      name: string;
      dob: string;
      gender: string;
      relationship: string;
      bloodGroup: string;
      chronicConditions: string[];
      emergencyContact: string;
      isPrimary: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addPatient(
        data.customerId,
        data.name,
        data.dob,
        data.gender,
        data.relationship,
        data.bloodGroup,
        data.chronicConditions,
        data.emergencyContact,
        data.isPrimary
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allPatients'] });
      queryClient.invalidateQueries({ queryKey: ['patientsByCustomer', variables.customerId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['myPatients'] });
    },
  });
}

export function useUpdatePatient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      patientId: bigint;
      customerId: bigint;
      name: string;
      dob: string;
      gender: string;
      relationship: string;
      bloodGroup: string;
      chronicConditions: string[];
      emergencyContact: string;
      isPrimary: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePatient(
        data.patientId,
        data.customerId,
        data.name,
        data.dob,
        data.gender,
        data.relationship,
        data.bloodGroup,
        data.chronicConditions,
        data.emergencyContact,
        data.isPrimary
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allPatients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', variables.patientId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['patientsByCustomer', variables.customerId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['myPatients'] });
    },
  });
}

export function useDeletePatient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patientId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePatient(patientId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPatients'] });
      queryClient.invalidateQueries({ queryKey: ['myPatients'] });
    },
  });
}

// ============ Vitals Management Queries ============

export function useAllVitals() {
  const { actor, isFetching } = useActor();

  return useQuery<Vital[]>({
    queryKey: ['allVitals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVitals();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useVitalById(vitalId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Vital | null>({
    queryKey: ['vital', vitalId?.toString()],
    queryFn: async () => {
      if (!actor || !vitalId) return null;
      return actor.getVitalById(vitalId);
    },
    enabled: !!actor && !isFetching && vitalId !== null,
  });
}

export function useVitalsByPatientId(patientId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Vital[]>({
    queryKey: ['vitalsByPatient', patientId?.toString()],
    queryFn: async () => {
      if (!actor || !patientId) return [];
      return actor.getVitalsByPatientId(patientId);
    },
    enabled: !!actor && !isFetching && patientId !== null,
  });
}

export function useMyFamilyVitals() {
  const { actor, isFetching } = useActor();

  return useQuery<Vital[]>({
    queryKey: ['myFamilyVitals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyFamilyVitals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      patientId: bigint;
      type: string;
      reading: string;
      unit: string;
      status: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addVital(data.patientId, data.type, data.reading, data.unit, data.status);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allVitals'] });
      queryClient.invalidateQueries({ queryKey: ['vitalsByPatient', variables.patientId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['myFamilyVitals'] });
    },
  });
}

export function useUpdateVital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      vitalId: bigint;
      patientId: bigint;
      type: string;
      reading: string;
      unit: string;
      status: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateVital(
        data.vitalId,
        data.patientId,
        data.type,
        data.reading,
        data.unit,
        data.status
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allVitals'] });
      queryClient.invalidateQueries({ queryKey: ['vital', variables.vitalId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['vitalsByPatient', variables.patientId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['myFamilyVitals'] });
    },
  });
}

export function useDeleteVital() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vitalId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteVital(vitalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allVitals'] });
      queryClient.invalidateQueries({ queryKey: ['myFamilyVitals'] });
    },
  });
}

// ============ Doctor Module Queries ============

export function useDoctorDashboardStats() {
  const { actor, isFetching } = useActor();

  return useQuery<DoctorDashboardStats | null>({
    queryKey: ['doctorDashboardStats'],
    queryFn: async () => {
      if (!actor) return null;
      // For now, using mock doctor ID 1
      return actor.getDoctorDashboardData(BigInt(1));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDoctorAppointments() {
  const { actor, isFetching } = useActor();

  return useQuery<DoctorAppointment[]>({
    queryKey: ['doctorAppointments'],
    queryFn: async () => {
      if (!actor) return [];
      // For now, using mock doctor ID 1
      return actor.listDoctorAppointments(BigInt(1));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDoctorPatients() {
  const { actor, isFetching } = useActor();

  return useQuery<Patient[]>({
    queryKey: ['doctorPatients'],
    queryFn: async () => {
      if (!actor) return [];
      // Doctors can view all patients they have appointments with
      return actor.getAllPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDoctorEarnings() {
  const { actor, isFetching } = useActor();

  return useQuery<DoctorEarning[]>({
    queryKey: ['doctorEarnings'],
    queryFn: async () => {
      if (!actor) return [];
      // For now, using mock doctor ID 1
      return actor.getDoctorEarnings(BigInt(1));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateDoctorAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { appointmentId: bigint; updatedAppointment: DoctorAppointment }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateDoctorAppointment(data.appointmentId, data.updatedAppointment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctorAppointments'] });
      queryClient.invalidateQueries({ queryKey: ['doctorDashboardStats'] });
    },
  });
}

export function useSaveConsultationNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      appointmentId: bigint;
      doctorId: bigint;
      patientId: bigint;
      soapNotes: string;
      prescriptionFile: string;
      followupDate: Time;
      diagnosticRequests: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveConsultationNote(
        data.appointmentId,
        data.doctorId,
        data.patientId,
        data.soapNotes,
        data.prescriptionFile,
        data.followupDate,
        data.diagnosticRequests
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctorDashboardStats'] });
    },
  });
}

// ============ Prescription Upload ============

export function useUploadPrescription() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      file: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadPrescription(data.name, data.phone, data.email, data.file);
    },
  });
}

// ============ Health Packages Queries ============

export function useAllHealthPackages() {
  const { actor, isFetching } = useActor();

  return useQuery<HealthPackage[]>({
    queryKey: ['healthPackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllHealthPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useActiveHealthPackages() {
  const { actor, isFetching } = useActor();

  return useQuery<HealthPackage[]>({
    queryKey: ['activeHealthPackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveHealthPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHealthPackageById(packageId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<HealthPackage | null>({
    queryKey: ['healthPackage', packageId?.toString()],
    queryFn: async () => {
      if (!actor || !packageId) return null;
      return actor.getHealthPackageById(packageId);
    },
    enabled: !!actor && !isFetching && packageId !== null,
  });
}
