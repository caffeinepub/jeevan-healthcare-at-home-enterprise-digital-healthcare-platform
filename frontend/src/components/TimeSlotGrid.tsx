import React from 'react';
import { Lock } from 'lucide-react';

interface TimeSlotGridProps {
  selectedDate: Date | null;
  selectedSlot: string | null;
  lockedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

// Generate 30-min slots from 09:00 to 19:00
function generateSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour < 19; hour++) {
    for (const min of [0, 30]) {
      const h = hour.toString().padStart(2, '0');
      const m = min.toString().padStart(2, '0');
      const suffix = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      slots.push(`${displayHour.toString().padStart(2, '0')}:${m} ${suffix}`);
    }
  }
  return slots;
}

const ALL_SLOTS = generateSlots();

// Mock unavailable slots — deterministic based on slot index
const UNAVAILABLE_INDICES = new Set([1, 3, 5, 8, 11, 14, 16]);

function getUnavailableSlots(date: Date | null): Set<string> {
  if (!date) return new Set();
  // Use date's day-of-month to vary unavailability slightly
  const day = date.getDate();
  const unavailable = new Set<string>();
  ALL_SLOTS.forEach((slot, idx) => {
    if (UNAVAILABLE_INDICES.has((idx + day) % ALL_SLOTS.length)) {
      unavailable.add(slot);
    }
  });
  return unavailable;
}

export default function TimeSlotGrid({
  selectedDate,
  selectedSlot,
  lockedSlot,
  onSelectSlot,
}: TimeSlotGridProps) {
  const unavailableSlots = getUnavailableSlots(selectedDate);

  if (!selectedDate) {
    return (
      <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-6 text-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🗓️</span>
        </div>
        <p className="text-gray-500 text-sm font-medium">
          Please select a date to view available time slots
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-5">
      <h3 className="font-heading font-bold text-gray-800 text-base mb-1">
        Available Time Slots
      </h3>
      <p className="text-xs text-gray-400 mb-4">30-minute sessions · 09:00 AM – 07:00 PM</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {ALL_SLOTS.map((slot) => {
          const isUnavailable = unavailableSlots.has(slot);
          const isLocked = lockedSlot === slot;
          const isSelected = selectedSlot === slot;

          if (isUnavailable) {
            return (
              <div
                key={slot}
                className="flex items-center justify-center h-10 rounded-xl border border-gray-100 bg-gray-50 text-gray-300 text-xs font-medium cursor-not-allowed select-none"
                title="Slot unavailable"
              >
                {slot}
              </div>
            );
          }

          if (isLocked) {
            return (
              <button
                key={slot}
                onClick={() => onSelectSlot(slot)}
                className="flex items-center justify-center gap-1 h-10 rounded-xl border-2 border-primary bg-primary text-white text-xs font-bold shadow-soft transition-all duration-150 scale-105"
                title="Slot held for you"
              >
                <Lock className="w-3 h-3 shrink-0" />
                <span>{slot}</span>
              </button>
            );
          }

          if (isSelected) {
            return (
              <button
                key={slot}
                onClick={() => onSelectSlot(slot)}
                className="flex items-center justify-center h-10 rounded-xl border-2 border-primary bg-primary text-white text-xs font-bold shadow-soft transition-all duration-150"
              >
                {slot}
              </button>
            );
          }

          return (
            <button
              key={slot}
              onClick={() => onSelectSlot(slot)}
              className="flex items-center justify-center h-10 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-xs font-medium hover:bg-primary hover:text-white hover:border-primary hover:shadow-soft transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200" />
          <span className="text-xs text-gray-500">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-primary border border-primary" />
          <span className="text-xs text-gray-500">Selected / Held</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-gray-50 border border-gray-100" />
          <span className="text-xs text-gray-500">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
