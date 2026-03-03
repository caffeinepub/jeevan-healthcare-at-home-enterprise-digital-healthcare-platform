import React, { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft,
  Video,
  Building2,
  Home,
  IndianRupee,
  CheckCircle2,
  CalendarCheck,
  Tag,
  Briefcase,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDoctorById } from '@/lib/mockDoctors';

// ─── Mock Discount Flags ──────────────────────────────────────────────────────
// These would come from user profile / backend in a real app
const MOCK_HAS_CORPORATE_ACCOUNT = true;
const MOCK_HAS_SUBSCRIPTION = true;
const CORPORATE_DISCOUNT_RATE = 0.10; // 10%
const SUBSCRIPTION_DISCOUNT_RATE = 0.15; // 15%
const TRAVEL_FEE = 200;

// ─── Consultation Type Config ─────────────────────────────────────────────────
type ConsultationType = 'online' | 'clinic' | 'home';

interface ConsultationOption {
  id: ConsultationType;
  emoji: string;
  label: string;
  description: string;
  icon: React.ElementType;
  activeColor: string;
  activeBg: string;
  activeBorder: string;
  inactiveBg: string;
  inactiveBorder: string;
  iconColor: string;
}

const CONSULTATION_OPTIONS: ConsultationOption[] = [
  {
    id: 'online',
    emoji: '💻',
    label: 'Online',
    description: 'Video call with doctor',
    icon: Video,
    activeColor: 'text-blue-700',
    activeBg: 'bg-blue-50',
    activeBorder: 'border-blue-600',
    inactiveBg: 'bg-white',
    inactiveBorder: 'border-gray-200',
    iconColor: 'text-blue-600',
  },
  {
    id: 'clinic',
    emoji: '🏥',
    label: 'Clinic Visit',
    description: 'Visit doctor at clinic',
    icon: Building2,
    activeColor: 'text-emerald-700',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-600',
    inactiveBg: 'bg-white',
    inactiveBorder: 'border-gray-200',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'home',
    emoji: '🏠',
    label: 'Home Visit',
    description: 'Doctor visits your home',
    icon: Home,
    activeColor: 'text-purple-700',
    activeBg: 'bg-purple-50',
    activeBorder: 'border-purple-600',
    inactiveBg: 'bg-white',
    inactiveBorder: 'border-gray-200',
    iconColor: 'text-purple-600',
  },
];

