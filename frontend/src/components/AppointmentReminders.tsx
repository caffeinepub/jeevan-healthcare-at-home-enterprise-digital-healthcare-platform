import React, { useEffect, useState, useRef } from 'react';
import { Bell, Video, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getDoctorById } from '@/lib/mockDoctors';

interface AppointmentRemindersProps {
  appointmentDateTime: number; // Unix timestamp in milliseconds
  doctorId: number;
  consultationType: string;
}

interface ReminderConfig {
  label: string;
  offsetMs: number; // ms before appointment
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

const REMINDERS: ReminderConfig[] = [
  {
    label: '24 hours',
    offsetMs: 24 * 60 * 60 * 1000,
    icon: <Bell className="w-4 h-4" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    label: '3 hours',
    offsetMs: 3 * 60 * 60 * 1000,
    icon: <Clock className="w-4 h-4" />,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    label: '1 hour',
    offsetMs: 1 * 60 * 60 * 1000,
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
];

const JOIN_VIDEO_OFFSET_MS = 15 * 60 * 1000; // 15 minutes

function getReminderStatus(appointmentDateTime: number, offsetMs: number): 'upcoming' | 'active' | 'past' {
  const now = Date.now();
  const reminderTime = appointmentDateTime - offsetMs;
  const appointmentTime = appointmentDateTime;

  if (now < reminderTime) return 'upcoming';
  if (now >= reminderTime && now < appointmentTime) return 'active';
  return 'past';
}

export default function AppointmentReminders({
  appointmentDateTime,
  doctorId,
  consultationType,
}: AppointmentRemindersProps) {
  const doctor = getDoctorById(doctorId);
  const [, forceUpdate] = useState(0);
  const [showJoinButton, setShowJoinButton] = useState(false);
  const firedReminders = useRef<Set<string>>(new Set());
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Schedule reminder toasts via setTimeout
  useEffect(() => {
    if (!appointmentDateTime || isNaN(appointmentDateTime)) return;

    const now = Date.now();
    const doctorName = doctor?.name ?? 'your doctor';

    REMINDERS.forEach((reminder) => {
      const reminderFireTime = appointmentDateTime - reminder.offsetMs;
      const delay = reminderFireTime - now;

      if (delay > 0) {
        const id = setTimeout(() => {
          if (!firedReminders.current.has(reminder.label)) {
            firedReminders.current.add(reminder.label);
            toast.info(`⏰ Reminder: Your appointment with ${doctorName} is in ${reminder.label}!`, {
              duration: 8000,
              description: `Scheduled at ${new Date(appointmentDateTime).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}`,
            });
            forceUpdate((n) => n + 1);
          }
        }, delay);
        timeoutsRef.current.push(id);
      } else if (delay > -reminder.offsetMs) {
        // We're within the reminder window — mark as already active
        firedReminders.current.add(reminder.label);
      }
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [appointmentDateTime, doctor]);

  // Interval to update UI state and check Join Video Call visibility
  useEffect(() => {
    if (!appointmentDateTime || isNaN(appointmentDateTime)) return;

    const tick = () => {
      const now = Date.now();
      const timeUntil = appointmentDateTime - now;
      const shouldShow =
        consultationType === 'Online' &&
        timeUntil <= JOIN_VIDEO_OFFSET_MS &&
        timeUntil > -5 * 60 * 1000; // hide 5 min after start

      setShowJoinButton(shouldShow);
      forceUpdate((n) => n + 1);
    };

    tick(); // run immediately
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [appointmentDateTime, consultationType]);

  if (!appointmentDateTime || isNaN(appointmentDateTime)) {
    return null;
  }

  const now = Date.now();
  const appointmentPast = now > appointmentDateTime;
  const doctorName = doctor?.name ?? 'your doctor';
  const appointmentTimeStr = new Date(appointmentDateTime).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const appointmentDateStr = new Date(appointmentDateTime).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const timeUntilMs = appointmentDateTime - now;
  const hoursUntil = Math.floor(timeUntilMs / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeUntilMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="space-y-3">
      {/* Countdown / Status Banner */}
      {!appointmentPast && (
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium">Time until appointment</p>
            {timeUntilMs > 0 ? (
              <p className="text-sm font-bold text-primary">
                {hoursUntil > 0 ? `${hoursUntil}h ` : ''}
                {minutesUntil}m remaining
              </p>
            ) : (
              <p className="text-sm font-bold text-green-600">Starting now!</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-500">{appointmentDateStr}</p>
            <p className="text-xs font-semibold text-gray-700">{appointmentTimeStr}</p>
          </div>
        </div>
      )}

      {appointmentPast && (
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
          <p className="text-sm text-gray-500">This appointment has already passed.</p>
        </div>
      )}

      {/* Reminder Cards */}
      <div className="space-y-2">
        {REMINDERS.map((reminder) => {
          const status = getReminderStatus(appointmentDateTime, reminder.offsetMs);
          const isActive = status === 'active';
          const isPast = status === 'past';

          return (
            <div
              key={reminder.label}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                isActive
                  ? `${reminder.bgColor} ${reminder.borderColor}`
                  : isPast
                  ? 'bg-gray-50 border-gray-100 opacity-60'
                  : 'bg-white border-gray-100'
              }`}
            >
              {/* Status indicator */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isActive
                    ? `${reminder.bgColor} ${reminder.color}`
                    : isPast
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                {isPast ? <CheckCircle2 className="w-4 h-4" /> : reminder.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold ${
                    isActive ? reminder.color : isPast ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {isActive
                    ? `⏰ Your appointment with ${doctorName} is in ${reminder.label}!`
                    : `Reminder ${reminder.label} before`}
                </p>
                {isActive && (
                  <p className={`text-xs mt-0.5 ${reminder.color} opacity-80`}>
                    At {appointmentTimeStr} · {appointmentDateStr}
                  </p>
                )}
              </div>

              {/* Status badge */}
              <div className="shrink-0">
                {isPast && (
                  <span className="text-xs bg-gray-100 text-gray-400 rounded-full px-2 py-0.5 font-medium">
                    Sent
                  </span>
                )}
                {isActive && (
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 font-medium ${reminder.bgColor} ${reminder.color} border ${reminder.borderColor}`}
                  >
                    Active
                  </span>
                )}
                {status === 'upcoming' && (
                  <span className="text-xs bg-blue-50 text-blue-500 rounded-full px-2 py-0.5 font-medium border border-blue-100">
                    Scheduled
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Join Video Call Button — only for Online, within 15 mins */}
      {showJoinButton && (
        <div className="mt-2">
          <Button
            onClick={() =>
              toast.info('Video call feature coming soon!', {
                description: `Your consultation with ${doctorName} will be available here.`,
                duration: 5000,
              })
            }
            className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all shadow-md"
          >
            <Video className="w-5 h-5 mr-2" />
            Join Video Call
          </Button>
          <p className="text-center text-xs text-gray-500 mt-1.5">
            Video call link is active 15 minutes before your appointment
          </p>
        </div>
      )}

      {/* Info note for Online consultations not yet in 15-min window */}
      {consultationType === 'Online' && !showJoinButton && !appointmentPast && (
        <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <Video className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            The <strong>Join Video Call</strong> button will appear here 15 minutes before your appointment starts.
          </p>
        </div>
      )}
    </div>
  );
}
