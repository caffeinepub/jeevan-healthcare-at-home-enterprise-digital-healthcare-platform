// Shared mock doctor data used across DoctorConsultationPage, DoctorListingPage, and DoctorProfilePage

export interface MockDoctor {
  id: number;
  name: string;
  qualifications: string[];
  specialty: string;
  experience: number; // years
  rating: number; // 0–5 with 1 decimal
  consultationFee: number; // INR
  modes: ('Online' | 'Clinic' | 'Home Visit')[];
  profilePhoto?: string;
  availability: string[]; // e.g. ['Mon','Tue','Wed','Thu','Fri']
  bio?: string;
  languages?: string[];
  location?: string;
}

export const MOCK_DOCTORS: MockDoctor[] = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    qualifications: ['MBBS', 'MD (Internal Medicine)'],
    specialty: 'General Physician',
    experience: 12,
    rating: 4.8,
    consultationFee: 499,
    modes: ['Online', 'Clinic'],
    profilePhoto: '',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Dr. Priya Sharma is a highly experienced General Physician with over 12 years of practice. She specializes in managing chronic conditions, preventive care, and acute illnesses with a patient-first approach.',
    languages: ['English', 'Hindi', 'Telugu'],
    location: 'Banjara Hills, Hyderabad',
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    qualifications: ['MBBS', 'DM (Cardiology)', 'FACC'],
    specialty: 'Cardiologist',
    experience: 18,
    rating: 4.9,
    consultationFee: 1200,
    modes: ['Online', 'Clinic'],
    profilePhoto: '',
    availability: ['Mon', 'Wed', 'Fri'],
    bio: 'Dr. Rajesh Kumar is a renowned Cardiologist with 18 years of expertise in interventional cardiology and heart failure management. He has performed over 2000 cardiac procedures.',
    languages: ['English', 'Hindi'],
    location: 'Jubilee Hills, Hyderabad',
  },
  {
    id: 3,
    name: 'Dr. Ananya Reddy',
    qualifications: ['MBBS', 'MS (Orthopaedics)', 'DNB'],
    specialty: 'Orthopaedic Surgeon',
    experience: 9,
    rating: 4.6,
    consultationFee: 800,
    modes: ['Clinic', 'Home Visit'],
    profilePhoto: '',
    availability: ['Tue', 'Thu', 'Sat'],
    bio: 'Dr. Ananya Reddy is an Orthopaedic Surgeon specializing in joint replacement and sports injuries. She brings a minimally invasive approach to complex orthopaedic conditions.',
    languages: ['English', 'Telugu', 'Hindi'],
    location: 'Madhapur, Hyderabad',
  },
  {
    id: 4,
    name: 'Dr. Suresh Patel',
    qualifications: ['MBBS', 'MD (Dermatology)', 'DVD'],
    specialty: 'Dermatologist',
    experience: 14,
    rating: 4.7,
    consultationFee: 650,
    modes: ['Online', 'Clinic', 'Home Visit'],
    profilePhoto: '',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    bio: 'Dr. Suresh Patel is a leading Dermatologist with expertise in medical and cosmetic dermatology. He treats a wide range of skin conditions including acne, psoriasis, and skin cancer.',
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'Kondapur, Hyderabad',
  },
  {
    id: 5,
    name: 'Dr. Meena Iyer',
    qualifications: ['MBBS', 'MD (Paediatrics)', 'DCH'],
    specialty: 'Paediatrician',
    experience: 11,
    rating: 4.9,
    consultationFee: 550,
    modes: ['Online', 'Home Visit'],
    profilePhoto: '',
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    bio: 'Dr. Meena Iyer is a compassionate Paediatrician dedicated to child health and development. She has extensive experience in neonatal care, childhood vaccinations, and developmental disorders.',
    languages: ['English', 'Tamil', 'Hindi'],
    location: 'Gachibowli, Hyderabad',
  },
  {
    id: 6,
    name: 'Dr. Vikram Singh',
    qualifications: ['MBBS', 'DM (Neurology)', 'MRCP'],
    specialty: 'Neurologist',
    experience: 22,
    rating: 4.8,
    consultationFee: 1500,
    modes: ['Online', 'Clinic'],
    profilePhoto: '',
    availability: ['Tue', 'Thu'],
    bio: 'Dr. Vikram Singh is a senior Neurologist with 22 years of experience in treating complex neurological disorders including epilepsy, stroke, Parkinson\'s disease, and multiple sclerosis.',
    languages: ['English', 'Hindi'],
    location: 'Secunderabad, Hyderabad',
  },
  {
    id: 7,
    name: 'Dr. Lakshmi Devi',
    qualifications: ['MBBS', 'MS (Gynaecology)', 'DNB'],
    specialty: 'Gynaecologist',
    experience: 16,
    rating: 4.7,
    consultationFee: 900,
    modes: ['Online', 'Clinic', 'Home Visit'],
    profilePhoto: '',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Dr. Lakshmi Devi is an experienced Gynaecologist specializing in high-risk pregnancies, laparoscopic surgeries, and women\'s reproductive health. She is known for her empathetic patient care.',
    languages: ['English', 'Telugu', 'Hindi'],
    location: 'Kukatpally, Hyderabad',
  },
  {
    id: 8,
    name: 'Dr. Arun Nair',
    qualifications: ['MBBS', 'MD (Psychiatry)', 'DPM'],
    specialty: 'Psychiatrist',
    experience: 8,
    rating: 4.5,
    consultationFee: 700,
    modes: ['Online'],
    profilePhoto: '',
    availability: ['Mon', 'Wed', 'Fri'],
    bio: 'Dr. Arun Nair is a Psychiatrist specializing in anxiety disorders, depression, OCD, and addiction medicine. He uses evidence-based therapies combined with medication management.',
    languages: ['English', 'Malayalam', 'Hindi'],
    location: 'Hitech City, Hyderabad',
  },
  {
    id: 9,
    name: 'Dr. Kavitha Rao',
    qualifications: ['MBBS', 'MD (Endocrinology)', 'DM'],
    specialty: 'Endocrinologist',
    experience: 13,
    rating: 4.6,
    consultationFee: 1000,
    modes: ['Online', 'Clinic'],
    profilePhoto: '',
    availability: ['Tue', 'Thu', 'Sat'],
    bio: 'Dr. Kavitha Rao is an Endocrinologist with expertise in diabetes management, thyroid disorders, and hormonal imbalances. She takes a holistic approach to metabolic health.',
    languages: ['English', 'Kannada', 'Hindi'],
    location: 'Ameerpet, Hyderabad',
  },
  {
    id: 10,
    name: 'Dr. Sanjay Mehta',
    qualifications: ['MBBS', 'MS (General Surgery)', 'FRCS'],
    specialty: 'General Surgeon',
    experience: 20,
    rating: 4.8,
    consultationFee: 1100,
    modes: ['Clinic'],
    profilePhoto: '',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Dr. Sanjay Mehta is a highly skilled General Surgeon with 20 years of experience in laparoscopic and open surgeries. He specializes in hernia repair, appendectomy, and gallbladder surgeries.',
    languages: ['English', 'Hindi', 'Marathi'],
    location: 'Begumpet, Hyderabad',
  },
  {
    id: 11,
    name: 'Dr. Deepa Krishnan',
    qualifications: ['MBBS', 'MD (Ophthalmology)', 'DO'],
    specialty: 'Ophthalmologist',
    experience: 7,
    rating: 4.4,
    consultationFee: 600,
    modes: ['Online', 'Clinic'],
    profilePhoto: '',
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    bio: 'Dr. Deepa Krishnan is an Ophthalmologist specializing in cataract surgery, LASIK, and retinal disorders. She is committed to preserving and restoring vision with the latest techniques.',
    languages: ['English', 'Tamil', 'Telugu'],
    location: 'Dilsukhnagar, Hyderabad',
  },
  {
    id: 12,
    name: 'Dr. Ramesh Gupta',
    qualifications: ['MBBS', 'MD (Pulmonology)', 'FCCP'],
    specialty: 'Pulmonologist',
    experience: 15,
    rating: 4.7,
    consultationFee: 850,
    modes: ['Online', 'Clinic', 'Home Visit'],
    profilePhoto: '',
    availability: ['Tue', 'Thu', 'Sat'],
    bio: 'Dr. Ramesh Gupta is a Pulmonologist with 15 years of experience treating respiratory conditions including asthma, COPD, sleep apnea, and interstitial lung diseases.',
    languages: ['English', 'Hindi'],
    location: 'LB Nagar, Hyderabad',
  },
];

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function isTodayAvailable(availability: string[]): boolean {
  const today = DAY_ABBR[new Date().getDay()];
  return availability.includes(today);
}

export function getDoctorById(id: number): MockDoctor | undefined {
  return MOCK_DOCTORS.find((d) => d.id === id);
}

export function getDoctorsBySpecialty(specialty: string): MockDoctor[] {
  const q = specialty.toLowerCase();
  return MOCK_DOCTORS.filter(
    (d) =>
      d.specialty.toLowerCase().includes(q) ||
      d.specialty.toLowerCase() === q
  );
}
