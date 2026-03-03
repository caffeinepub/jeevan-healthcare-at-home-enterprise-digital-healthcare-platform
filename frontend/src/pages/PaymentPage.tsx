import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Home,
  ShieldCheck,
  ChevronRight,
  IndianRupee,
  Tag,
  Percent,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getDoctorById } from '@/lib/mockDoctors';

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'pay-at-home';

interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
  note?: string;
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'upi',
    label: 'UPI',
    description: 'Pay via Google Pay, PhonePe, Paytm & more',
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, RuPay accepted',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    description: 'All major banks supported',
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    id: 'wallet',
    label: 'Wallet',
    description: 'Paytm, Amazon Pay, Mobikwik & more',
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    id: 'pay-at-home',
    label: 'Pay at Home',
    description: 'Pay cash when the doctor arrives',
    icon: <Home className="w-5 h-5" />,
    note: 'Cash payment accepted at the time of visit. No advance required.',
  },
];

const TRAVEL_FEE = 200;
const GST_RATE = 0.18;

function generateBookingId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'JHC-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const search = useSearch({ strict: false }) as {
    doctorId?: string;
    consultationType?: string;
    totalFee?: string | number;
    date?: string;
    timeSlot?: string;
    patientName?: string;
    patientAge?: string;
    patientGender?: string;
    patientPhone?: string;
    patientType?: string;
    symptoms?: string;
  };

  const doctorId = search?.doctorId ?? '';
  const consultationType = search?.consultationType ?? '';
  const totalFeeParam = Number(search?.totalFee ?? 0);
  const date = search?.date ?? '';
  const timeSlot = search?.timeSlot ?? '';
  const patientName = search?.patientName ?? '';
  const patientAge = search?.patientAge ?? '';
  const patientGender = search?.patientGender ?? '';
  const patientPhone = search?.patientPhone ?? '';
  const patientType = search?.patientType ?? '';
  const symptoms = search?.symptoms ?? '';

  const isHomeVisit = consultationType === 'Home Visit';

  // Look up doctor to get base consultation fee
  const doctor = getDoctorById(Number(doctorId));
  const consultationFee = doctor?.consultationFee ?? totalFeeParam;

  // Fee breakdown calculation
  const travelFee = isHomeVisit ? TRAVEL_FEE : 0;
  const subtotalBeforeGST = consultationFee + travelFee;
  const gstAmount = Math.round(subtotalBeforeGST * GST_RATE);
  const calculatedTotal = subtotalBeforeGST + gstAmount;

  // Discount = difference between calculated total and what was passed (if any)
  const discount = totalFeeParam > 0 && totalFeeParam < calculatedTotal
    ? calculatedTotal - totalFeeParam
    : 0;

  const finalTotal = discount > 0 ? totalFeeParam : calculatedTotal;

  const handlePayNow = async () => {
    if (!selectedMethod || isProcessing) return;
    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const bookingId = generateBookingId();

    navigate({
      to: '/booking-confirmation',
      search: {
        bookingId,
        doctorId,
        consultationType,
        totalFee: finalTotal,
        date,
        timeSlot,
        patientName,
      },
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
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Payment</h1>
              <p className="text-blue-200 text-sm mt-0.5">Review charges and pay securely</p>
            </div>
          </div>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {consultationType && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {consultationType}
              </span>
            )}
            {doctor && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {doctor.name}
              </span>
            )}
            {patientName && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {patientName}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-40 space-y-4">

        {/* Fee Breakdown Card */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-primary" />
            <h2 className="font-heading text-base font-semibold text-gray-800">Fee Breakdown</h2>
          </div>

          <div className="px-5 py-4 space-y-3">
            {/* Consultation Fee */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-gray-700">Consultation Fee</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {formatCurrency(consultationFee)}
              </span>
            </div>

            {/* Travel Fee — only for Home Visit */}
            {isHomeVisit && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Home className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <span className="text-sm text-gray-700">Travel Fee</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {formatCurrency(travelFee)}
                </span>
              </div>
            )}

            {/* GST */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Percent className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <span className="text-sm text-gray-700">GST (18%)</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {formatCurrency(gstAmount)}
              </span>
            </div>

            {/* Discount — only if applicable */}
            {discount > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <Tag className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-sm text-green-700 font-medium">Discount Applied</span>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  -{formatCurrency(discount)}
                </span>
              </div>
            )}

            <Separator className="my-1" />

            {/* Final Total */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-base font-bold text-gray-900">Final Total</span>
              </div>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>

          {/* Secure payment note */}
          <div className="px-5 py-3 bg-blue-50/60 border-t border-blue-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-blue-700">
              All payments are 100% secure and encrypted
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading text-base font-semibold text-gray-800">
              Select Payment Method
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Choose how you'd like to pay</p>
          </div>

          <div className="p-3 space-y-2">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-100 bg-white hover:border-primary/30 hover:bg-blue-50/40'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {method.icon}
                  </div>

                  {/* Label + description */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold ${
                        isSelected ? 'text-primary' : 'text-gray-800'
                      }`}
                    >
                      {method.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                    {method.note && isSelected && (
                      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2 leading-relaxed">
                        💡 {method.note}
                      </p>
                    )}
                  </div>

                  {/* Radio indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Booking summary */}
        {(patientName || date || timeSlot) && (
          <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-5">
            <h2 className="font-heading text-sm font-semibold text-gray-700 mb-3">
              Appointment Summary
            </h2>
            <div className="space-y-2">
              {doctor && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Doctor</span>
                  <span className="font-medium text-gray-800">{doctor.name}</span>
                </div>
              )}
              {patientName && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Patient</span>
                  <span className="font-medium text-gray-800">{patientName}</span>
                </div>
              )}
              {date && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-800">
                    {new Date(date).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {timeSlot && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-800">{timeSlot}</span>
                </div>
              )}
              {consultationType && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-800">{consultationType}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Pay Now Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-card px-4 py-4 z-30">
        <div className="max-w-2xl mx-auto">
          {selectedMethod && (
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">
                {PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.label}
              </span>
              <span className="font-bold text-primary">{formatCurrency(finalTotal)}</span>
            </div>
          )}
          <Button
            onClick={handlePayNow}
            disabled={!selectedMethod || isProcessing}
            className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Payment...
              </>
            ) : selectedMethod ? (
              <>
                Pay {formatCurrency(finalTotal)} <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              'Select a payment method to continue'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
