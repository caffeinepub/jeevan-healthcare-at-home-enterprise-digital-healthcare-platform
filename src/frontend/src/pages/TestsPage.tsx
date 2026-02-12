import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Filter, ShoppingCart, Upload, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import ProfileSetupModal from '../components/ProfileSetupModal';
import { useGetCallerUserProfile, useUploadPrescription } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';

// Expanded diagnostic tests catalog
const mockTests = [
  {
    id: 'test-1',
    name: 'Complete Blood Count (CBC)',
    category: 'Blood Tests',
    description: 'Comprehensive blood analysis including RBC, WBC, Platelets, Hemoglobin',
    mrp: 500,
    price: 350,
    turnaroundTime: '6 hours',
    fasting: false,
  },
  {
    id: 'test-2',
    name: 'Lipid Profile',
    category: 'Blood Tests',
    description: 'Cholesterol, Triglycerides, HDL, LDL, VLDL analysis',
    mrp: 800,
    price: 600,
    turnaroundTime: '12 hours',
    fasting: true,
  },
  {
    id: 'test-3',
    name: 'Thyroid Function Test (T3, T4, TSH)',
    category: 'Hormone Tests',
    description: 'Complete thyroid function assessment',
    mrp: 700,
    price: 500,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-4',
    name: 'Liver Function Test (LFT)',
    category: 'Organ Function',
    description: 'Complete liver enzyme and function analysis',
    mrp: 900,
    price: 650,
    turnaroundTime: '12 hours',
    fasting: true,
  },
  {
    id: 'test-5',
    name: 'Kidney Function Test (KFT)',
    category: 'Organ Function',
    description: 'Creatinine, Urea, BUN, and electrolyte analysis',
    mrp: 850,
    price: 600,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-6',
    name: 'Blood Sugar (Fasting & Postprandial)',
    category: 'Diabetes Tests',
    description: 'Fasting and post-meal blood glucose levels',
    mrp: 400,
    price: 250,
    turnaroundTime: '6 hours',
    fasting: true,
  },
  {
    id: 'test-7',
    name: 'HbA1c (Glycated Hemoglobin)',
    category: 'Diabetes Tests',
    description: '3-month average blood sugar level indicator',
    mrp: 600,
    price: 450,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-8',
    name: 'Vitamin D3',
    category: 'Vitamin Tests',
    description: 'Vitamin D3 (25-OH) level assessment',
    mrp: 1200,
    price: 900,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-9',
    name: 'Vitamin B12',
    category: 'Vitamin Tests',
    description: 'Vitamin B12 (Cobalamin) level measurement',
    mrp: 900,
    price: 650,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-10',
    name: 'Urine Routine & Microscopy',
    category: 'Urine Tests',
    description: 'Complete urine analysis including physical, chemical, and microscopic examination',
    mrp: 300,
    price: 200,
    turnaroundTime: '6 hours',
    fasting: false,
  },
  {
    id: 'test-11',
    name: 'Hemoglobin Test',
    category: 'Blood Tests',
    description: 'Measures hemoglobin levels to detect anemia',
    mrp: 200,
    price: 150,
    turnaroundTime: '4 hours',
    fasting: false,
  },
  {
    id: 'test-12',
    name: 'ESR (Erythrocyte Sedimentation Rate)',
    category: 'Blood Tests',
    description: 'Measures inflammation levels in the body',
    mrp: 250,
    price: 180,
    turnaroundTime: '6 hours',
    fasting: false,
  },
  {
    id: 'test-13',
    name: 'CRP (C-Reactive Protein)',
    category: 'Blood Tests',
    description: 'Detects inflammation and infection in the body',
    mrp: 600,
    price: 450,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-14',
    name: 'Serum Creatinine',
    category: 'Organ Function',
    description: 'Kidney function assessment',
    mrp: 350,
    price: 250,
    turnaroundTime: '8 hours',
    fasting: false,
  },
  {
    id: 'test-15',
    name: 'Blood Urea Nitrogen (BUN)',
    category: 'Organ Function',
    description: 'Kidney and liver function indicator',
    mrp: 350,
    price: 250,
    turnaroundTime: '8 hours',
    fasting: false,
  },
  {
    id: 'test-16',
    name: 'Serum Electrolytes (Sodium, Potassium, Chloride)',
    category: 'Blood Tests',
    description: 'Measures essential electrolyte balance',
    mrp: 600,
    price: 450,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-17',
    name: 'Calcium Test',
    category: 'Blood Tests',
    description: 'Serum calcium level measurement',
    mrp: 400,
    price: 300,
    turnaroundTime: '8 hours',
    fasting: false,
  },
  {
    id: 'test-18',
    name: 'Phosphorus Test',
    category: 'Blood Tests',
    description: 'Serum phosphorus level assessment',
    mrp: 400,
    price: 300,
    turnaroundTime: '8 hours',
    fasting: false,
  },
  {
    id: 'test-19',
    name: 'Magnesium Test',
    category: 'Blood Tests',
    description: 'Serum magnesium level measurement',
    mrp: 500,
    price: 380,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-20',
    name: 'Iron Studies (Serum Iron, TIBC, Ferritin)',
    category: 'Blood Tests',
    description: 'Complete iron profile for anemia assessment',
    mrp: 1200,
    price: 900,
    turnaroundTime: '24 hours',
    fasting: true,
  },
  {
    id: 'test-21',
    name: 'Cardiac Markers (Troponin, CK-MB)',
    category: 'Cardiac Tests',
    description: 'Heart attack and cardiac damage indicators',
    mrp: 1500,
    price: 1100,
    turnaroundTime: '6 hours',
    fasting: false,
  },
  {
    id: 'test-22',
    name: 'Prostate Specific Antigen (PSA)',
    category: 'Cancer Markers',
    description: 'Prostate cancer screening test for men',
    mrp: 1000,
    price: 750,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-23',
    name: 'Tumor Markers (CEA, CA 19-9, CA 125)',
    category: 'Cancer Markers',
    description: 'Cancer screening and monitoring markers',
    mrp: 2500,
    price: 1800,
    turnaroundTime: '48 hours',
    fasting: false,
  },
  {
    id: 'test-24',
    name: 'Hepatitis B Surface Antigen (HBsAg)',
    category: 'Infectious Disease',
    description: 'Hepatitis B infection screening',
    mrp: 500,
    price: 350,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-25',
    name: 'Hepatitis C Antibody',
    category: 'Infectious Disease',
    description: 'Hepatitis C infection screening',
    mrp: 800,
    price: 600,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-26',
    name: 'HIV Test',
    category: 'Infectious Disease',
    description: 'HIV antibody screening test',
    mrp: 600,
    price: 450,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-27',
    name: 'VDRL/RPR (Syphilis Test)',
    category: 'Infectious Disease',
    description: 'Syphilis infection screening',
    mrp: 400,
    price: 300,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-28',
    name: 'Dengue NS1 Antigen',
    category: 'Infectious Disease',
    description: 'Early dengue fever detection',
    mrp: 800,
    price: 600,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-29',
    name: 'Malaria Parasite Test',
    category: 'Infectious Disease',
    description: 'Malaria detection through blood smear',
    mrp: 400,
    price: 300,
    turnaroundTime: '6 hours',
    fasting: false,
  },
  {
    id: 'test-30',
    name: 'Typhoid Test (Widal)',
    category: 'Infectious Disease',
    description: 'Typhoid fever antibody detection',
    mrp: 500,
    price: 350,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-31',
    name: 'Stool Routine & Microscopy',
    category: 'Stool Tests',
    description: 'Complete stool analysis for digestive disorders',
    mrp: 350,
    price: 250,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-32',
    name: 'Semen Analysis',
    category: 'Fertility Tests',
    description: 'Male fertility assessment',
    mrp: 800,
    price: 600,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-33',
    name: 'Pregnancy Test (Beta HCG)',
    category: 'Hormone Tests',
    description: 'Quantitative pregnancy hormone test',
    mrp: 500,
    price: 350,
    turnaroundTime: '12 hours',
    fasting: false,
  },
  {
    id: 'test-34',
    name: 'Pap Smear',
    category: 'Women\'s Health',
    description: 'Cervical cancer screening test',
    mrp: 1000,
    price: 750,
    turnaroundTime: '48 hours',
    fasting: false,
  },
  {
    id: 'test-35',
    name: 'ECG (Electrocardiogram)',
    category: 'Cardiac Tests',
    description: 'Heart rhythm and electrical activity assessment',
    mrp: 400,
    price: 300,
    turnaroundTime: '2 hours',
    fasting: false,
  },
  {
    id: 'test-36',
    name: 'Chest X-Ray',
    category: 'Imaging Tests',
    description: 'Chest and lung imaging',
    mrp: 600,
    price: 450,
    turnaroundTime: '4 hours',
    fasting: false,
  },
  {
    id: 'test-37',
    name: 'Ultrasound Abdomen',
    category: 'Imaging Tests',
    description: 'Abdominal organs imaging',
    mrp: 1500,
    price: 1100,
    turnaroundTime: '24 hours',
    fasting: true,
  },
  {
    id: 'test-38',
    name: 'ECHO (Echocardiogram)',
    category: 'Cardiac Tests',
    description: 'Heart structure and function ultrasound',
    mrp: 2000,
    price: 1500,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-39',
    name: 'Stress Test',
    category: 'Cardiac Tests',
    description: 'Exercise-based heart function assessment',
    mrp: 2500,
    price: 1800,
    turnaroundTime: '24 hours',
    fasting: false,
  },
  {
    id: 'test-40',
    name: 'Pulmonary Function Test',
    category: 'Respiratory Tests',
    description: 'Lung capacity and function assessment',
    mrp: 1500,
    price: 1100,
    turnaroundTime: '24 hours',
    fasting: false,
  },
];

