import React from 'react';
import { Star, Clock, IndianRupee, ArrowRight, Video, Building2, Home, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MockDoctor, isTodayAvailable } from '@/lib/mockDoctors';

// ─── Avatar ───────────────────────────────────────────────────────────────────

function DoctorAvatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-100 shrink-0"
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
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-200 flex items-center justify-center shrink-0">
      <span className="text-blue-700 font-bold text-xl font-heading">{initials}</span>
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
      <span className="ml-1 text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
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
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color}`}
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
  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 overflow-hidden group">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-300" />

      <div className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <DoctorAvatar name={doctor.name} photo={doctor.profilePhoto} />

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Name + Available Today badge */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-base leading-tight">
                  {doctor.name}
                </h3>
                <p className="text-xs text-blue-600 font-medium mt-0.5">
                  {doctor.qualifications.join(' • ')}
                </p>
              </div>
              {isTodayAvailable(doctor.availability) && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available Today
                </span>
              )}
            </div>

            {/* Specialty */}
            <p className="text-sm font-medium text-gray-600 mb-2">{doctor.specialty}</p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <StarRating rating={doctor.rating} />
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {doctor.experience} Yrs Exp.
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                {doctor.consultationFee.toLocaleString('en-IN')}
                <span className="font-normal text-gray-500">onwards</span>
              </span>
            </div>

            {/* Consultation Modes */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {doctor.modes.map((m) => (
                <ConsultationModeBadge key={m} mode={m} />
              ))}
            </div>

            {/* Book Now Button */}
            <Button
              size="sm"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl px-5 h-9 text-sm shadow-sm"
              onClick={() => onBookNow(doctor)}
            >
              Book Now
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
