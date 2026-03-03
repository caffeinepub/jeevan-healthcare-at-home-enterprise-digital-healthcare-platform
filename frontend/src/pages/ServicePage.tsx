import { useParams, useNavigate } from '@tanstack/react-router';
import { Phone, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const serviceData: Record<
  string,
  {
    title: string;
    intro: string;
    image: string;
    servicesIncluded: string[];
    targetAudience: string[];
    benefits: string[];
  }
> = {
  'doctor-consultation': {
    title: 'Doctor Consultation at Home',
    intro:
      'Get expert medical consultation from qualified doctors in the comfort of your home. Our experienced physicians provide comprehensive health assessments, diagnosis, and treatment plans.',
    image: '/assets/generated/doctor-home-visit.dim_800x600.jpg',
    servicesIncluded: [
      'General physician consultation',
      'Specialist doctor visits',
      'Health assessment and diagnosis',
      'Prescription and treatment plans',
      'Follow-up consultations',
      'Medical certificates',
    ],
    targetAudience: [
      'Elderly patients with mobility issues',
      'Post-surgery recovery patients',
      'Chronic disease management',
      'Busy professionals',
      'Families with young children',
    ],
    benefits: [
      'No travel required - doctor comes to you',
      'Personalized attention in familiar environment',
      'Reduced exposure to hospital infections',
      'Flexible scheduling including weekends',
      'Comprehensive medical records maintained',
    ],
  },
  'medicine-delivery': {
    title: 'Medicine Delivery at Home',
    intro:
      'Never miss your medication with our reliable medicine delivery service. We deliver prescribed medicines and healthcare products directly to your doorstep.',
    image: '/assets/generated/medicine-delivery.dim_600x400.jpg',
    servicesIncluded: [
      'Prescription medicine delivery',
      'Over-the-counter medications',
      'Medical supplies and equipment',
      'Health supplements',
      'Emergency medicine delivery',
      'Medication reminders',
    ],
    targetAudience: [
      'Patients on regular medication',
      'Elderly individuals',
      'Bedridden patients',
      'Busy working professionals',
      'Families managing chronic conditions',
    ],
    benefits: [
      'Convenient doorstep delivery',
      'Genuine medicines from licensed pharmacies',
      'Medication tracking and reminders',
      'Emergency delivery available',
      'Competitive pricing',
    ],
  },
  'lab-tests': {
    title: 'Lab Tests & Diagnostics at Home',
    intro:
      'Complete diagnostic services at your doorstep. Our trained phlebotomists collect samples at home with NABL certified lab processing and digital reports.',
    image: '/assets/generated/lab-test-home.dim_800x600.jpg',
    servicesIncluded: [
      'Blood tests (CBC, lipid profile, etc.)',
      'Urine and stool analysis',
      'Diabetes screening',
      'Thyroid function tests',
      'Liver and kidney function tests',
      'Vitamin and mineral tests',
    ],
    targetAudience: [
      'Patients requiring regular monitoring',
      'Health-conscious individuals',
      'Pre-employment screening',
      'Elderly patients',
      'Families seeking preventive care',
    ],
    benefits: [
      'Home sample collection',
      'NABL certified lab partners',
      'Digital reports within 24 hours',
      'Accurate and reliable results',
      'Affordable pricing',
    ],
  },
  diagnostics: {
    title: 'X-Ray, ECG & EEG at Home',
    intro:
      'Advanced diagnostic imaging and cardiac monitoring services at home. Our portable equipment and trained technicians bring hospital-grade diagnostics to your doorstep.',
    image: '/assets/generated/lab-test-home.dim_800x600.jpg',
    servicesIncluded: [
      'Portable X-Ray imaging',
      'ECG (Electrocardiogram)',
      'EEG (Electroencephalogram)',
      'Holter monitoring',
      'Digital reports',
      'Doctor consultation for reports',
    ],
    targetAudience: [
      'Cardiac patients',
      'Post-surgery monitoring',
      'Neurological assessments',
      'Elderly patients',
      'Bedridden individuals',
    ],
    benefits: [
      'Hospital-grade portable equipment',
      'Trained technicians',
      'Quick report turnaround',
      'No travel stress',
      'Comfortable home environment',
    ],
  },
  'nursing-care': {
    title: 'Nursing Care at Home',
    intro:
      'Professional nursing care services delivered by experienced and certified nurses. We provide comprehensive medical care and support for patients recovering at home.',
    image: '/assets/generated/nursing-care-home.dim_800x600.jpg',
    servicesIncluded: [
      'Post-operative care',
      'Wound dressing and management',
      'IV administration',
      'Catheter care',
      'Medication management',
      'Vital signs monitoring',
      'Injection administration',
    ],
    targetAudience: [
      'Post-surgery patients',
      'Chronic illness management',
      'Elderly care',
      'Palliative care patients',
      'Rehabilitation patients',
    ],
    benefits: [
      'Certified and experienced nurses',
      'Personalized care plans',
      '24/7 availability',
      'Regular health monitoring',
      'Family training and support',
    ],
  },
  'caregiver-services': {
    title: 'Caregiver Services at Home',
    intro:
      'Compassionate and trained caregivers to assist with daily living activities. Our caregivers provide both medical and non-medical support for your loved ones.',
    image: '/assets/generated/nursing-care-home.dim_800x600.jpg',
    servicesIncluded: [
      'Personal hygiene assistance',
      'Mobility support',
      'Meal preparation',
      'Medication reminders',
      'Companionship',
      'Light housekeeping',
    ],
    targetAudience: [
      'Elderly individuals',
      'Patients with disabilities',
      'Post-surgery recovery',
      'Dementia and Alzheimer patients',
      'Families needing respite care',
    ],
    benefits: [
      'Trained and background-verified caregivers',
      'Flexible scheduling (hourly/daily/live-in)',
      'Personalized care approach',
      'Regular supervision and quality checks',
      'Affordable rates',
    ],
  },
  physiotherapy: {
    title: 'Physiotherapy at Home',
    intro:
      'Expert physiotherapy and rehabilitation services at home. Our licensed physiotherapists create customized treatment plans for faster recovery and improved mobility.',
    image: '/assets/generated/physiotherapy-home.dim_800x600.jpg',
    servicesIncluded: [
      'Post-surgery rehabilitation',
      'Sports injury recovery',
      'Stroke rehabilitation',
      'Orthopedic physiotherapy',
      'Geriatric physiotherapy',
      'Pain management',
      'Exercise therapy',
    ],
    targetAudience: [
      'Post-surgery patients',
      'Sports injury recovery',
      'Stroke patients',
      'Arthritis and joint pain',
      'Elderly mobility issues',
    ],
    benefits: [
      'Licensed physiotherapists',
      'Customized treatment plans',
      'Advanced equipment',
      'Convenient home sessions',
      'Progress tracking',
    ],
  },
  vaccination: {
    title: 'Vaccination at Home',
    intro:
      'Safe and convenient vaccination services at home for all age groups. Our trained healthcare professionals administer vaccines following all safety protocols.',
    image: '/assets/generated/nursing-care-home.dim_800x600.jpg',
    servicesIncluded: [
      'Infant and child vaccinations',
      'Adult immunizations',
      'Flu shots',
      'Travel vaccinations',
      'COVID-19 vaccination',
      'Vaccination records',
    ],
    targetAudience: [
      'Infants and children',
      'Elderly individuals',
      'Immunocompromised patients',
      'Busy families',
      'Travelers',
    ],
    benefits: [
      'Safe home administration',
      'Genuine vaccines',
      'Trained healthcare professionals',
      'Vaccination schedule management',
      'Digital records',
    ],
  },
  'equipment-rental': {
    title: 'Medical Equipment Rental & Sales',
    intro:
      'Quality medical equipment for home care needs. We provide both rental and sales options for a wide range of medical devices and equipment.',
    image: '/assets/generated/medical-equipment.dim_600x400.jpg',
    servicesIncluded: [
      'Hospital beds',
      'Wheelchairs and walkers',
      'Oxygen concentrators',
      'CPAP/BiPAP machines',
      'Patient monitors',
      'Nebulizers and suction machines',
    ],
    targetAudience: [
      'Post-surgery recovery',
      'Elderly care',
      'Chronic illness management',
      'Respiratory conditions',
      'Mobility challenges',
    ],
    benefits: [
      'Quality certified equipment',
      'Flexible rental periods',
      'Installation and training',
      'Maintenance support',
      'Affordable pricing',
    ],
  },
  'icu-setup': {
    title: 'Home ICU Setup & Monitoring',
    intro:
      'Complete ICU care at home with advanced medical equipment and 24/7 monitoring. Our team sets up a fully functional ICU environment in your home.',
    image: '/assets/generated/medical-equipment.dim_600x400.jpg',
    servicesIncluded: [
      'ICU bed setup',
      'Ventilator support',
      'Patient monitoring systems',
      '24/7 nursing care',
      'Doctor visits',
      'Emergency response',
    ],
    targetAudience: [
      'Critical care patients',
      'Post-ICU recovery',
      'Ventilator-dependent patients',
      'Palliative care',
      'Long-term critical care',
    ],
    benefits: [
      'Hospital-grade equipment',
      'Round-the-clock monitoring',
      'Experienced critical care team',
      'Family involvement',
      'Cost-effective compared to hospital ICU',
    ],
  },
  'health-checkups': {
    title: 'Preventive Health Checkups at Home',
    intro:
      'Comprehensive health screening packages at your doorstep. Early detection and prevention of health issues through regular checkups.',
    image: '/assets/generated/lab-test-home.dim_800x600.jpg',
    servicesIncluded: [
      'Full body checkup',
      'Cardiac screening',
      'Diabetes screening',
      'Cancer markers',
      'Vitamin deficiency tests',
      'Doctor consultation',
    ],
    targetAudience: [
      'Health-conscious individuals',
      'Adults above 40',
      'Family health screening',
      'Pre-employment checkups',
      'Annual health monitoring',
    ],
    benefits: [
      'Comprehensive packages',
      'Home sample collection',
      'Quick reports',
      'Doctor consultation included',
      'Affordable pricing',
    ],
  },
  'corporate-health': {
    title: 'Corporate & Occupational Health Services',
    intro:
      'Comprehensive workplace health solutions for businesses. We help organizations maintain a healthy workforce through preventive care and occupational health services.',
    image: '/assets/generated/doctor-home-visit.dim_800x600.jpg',
    servicesIncluded: [
      'Pre-employment checkups',
      'Annual health screenings',
      'On-site health camps',
      'Occupational health assessments',
      'Vaccination drives',
      'Health and wellness programs',
    ],
    targetAudience: [
      'Corporate organizations',
      'Manufacturing units',
      'IT companies',
      'Educational institutions',
      'Government organizations',
    ],
    benefits: [
      'Customized packages',
      'On-site services',
      'Compliance support',
      'Digital health records',
      'Competitive pricing',
    ],
  },
  'mother-child-care': {
    title: 'Mother & Child Care at Home',
    intro:
      'Specialized care for mothers and newborns. Our experienced team provides comprehensive support during pregnancy, delivery recovery, and early childcare.',
    image: '/assets/generated/nursing-care-home.dim_800x600.jpg',
    servicesIncluded: [
      'Prenatal care',
      'Postnatal care',
      'Newborn care',
      'Breastfeeding support',
      'Baby massage',
      'Vaccination for infants',
    ],
    targetAudience: [
      'Expecting mothers',
      'New mothers',
      'Newborns',
      'First-time parents',
      'High-risk pregnancies',
    ],
    benefits: [
      'Experienced maternal care nurses',
      'Personalized care plans',
      '24/7 support available',
      'Lactation consultation',
      'Family education',
    ],
  },
  'wellness-lifestyle': {
    title: 'Wellness & Lifestyle Management',
    intro:
      'Holistic health and wellness programs for a better quality of life. Our experts help you achieve your health goals through personalized plans.',
    image: '/assets/generated/physiotherapy-home.dim_800x600.jpg',
    servicesIncluded: [
      'Nutrition counseling',
      'Weight management',
      'Diabetes management',
      'Stress management',
      'Fitness programs',
      'Health coaching',
    ],
    targetAudience: [
      'Health-conscious individuals',
      'Weight management seekers',
      'Chronic disease patients',
      'Stress management',
      'Lifestyle improvement',
    ],
    benefits: [
      'Personalized programs',
      'Expert guidance',
      'Regular monitoring',
      'Sustainable lifestyle changes',
      'Holistic approach',
    ],
  },
  'specialist-care': {
    title: 'Specialist Care at Home',
    intro:
      'Access to specialist doctors at home for various medical conditions. Our network of specialists provides expert consultation and treatment.',
    image: '/assets/generated/doctor-home-visit.dim_800x600.jpg',
    servicesIncluded: [
      'Cardiologist consultation',
      'Diabetologist visits',
      'Neurologist assessment',
      'Orthopedic care',
      'Geriatric specialist',
      'Palliative care specialist',
    ],
    targetAudience: [
      'Chronic disease patients',
      'Elderly individuals',
      'Post-surgery care',
      'Complex medical conditions',
      'Second opinion seekers',
    ],
    benefits: [
      'Experienced specialists',
      'Comprehensive assessment',
      'Personalized treatment',
      'Convenient home visits',
      'Coordinated care',
    ],
  },
  'b2b-services': {
    title: 'B2B & Community Healthcare Services',
    intro:
      'Healthcare solutions for businesses, communities, and institutions. We partner with organizations to provide comprehensive health services.',
    image: '/assets/generated/doctor-home-visit.dim_800x600.jpg',
    servicesIncluded: [
      'Community health camps',
      'School health programs',
      'Residential society health services',
      'NGO partnerships',
      'Health awareness programs',
      'Bulk health packages',
    ],
    targetAudience: [
      'Residential societies',
      'Schools and colleges',
      'NGOs',
      'Community organizations',
      'Religious institutions',
    ],
    benefits: [
      'Customized solutions',
      'Volume discounts',
      'On-site services',
      'Health education',
      'Long-term partnerships',
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams({ from: '/services/$slug' });
  const navigate = useNavigate();

  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold text-jeevan-primary">Service Not Found</h1>
        <p className="mb-8 text-jeevan-text">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate({ to: '/' })} className="bg-jeevan-primary">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center space-x-2 text-sm text-jeevan-primary hover:text-jeevan-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-jeevan-primary py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {service.title} in Hyderabad
          </h1>
          <p className="text-lg text-white/90 md:text-xl">{service.intro}</p>
        </div>
      </section>

      {/* Service Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <img
            src={service.image}
            alt={service.title}
            className="mx-auto rounded-lg shadow-xl"
            style={{ maxHeight: '500px', width: 'auto' }}
          />
        </div>
      </section>

      {/* Services Included */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold text-jeevan-primary md:text-3xl">
                Services Included
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {service.servicesIncluded.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-jeevan-primary" />
                    <span className="text-jeevan-text">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-jeevan-primary md:text-3xl">
            Who Is This Service For?
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.targetAudience.map((audience, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-jeevan-primary/10 p-2">
                      <CheckCircle2 className="h-5 w-5 text-jeevan-primary" />
                    </div>
                    <span className="text-jeevan-text">{audience}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Jeevan */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-jeevan-primary md:text-3xl">
            Why Choose Jeevan HealthCare?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <Card key={index} className="border-jeevan-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-jeevan-primary" />
                    <span className="text-jeevan-text">{benefit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-jeevan-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Book This Service?</h2>
          <p className="mb-8 text-lg text-white/90">
            Contact us now to schedule your home healthcare service
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              asChild
              className="bg-white text-jeevan-primary hover:bg-jeevan-accent hover:text-white"
            >
              <a href="tel:+919700104108">
                <Phone className="mr-2 h-5 w-5" />
                Call +91 97001 04108
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-jeevan-primary"
            >
              <a
                href="https://wa.me/919700104108"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
