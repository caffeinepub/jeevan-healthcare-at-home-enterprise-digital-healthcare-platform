import React, { useState, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  ArrowLeft,
  User,
  Users,
  Briefcase,
  ChevronRight,
  Upload,
  X,
  FileText,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PatientType = 'self' | 'family' | 'corporate';
type Gender = 'male' | 'female' | 'other' | '';

interface PatientForm {
  name: string;
  age: string;
  gender: Gender;
  phone: string;
  address: string;
  symptoms: string;
}

const PATIENT_TYPES: { id: PatientType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: 'self',
    label: 'Self',
    icon: <User className="w-5 h-5" />,
    desc: 'Booking for yourself',
  },
  {
    id: 'family',
    label: 'Family Member',
    icon: <Users className="w-5 h-5" />,
    desc: 'Booking for a family member',
  },
  {
    id: 'corporate',
    label: 'Corporate Employee',
    icon: <Briefcase className="w-5 h-5" />,
    desc: 'Corporate health plan',
  },
];

export default function PatientDetailsPage() {
  const navigate = useNavigate();

  const search = useSearch({ strict: false }) as {
    doctorId?: string;
    consultationType?: string;
    fee?: string | number;
    date?: string;
    slot?: string;
  };

  const doctorId = search?.doctorId ?? '';
  const consultationType = search?.consultationType ?? '';
  const totalFee = Number(search?.fee ?? 0);
  const date = search?.date ?? '';
  const slot = search?.slot ?? '';

  const isHomeVisit = consultationType === 'Home Visit';

  const [patientType, setPatientType] = useState<PatientType | ''>('');
  const [form, setForm] = useState<PatientForm>({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    symptoms: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormChange = (field: keyof PatientForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid = (): boolean => {
    if (!patientType) return false;
    if (!form.name.trim()) return false;
    if (!form.age.trim() || isNaN(Number(form.age)) || Number(form.age) <= 0) return false;
    if (!form.gender) return false;
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) return false;
    if (isHomeVisit && !form.address.trim()) return false;
    if (!form.symptoms.trim()) return false;
    return true;
  };

  const handleContinue = () => {
    if (!isFormValid()) return;
    navigate({
      to: '/payment',
      search: {
        doctorId,
        consultationType,
        totalFee,
        date,
        timeSlot: slot,
        patientType,
        patientName: form.name,
        patientAge: form.age,
        patientGender: form.gender,
        patientPhone: form.phone,
        symptoms: form.symptoms,
      },
    } as never);
  };

  const patientTypeLabel =
    patientType === 'family'
      ? 'Family Member'
      : patientType === 'corporate'
      ? 'Corporate Employee'
      : patientType === 'self'
      ? 'Self'
      : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white pt-10 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate({ to: -1 as unknown as string })}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Patient Details</h1>
              <p className="text-blue-200 text-sm mt-0.5">Tell us about the patient</p>
            </div>
          </div>

          {/* Booking summary chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {consultationType && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {consultationType}
              </span>
            )}
            {totalFee > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                ₹{totalFee}
              </span>
            )}
            {date && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            )}
            {slot && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {slot}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-36 space-y-4">

        {/* Patient Type Selector */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-5">
          <h2 className="font-heading text-base font-semibold text-gray-800 mb-4">
            Who is this appointment for?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PATIENT_TYPES.map((type) => {
              const isActive = patientType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPatientType(type.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                    isActive
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:bg-blue-50/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {type.icon}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                      {type.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{type.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Patient Details Form */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-5 space-y-5">
          <h2 className="font-heading text-base font-semibold text-gray-800">
            Patient Information
          </h2>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              className="rounded-xl border-gray-200 focus:border-primary h-11"
            />
          </div>

          {/* Age & Gender row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                Age <span className="text-red-500">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 32"
                min={1}
                max={120}
                value={form.age}
                onChange={(e) => handleFormChange('age', e.target.value)}
                className="rounded-xl border-gray-200 focus:border-primary h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-1.5 pt-1">
                {(['male', 'female', 'other'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleFormChange('gender', g)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium capitalize transition-all ${
                      form.gender === g
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium select-none">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleFormChange('phone', val);
                }}
                className="rounded-xl border-gray-200 focus:border-primary h-11 pl-12"
              />
            </div>
            {form.phone.length > 0 && form.phone.replace(/\D/g, '').length < 10 && (
              <p className="text-xs text-red-500">Please enter a valid 10-digit phone number</p>
            )}
          </div>

          {/* Address — only for Home Visit */}
          {isHomeVisit && (
            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Home Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your complete home address for the visit (flat/house no., street, area, city, pincode)"
                value={form.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
                rows={3}
                className="rounded-xl border-gray-200 focus:border-primary resize-none"
              />
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <span>📍</span> The doctor will visit this address
              </p>
            </div>
          )}

          {/* Symptoms */}
          <div className="space-y-1.5">
            <Label htmlFor="symptoms" className="text-sm font-medium text-gray-700">
              Symptoms / Reason for Visit <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="symptoms"
              placeholder="Describe your symptoms or reason for consultation (e.g. fever, headache, routine checkup...)"
              value={form.symptoms}
              onChange={(e) => handleFormChange('symptoms', e.target.value)}
              rows={4}
              className="rounded-xl border-gray-200 focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Upload Reports */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-5 space-y-4">
          <div>
            <h2 className="font-heading text-base font-semibold text-gray-800">
              Upload Reports
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Optional — attach any relevant medical reports or prescriptions
            </p>
          </div>

          {/* Upload trigger */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-200 rounded-xl py-6 px-4 text-center hover:border-primary hover:bg-blue-50/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Click to upload files</p>
              <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG supported · Multiple files allowed</p>
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Selected files list */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Selected Files ({files.length})
              </p>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-blue-50/60 border border-blue-100 rounded-xl px-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {file.size < 1024 * 1024
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors shrink-0"
                    aria-label="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Validation hint */}
        {!isFormValid() && (patientType || form.name || form.age || form.gender || form.phone || form.symptoms) && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <span className="text-amber-500 text-base shrink-0 mt-0.5">ℹ️</span>
            <p className="text-xs text-amber-700 font-medium leading-relaxed">
              Please select a patient type and fill in all required fields marked with{' '}
              <span className="text-red-500">*</span> to continue.
            </p>
          </div>
        )}
      </div>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-card px-4 py-4 z-30">
        <div className="max-w-2xl mx-auto">
          {isFormValid() && (
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">{patientTypeLabel}</span>
              <span className="font-bold text-primary truncate max-w-[60%] text-right">
                {form.name}
              </span>
            </div>
          )}
          <Button
            onClick={handleContinue}
            disabled={!isFormValid()}
            className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isFormValid() ? (
              <>
                Continue to Payment <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              'Fill in all required fields'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
