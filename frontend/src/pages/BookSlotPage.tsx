import React, { useState } from 'react';
import { useParams, useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowLeft, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDoctorById } from '@/lib/mockDoctors';
import SlotCalendar from '@/components/SlotCalendar';
import TimeSlotGrid from '@/components/TimeSlotGrid';
import SlotLockTimer from '@/components/SlotLockTimer';
import { useSlotLock } from '@/hooks/useSlotLock';

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BookSlotPage() {
  const { doctorId } = useParams({ strict: false }) as { doctorId: string };
  const navigate = useNavigate();

  // Read query params safely
  const search = useSearch({ strict: false }) as {
    type?: string;
    fee?: string | number;
  };
  const consultationType = search?.type ?? 'online';
  const totalFee = Number(search?.fee ?? 0);

  const doctor = getDoctorById(Number(doctorId));

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { lockedSlot, remainingSeconds, lockSlot, clearLock } = useSlotLock();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    clearLock();
  };

  const handleSlotSelect = (slot: string) => {
    lockSlot(slot);
  };

  const canConfirm =
    selectedDate !== null &&
    lockedSlot !== null &&
    remainingSeconds > 0;

  const handleConfirm = () => {
    if (!canConfirm || !selectedDate || !lockedSlot) return;

    const dateStr = selectedDate.toISOString().split('T')[0];

    navigate({
      to: '/patient-details',
      search: {
        doctorId,
        consultationType,
        fee: totalFee,
        date: dateStr,
        slot: lockedSlot,
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
              <CalendarCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Select Date & Time</h1>
              {doctor && (
                <p className="text-blue-200 text-sm mt-0.5">
                  with {doctor.name} · {doctor.specialty}
                </p>
              )}
            </div>
          </div>

          {/* Booking summary chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="capitalize">{consultationType}</span>
            </span>
            {totalFee > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                ₹{totalFee}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-32 space-y-4">
        {/* Step indicator */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-soft px-5 py-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedDate
                    ? 'bg-primary text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {selectedDate ? <CheckCircle2 className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span
                className={`font-medium ${
                  selectedDate ? 'text-primary' : 'text-gray-600'
                }`}
              >
                Choose Date
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  lockedSlot && remainingSeconds > 0
                    ? 'bg-primary text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {lockedSlot && remainingSeconds > 0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  '2'
                )}
              </div>
              <span
                className={`font-medium ${
                  lockedSlot && remainingSeconds > 0
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}
              >
                Pick Time Slot
              </span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <SlotCalendar selectedDate={selectedDate} onChange={handleDateChange} />

        {/* Selected date display */}
        {selectedDate && (
          <div className="flex items-center gap-2 px-1">
            <CalendarCheck className="w-4 h-4 text-primary shrink-0" />
            <p className="text-sm font-medium text-gray-700">
              {formatDateDisplay(selectedDate)}
            </p>
          </div>
        )}

        {/* Slot Lock Timer */}
        <SlotLockTimer lockedSlot={lockedSlot} remainingSeconds={remainingSeconds} />

        {/* Time Slots */}
        <TimeSlotGrid
          selectedDate={selectedDate}
          selectedSlot={lockedSlot}
          lockedSlot={lockedSlot}
          onSelectSlot={handleSlotSelect}
        />

        {/* Info note */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <span className="text-amber-500 text-base shrink-0 mt-0.5">⚡</span>
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            Slots are held for <strong>5 minutes</strong> after selection. Complete your booking before the timer expires to secure your appointment.
          </p>
        </div>
      </div>

      {/* Sticky Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-card px-4 py-4 z-30">
        <div className="max-w-2xl mx-auto">
          {canConfirm && selectedDate && lockedSlot && (
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">
                {selectedDate.toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className="font-bold text-primary">{lockedSlot}</span>
            </div>
          )}
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {canConfirm ? 'Confirm Slot & Continue →' : 'Select a date and time slot'}
          </Button>
        </div>
      </div>
    </div>
  );
}