// ─── Fee Calculation ──────────────────────────────────────────────────────────
function calculateFees(baseFee: number, type: ConsultationType | null) {
  if (type === null) {
    return {
      baseFee,
      travelFee: 0,
      corporateDiscount: 0,
      subscriptionDiscount: 0,
      total: baseFee,
    };
  }

  const travelFee = type === 'home' ? TRAVEL_FEE : 0;
  let running = baseFee + travelFee;

  const corporateDiscount = MOCK_HAS_CORPORATE_ACCOUNT
    ? Math.round(running * CORPORATE_DISCOUNT_RATE)
    : 0;
  running -= corporateDiscount;

  const subscriptionDiscount = MOCK_HAS_SUBSCRIPTION
    ? Math.round(running * SUBSCRIPTION_DISCOUNT_RATE)
    : 0;
  running -= subscriptionDiscount;

  return {
    baseFee,
    travelFee,
    corporateDiscount,
    subscriptionDiscount,
    total: running,
  };
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ConsultationTypePage() {
  const { doctorId } = useParams({ strict: false }) as { doctorId: string };
  const navigate = useNavigate();

  const doctor = getDoctorById(Number(doctorId));
  const baseFee = doctor?.consultationFee ?? 500;

  const [selected, setSelected] = useState<ConsultationType | null>(null);

  const fees = calculateFees(baseFee, selected);

  const handleContinue = () => {
    if (!selected) return;
    navigate({
      to: `/book-slot/${doctorId}`,
      search: { type: selected, fee: fees.total },
    } as never);
  };

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
              <CalendarCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Choose Consultation Type</h1>
              {doctor && (
                <p className="text-blue-200 text-sm mt-0.5">
                  with {doctor.name} · {doctor.specialty}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-24">
        {/* Consultation Type Cards */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-md p-6 mb-5">
          <h2 className="font-heading text-base font-bold text-gray-800 mb-4">
            Select how you'd like to consult
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CONSULTATION_OPTIONS.map((option) => {
              const isActive = selected === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelected(option.id)}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? `${option.activeBg} ${option.activeBorder} shadow-sm`
                      : `${option.inactiveBg} ${option.inactiveBorder} hover:border-gray-300 hover:shadow-sm`
                  }`}
                >
                  {/* Active check */}
                  {isActive && (
                    <span className="absolute top-2.5 right-2.5">
                      <CheckCircle2 className={`w-4 h-4 ${option.activeColor}`} />
                    </span>
                  )}

                  {/* Emoji + Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                      isActive ? 'bg-white shadow-sm' : 'bg-gray-50'
                    }`}
                  >
                    {option.emoji}
                  </div>

                  <div>
                    <p
                      className={`font-heading font-bold text-sm ${
                        isActive ? option.activeColor : 'text-gray-800'
                      }`}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                  </div>

                  {/* Home Visit badge */}
                  {option.id === 'home' && (
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                      +₹{TRAVEL_FEE} travel fee
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-md p-6 mb-5">
          <h2 className="font-heading text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-blue-600" />
            Fee Breakdown
          </h2>

          {selected === null ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <IndianRupee className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-gray-500 text-sm">Select a consultation type to see the fee breakdown</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Base Fee */}
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Base Consultation Fee</span>
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-0.5">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {fees.baseFee.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Travel Fee (Home Visit only) */}
              {fees.travelFee > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-purple-500" />
                    Travel Fee (Home Visit)
                  </span>
                  <span className="text-sm font-semibold text-purple-700 flex items-center gap-0.5">
                    +<IndianRupee className="w-3.5 h-3.5" />
                    {fees.travelFee.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Corporate Discount */}
              {MOCK_HAS_CORPORATE_ACCOUNT && fees.corporateDiscount > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    Corporate Discount (10%)
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 flex items-center gap-0.5">
                    −<IndianRupee className="w-3.5 h-3.5" />
                    {fees.corporateDiscount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Subscription Discount */}
              {MOCK_HAS_SUBSCRIPTION && fees.subscriptionDiscount > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    Subscription Discount (15%)
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 flex items-center gap-0.5">
                    −<IndianRupee className="w-3.5 h-3.5" />
                    {fees.subscriptionDiscount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between pt-3 mt-1">
                <span className="font-heading font-bold text-gray-900">Total Payable</span>
                <span className="font-heading font-bold text-xl text-blue-700 flex items-center gap-0.5">
                  <IndianRupee className="w-5 h-5" />
                  {fees.total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Savings summary */}
              {(fees.corporateDiscount > 0 || fees.subscriptionDiscount > 0) && (
                <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="text-sm text-emerald-700 font-medium">
                    You save ₹{(fees.corporateDiscount + fees.subscriptionDiscount).toLocaleString('en-IN')} on this consultation!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Discount Badges */}
        {(MOCK_HAS_CORPORATE_ACCOUNT || MOCK_HAS_SUBSCRIPTION) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {MOCK_HAS_CORPORATE_ACCOUNT && (
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Briefcase className="w-3.5 h-3.5" />
                Corporate Account — 10% off
              </div>
            )}
            {MOCK_HAS_SUBSCRIPTION && (
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5" />
                Subscription Active — 15% off
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-10">
        <div className="max-w-2xl mx-auto">
          <Button
            className={`w-full h-13 text-base font-bold rounded-xl shadow-md transition-all ${
              selected
                ? 'bg-blue-700 hover:bg-blue-800 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selected}
            onClick={handleContinue}
          >
            <CalendarCheck className="w-5 h-5 mr-2" />
            {selected
              ? `Continue — ₹${fees.total.toLocaleString('en-IN')}`
              : 'Select a Consultation Type to Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