const mockPackages = [
  {
    id: 'pkg-1',
    name: 'Basic Health Checkup',
    description: 'Essential tests for overall health assessment',
    tests: ['CBC', 'Blood Sugar', 'Lipid Profile', 'Kidney Function'],
    mrp: 2500,
    price: 1500,
    testsIncluded: 15,
  },
  {
    id: 'pkg-2',
    name: 'Comprehensive Health Package',
    description: 'Complete health screening with 40+ parameters',
    tests: ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid', 'Vitamin D'],
    mrp: 5000,
    price: 3000,
    testsIncluded: 40,
  },
  {
    id: 'pkg-3',
    name: 'Diabetes Care Package',
    description: 'Specialized tests for diabetes monitoring',
    tests: ['HbA1c', 'Fasting Blood Sugar', 'Post-Prandial Sugar', 'Kidney Function'],
    mrp: 2000,
    price: 1200,
    testsIncluded: 12,
  },
  {
    id: 'pkg-4',
    name: 'Heart Health Package',
    description: 'Cardiac risk assessment and monitoring',
    tests: ['Lipid Profile', 'ECG', 'Troponin', 'CRP', 'Homocysteine'],
    mrp: 3500,
    price: 2200,
    testsIncluded: 18,
  },
];

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<ExternalBlob | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const uploadPrescription = useUploadPrescription();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleAddToCart = (item: any, type: 'test' | 'package') => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    const cartItem = {
      id: item.id,
      name: item.name,
      type,
      price: item.price,
      mrp: item.mrp,
      description: item.description,
    };

    addItem(cartItem);
    toast.success(`${item.name} added to cart`);
  };

  const validateContactForm = () => {
    const errors = {
      name: '',
      phone: '',
      email: '',
    };

    let isValid = true;

    // Validate name
    if (!contactFormData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Validate phone (Indian mobile format: 10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!contactFormData.phone.trim()) {
      errors.phone = 'Mobile number is required';
      isValid = false;
    } else if (!phoneRegex.test(contactFormData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    // Validate email
    if (!contactFormData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!contactFormData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handlePrescriptionUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, PNG) or PDF file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size should not exceed 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create ExternalBlob from bytes
      const blob = ExternalBlob.fromBytes(uint8Array);
      setUploadedFile(blob);

      // Show success toast
      toast.success('Prescription uploaded successfully');

      // Show contact form dialog
      setShowContactForm(true);
    } catch (error) {
      toast.error('Failed to upload prescription. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateContactForm()) {
      return;
    }

    if (!uploadedFile) {
      toast.error('No file uploaded');
      return;
    }

    try {
      await uploadPrescription.mutateAsync({
        name: contactFormData.name.trim(),
        phone: contactFormData.phone.trim(),
        email: contactFormData.email.trim(),
        file: uploadedFile,
      });

      // Close contact form
      setShowContactForm(false);

      // Reset form data
      setContactFormData({
        name: '',
        phone: '',
        email: '',
      });
      setFormErrors({
        name: '',
        phone: '',
        email: '',
      });
      setUploadedFile(null);

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      toast.error('Failed to submit prescription. Please try again.');
      console.error('Submission error:', error);
    }
  };

  const handleContactFormChange = (field: string, value: string) => {
    setContactFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const isContactFormValid = () => {
    return (
      contactFormData.name.trim() !== '' &&
      contactFormData.phone.trim() !== '' &&
      contactFormData.email.trim() !== '' &&
      /^[6-9]\d{9}$/.test(contactFormData.phone.trim()) &&
      contactFormData.email.includes('@')
    );
  };

  const isInCart = (id: string) => items.some((item) => item.id === id);

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockTests.map((t) => t.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileSetupModal open={showProfileSetup} />

      {/* Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-jeevan-primary">
              Contact Information
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Please provide your contact details so our team can reach you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={contactFormData.name}
                onChange={(e) => handleContactFormChange('name', e.target.value)}
                className={`rounded-lg ${formErrors.name ? 'border-red-500' : ''}`}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={contactFormData.phone}
                onChange={(e) => handleContactFormChange('phone', e.target.value)}
                maxLength={10}
                className={`rounded-lg ${formErrors.phone ? 'border-red-500' : ''}`}
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500">{formErrors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={contactFormData.email}
                onChange={(e) => handleContactFormChange('email', e.target.value)}
                className={`rounded-lg ${formErrors.email ? 'border-red-500' : ''}`}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <DialogFooter className="sm:justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowContactForm(false);
                  setContactFormData({ name: '', phone: '', email: '' });
                  setFormErrors({ name: '', phone: '', email: '' });
                  setUploadedFile(null);
                }}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isContactFormValid() || uploadPrescription.isPending}
                className="rounded-full bg-jeevan-primary hover:bg-jeevan-accent"
              >
                {uploadPrescription.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-jeevan-accent/10">
              <CheckCircle className="h-10 w-10 text-jeevan-accent" />
            </div>
            <DialogTitle className="text-2xl font-bold text-jeevan-primary">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 pt-2">
              Thank you for uploading your prescription. Our team will contact you soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full rounded-full bg-jeevan-primary hover:bg-jeevan-accent sm:w-auto px-8"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="bg-jeevan-primary py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Diagnostic Tests & Health Packages</h1>
            <p className="mb-8 text-lg text-white/90">
              Book lab tests and health checkups with home sample collection
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for tests, packages, or health conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-base"
              />
            </div>

            {/* Upload Prescription */}
            <div className="mt-6">
              <input
                type="file"
                id="prescription-upload"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handlePrescriptionUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                className="rounded-full border-white text-white hover:bg-white hover:text-jeevan-primary"
                onClick={() => document.getElementById('prescription-upload')?.click()}
                disabled={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload Prescription'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="tests" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="tests">Individual Tests</TabsTrigger>
              <TabsTrigger value="packages">Health Packages</TabsTrigger>
            </TabsList>

            {/* Individual Tests */}
            <TabsContent value="tests" className="mt-8">
              {/* Category Filter */}
              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? 'bg-jeevan-primary hover:bg-jeevan-accent'
                        : ''
                    }
                  >
                    {category === 'all' ? 'All Tests' : category}
                  </Button>
                ))}
              </div>

              {/* Tests Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTests.map((test) => (
                  <Card key={test.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {test.category}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{test.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-3">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-jeevan-primary">
                            ₹{test.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{test.mrp}
                          </span>
                          <Badge variant="outline" className="text-green-600">
                            {Math.round(((test.mrp - test.price) / test.mrp) * 100)}% OFF
                          </Badge>
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>⏱️ Report in {test.turnaroundTime}</p>
                          {test.fasting && <p>🍽️ Fasting required</p>}
                        </div>

                        <Button
                          className="w-full bg-jeevan-primary hover:bg-jeevan-accent"
                          onClick={() => handleAddToCart(test, 'test')}
                          disabled={isInCart(test.id)}
                        >
                          {isInCart(test.id) ? (
                            'Added to Cart'
                          ) : (
                            <>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTests.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No tests found matching your search.</p>
                </div>
              )}
            </TabsContent>

            {/* Health Packages */}
            <TabsContent value="packages" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                {mockPackages.map((pkg) => (
                  <Card key={pkg.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Package className="h-5 w-5 text-jeevan-primary" />
                            <CardTitle className="text-xl">{pkg.name}</CardTitle>
                          </div>
                          <CardDescription className="mt-2">{pkg.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-3xl font-bold text-jeevan-primary">
                            ₹{pkg.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{pkg.mrp}
                          </span>
                          <Badge variant="outline" className="text-green-600">
                            {Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% OFF
                          </Badge>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-medium">
                            Includes {pkg.testsIncluded} tests:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {pkg.tests.map((test, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {test}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-jeevan-primary hover:bg-jeevan-accent"
                          onClick={() => handleAddToCart(pkg, 'package')}
                          disabled={isInCart(pkg.id)}
                        >
                          {isInCart(pkg.id) ? (
                            'Added to Cart'
                          ) : (
                            <>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
