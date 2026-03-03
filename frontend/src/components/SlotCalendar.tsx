import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlotCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export default function SlotCalendar({ selectedDate, onChange }: SlotCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Disable prev month if we're already at current month
  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  // Build calendar grid cells
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(viewYear, viewMonth, d));
  }

  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-soft p-5">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={handlePrevMonth}
          disabled={isCurrentMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h3 className="font-heading font-bold text-gray-800 text-base">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>

        <button
          onClick={handleNextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} />;
          }

          const isPast = isBeforeToday(date);
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

          return (
            <button
              key={date.toISOString()}
              onClick={() => !isPast && onChange(date)}
              disabled={isPast}
              className={`
                relative mx-auto w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-150
                ${isPast
                  ? 'text-gray-300 cursor-not-allowed'
                  : isSelected
                  ? 'bg-primary text-white shadow-soft font-bold scale-105'
                  : isToday
                  ? 'bg-blue-50 text-blue-700 border border-blue-300 font-bold'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer'
                }
              `}
              aria-label={date.toLocaleDateString()}
              aria-pressed={isSelected}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
