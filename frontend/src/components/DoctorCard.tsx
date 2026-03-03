import React from 'react';
import { Star, Clock, IndianRupee, ArrowRight, Video, Building2, Home, Stethoscope, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MockDoctor, isTodayAvailable } from '@/lib/mockDoctors';

// ─── Avatar ───────────────────────────────────────────────────────────────────

function DoctorAvatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-100 shrink-0"
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
    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-200 flex items-center justify-center shrink-0">
      <span className="text-blue-700 font-bold text-2xl font-heading">{initials}</span>
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full
              ? 'fill-amber-400 text-amber-400'
              : i === full && hasHalf
              ? 'fill-amber-200 text-amber-400'
              : 'fill-gray-200 text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-gray-800">{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Mode Badge ───────────────────────────────────────────────────────────────

const MODE_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  Online: { icon: Video, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  Clinic: { icon: Building2, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Home Visit': { icon: Home, color: 'bg-purple-50 text-purple-700 border-purple-200' },
};

function ConsultationModeBadge({ mode }: { mode: string }) {
  const cfg = MODE_CONFIG[mode] ?? { icon: Stethoscope, color: 'bg-gray-50 text-gray-600 border-gray-200' };
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.color}`}
    >
      <Icon className="w-3 h-3" />
      {mode}
    </span>
  );
}

// ─── DoctorCard ───────────────────────────────────────────────────────────────

interface DoctorCardProps {
  doctor: MockDoctor;
  onBookNow: (doctor: MockDoctor) => void;
}

export default function DoctorCard({ doctor, onBookNow }: DoctorCardProps) {
  const availableToday = isTodayAvailable(doctor.availability);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-200 overflow-hidden group flex flex-col">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-300" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header: Avatar + Core Info */}
        <div className="flex gap-4 mb-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <DoctorAvatar name={doctor.name} photo={doctor.profilePhoto} />
            {availableToday && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Available Today" />
            )}
          </div>

          {/* Name, Qualification, Specialty */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-1 mb-0.5">
              <h3 className="font-heading font-bold text-gray-900 text-base leading-tight">
                {doctor.name}
              </h3>
              {availableToday && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available Today
                </span>
              )}
            </div>

            {/* Qualifications */}
            <p className="text-xs text-blue-600 font-semibold mb-1">
              {doctor.qualifications.join(' • ')}
            </p>

            {/* Specialty */}
            <p className="text-sm font-medium text-gray-600 mb-2">{doctor.specialty}</p>

            {/* Location */}
            {doctor.location && (
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="w-3 h-3 shrink-0" />
                {doctor.location}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4" />

        {/* Stats Row: Rating | Experience | Fee */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Rating */}
          <div className="flex flex-col items-center bg-amber-50 rounded-xl py-2.5 px-2">
            <StarRating rating={doctor.rating} />
            <span className="text-xs text-gray-500 mt-1">Rating</span>
          </div>

          {/* Experience */}
          <div className="flex flex-col items-center bg-blue-50 rounded-xl py-2.5 px-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-bold text-gray-800">{doctor.experience}</span>
              <span className="text-xs text-gray-500">yrs</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">Experience</span>
          </div>

          {/* Fee */}
          <div className="flex flex-col items-center bg-green-50 rounded-xl py-2.5 px-2">
            <div className="flex items-center gap-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-green-700" />
              <span className="text-sm font-bold text-gray-800">
                {doctor.consultationFee.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1">Starting Fee</span>
          </div>
        </div>

        {/* Consultation Modes */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Available Modes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {doctor.modes.map((m) => (
              <ConsultationModeBadge key={m} mode={m} />
            ))}
          </div>
        </div>

        {/* Book Now Button — pushed to bottom */}
        <div className="mt-auto">
          <Button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl h-10 text-sm shadow-sm transition-colors"
            onClick={() => onBookNow(doctor)}
          >
            Book Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
