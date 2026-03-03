import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface SlotLockTimerProps {
  lockedSlot: string | null;
  remainingSeconds: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function SlotLockTimer({ lockedSlot, remainingSeconds }: SlotLockTimerProps) {
  if (!lockedSlot || remainingSeconds <= 0) return null;

  const isUrgent = remainingSeconds <= 60;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors ${
        isUrgent
          ? 'bg-red-50 border-red-200 text-red-700'
          : 'bg-blue-50 border-blue-200 text-blue-700'
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
          isUrgent ? 'bg-red-100' : 'bg-blue-100'
        }`}
      >
        {isUrgent ? (
          <AlertCircle className="w-5 h-5" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
          {isUrgent ? 'Expiring soon!' : 'Slot held for you'}
        </p>
        <p className="text-sm font-medium truncate">
          <span className="font-bold">{lockedSlot}</span>
          {' '}reserved for{' '}
          <span
            className={`font-bold tabular-nums text-base ${
              isUrgent ? 'text-red-600' : 'text-primary'
            }`}
          >
            {formatTime(remainingSeconds)}
          </span>
        </p>
      </div>

      <div
        className={`text-xs font-medium px-2 py-1 rounded-lg ${
          isUrgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
        }`}
      >
        Auto-release
      </div>
    </div>
  );
}
