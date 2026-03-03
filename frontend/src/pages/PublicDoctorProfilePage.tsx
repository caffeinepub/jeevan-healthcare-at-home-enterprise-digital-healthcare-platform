import React from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft,
  Star,
  Clock,
  IndianRupee,
  Video,
  Building2,
  Home,
  Stethoscope,
  MapPin,
  Languages,
  GraduationCap,
  CalendarCheck,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDoctorById, isTodayAvailable } from '@/lib/mockDoctors';

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const iconClass = size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textClass = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${iconClass} ${
            i < full
              ? 'fill-amber-400 text-amber-400'
              : i === full && hasHalf
              ? 'fill-amber-200 text-amber-400'
              : 'fill-gray-200 text-gray-300'
          }`}
        />
      ))}
      <span className={`ml-1.5 font-bold text-gray-800 ${textClass}`}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Mode Config ──────────────────────────────────────────────────────────────

const MODE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  Online: {
    icon: Video,
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    label: 'Online Consultation',
  },
  Clinic: {
    icon: Building2,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    label: 'Clinic Visit',
  },
  'Home Visit': {
    icon: Home,
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    label: 'Home Visit',
  },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

function DoctorAvatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg"
      />
    );
  }
  const initials = name
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-300 border-4 border-white shadow-lg flex items-center justify-center">
      <span className="text-blue-700 font-bold text-3xl font-heading">{initials}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PublicDoctorProfilePage() {
  const { doctorId } = useParams({ strict: false }) as { doctorId: string };
  const navigate = useNavigate();

  const doctor = getDoctorById(Number(doctorId));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
          <p className="text-gray-500 mb-6">The doctor profile you're looking for doesn't exist.</p>
          <Button
            onClick={() => navigate({ to: '/doctor-consultation' })}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctor Consultation
          </Button>
        </div>
      </div>
    );
  }

  const todayAvailable = isTodayAvailable(doctor.availability);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white pt-10 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate({ to: -1 as unknown as string })}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* Doctor Hero Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <DoctorAvatar name={doctor.name} photo={doctor.profilePhoto} />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="font-heading text-2xl md:text-3xl font-bold">{doctor.name}</h1>
                {todayAvailable && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 bg-emerald-900/40 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available Today
                  </span>
                )}
              </div>

              <p className="text-blue-200 font-medium text-base mb-1">{doctor.specialty}</p>
              <p className="text-blue-300 text-sm mb-3">{doctor.qualifications.join(' • ')}</p>

              <div className="flex flex-wrap items-center gap-4">
                <StarRating rating={doctor.rating} size="md" />
                <span className="flex items-center gap-1.5 text-sm text-blue-200">
                  <Clock className="w-4 h-4" />
                  {doctor.experience} Years Experience
                </span>
                {doctor.location && (
                  <span className="flex items-center gap-1.5 text-sm text-blue-200">
                    <MapPin className="w-4 h-4" />
                    {doctor.location}
                  </span>
                )}
              </div>
            </div>

            {/* Fee Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center min-w-[160px] shrink-0">
              <p className="text-blue-200 text-xs font-medium mb-1 uppercase tracking-wide">Starting Fee</p>
              <div className="flex items-center justify-center gap-1 mb-1">
                <IndianRupee className="w-5 h-5 text-white" />
                <span className="text-2xl font-bold text-white font-heading">
                  {doctor.consultationFee.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-blue-300 text-xs">per consultation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* About */}
            {doctor.bio && (
              <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6">
                <h2 className="font-heading text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  About
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>
              </div>
            )}

            {/* Qualifications */}
            <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Qualifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctor.qualifications.map((q) => (
                  <span
                    key={q}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-sm font-medium px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {q}
                  </span>
                ))}
              </div>
            </div>

            {/* Consultation Modes */}
            <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-blue-600" />
                Consultation Modes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {doctor.modes.map((mode) => {
                  const cfg = MODE_CONFIG[mode] ?? {
                    icon: Stethoscope,
                    color: 'text-gray-600',
                    bg: 'bg-gray-50 border-gray-200',
                    label: mode,
                  };
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={mode}
                      className={`flex items-center gap-3 p-4 rounded-xl border ${cfg.bg}`}
                    >
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <Icon className={`w-5 h-5 ${cfg.color}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</p>
                        <p className="text-xs text-gray-500">Available</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Languages */}
            {doctor.languages && doctor.languages.length > 0 && (
              <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6">
                <h2 className="font-heading text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-blue-600" />
                  Languages Spoken
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-sm px-3 py-1">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking Card */}
          <div className="space-y-5">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-6 sticky top-24">
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">Book Appointment</h3>
              <p className="text-gray-500 text-sm mb-5">
                Choose a consultation mode and book your slot.
              </p>

              {/* Fee Summary */}
              <div className="bg-blue-50 rounded-xl p-4 mb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Consultation Fee</span>
                  <span className="font-bold text-gray-900 flex items-center gap-0.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {doctor.consultationFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Starting fee, may vary by mode</p>
              </div>

              {/* Availability */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Available Days
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span
                      key={day}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                        doctor.availability.includes(day)
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Appointment Button */}
              <Button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl h-12 text-base shadow-md"
                onClick={() => navigate({ to: '/booking' })}
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>

              {/* Call Option */}
              <button
                className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-xl h-10 transition-colors"
                onClick={() => window.open('tel:+918008001234')}
              >
                <Phone className="w-4 h-4" />
                Call to Book: +91 8008 001 234
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
              <h3 className="font-heading text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                Doctor Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Experience</span>
                  <span className="text-sm font-bold text-gray-800">{doctor.experience}+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <StarRating rating={doctor.rating} size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Specialty</span>
                  <span className="text-sm font-bold text-gray-800">{doctor.specialty}</span>
                </div>
                {doctor.location && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Location</span>
                    <span className="text-sm font-bold text-gray-800 text-right max-w-[140px]">
                      {doctor.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
