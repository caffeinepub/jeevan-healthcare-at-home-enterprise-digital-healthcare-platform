import React, { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  IndianRupee,
  Home,
  ClipboardList,
  Share2,
  Download,
  Bell,
  Video,
  MapPin,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getDoctorById } from '@/lib/mockDoctors';
import AppointmentReminders from '@/components/AppointmentReminders';

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

/**
 * Parse a time slot string like "09:30 AM" into { hours, minutes }
 */
function parseTimeSlot(timeSlot: string): { hours: number; minutes: number } | null {
  const match = timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

/**
 * Combine a date string (YYYY-MM-DD) and time slot string into a Unix timestamp (ms)
 */
function buildAppointmentTimestamp(date: string, timeSlot: string): number | null {
  if (!date || !timeSlot) return null;
  const parsed = parseTimeSlot(timeSlot);
  if (!parsed) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  d.setHours(parsed.hours, parsed.minutes, 0, 0);
  return d.getTime();
}

export default function BookingConfirmationPage() {
  const navigate = useNavigate();

  const search = useSearch({ strict: false }) as {
    bookingId?: string;
    doctorId?: string;
    consultationType?: string;
    totalFee?: string | number;
    date?: string;
    timeSlot?: string;
    patientName?: string;
  };

  const bookingId = search?.bookingId ?? '';
  const doctorId = search?.doctorId ?? '';
  const consultationType = search?.consultationType ?? '';
  const totalFee = Number(search?.totalFee ?? 0);
  const date = search?.date ?? '';
  const timeSlot = search?.timeSlot ?? '';
  const patientName = search?.patientName ?? '';

  const doctor = getDoctorById(Number(doctorId));

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  // Build appointment timestamp for reminders
  const appointmentTimestamp = buildAppointmentTimestamp(date, timeSlot);

  // Check if within 15 minutes of appointment (for Online type)
  const [isWithin15Min, setIsWithin15Min] = useState(false);

  useEffect(() => {
    if (!appointmentTimestamp || consultationType !== 'Online') return;

    const check = () => {
      const now = Date.now();
      const diff = appointmentTimestamp - now;
      setIsWithin15Min(diff <= 15 * 60 * 1000 && diff > -5 * 60 * 1000);
    };

    check();
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, [appointmentTimestamp, consultationType]);

  const handleStartConsultation = () => {
    navigate({
      to: '/online-consultation',
      search: {
        doctorId,
        bookingId,
        date,
        timeSlot,
        patientName,
      },
    });
  };

  const handleTrackDoctor = () => {
    navigate({
      to: '/home-visit-tracking',
      search: {
        doctorId,
        bookingId,
        date,
        timeSlot,
        patientName,
      },
    });
  };

  const handlePostConsultationActions = () => {
    navigate({
      to: '/post-consultation',
      search: {
        doctorId,
        bookingId,
        consultationType,
        date,
        timeSlot,
        patientName,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Banner */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white pt-12 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          {/* Animated checkmark */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30">
              <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>

          <h1 className="font-heading text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100 text-base">
            Your appointment has been successfully booked.
          </p>

          {/* Booking ID badge */}
          {bookingId && (
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-2xl px-5 py-3 mt-5">
              <ClipboardList className="w-4 h-4 text-white shrink-0" />
              <div className="text-left">
                <p className="text-green-100 text-xs font-medium">Booking ID</p>
                <p className="text-white text-lg font-bold tracking-wider">{bookingId}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-10 pb-10 space-y-4">

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading text-base font-semibold text-gray-800">
              Appointment Details
            </h2>
          </div>

          <div className="px-5 py-4 space-y-4">
            {/* Doctor */}
            {doctor && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Doctor</p>
                  <p className="text-sm font-semibold text-gray-800">{doctor.name}</p>
                  <p className="text-xs text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
            )}

            {/* Patient */}
            {patientName && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Patient</p>
                  <p className="text-sm font-semibold text-gray-800">{patientName}</p>
                </div>
              </div>
            )}

            {/* Consultation Type */}
            {consultationType && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Consultation Type</p>
                  <p className="text-sm font-semibold text-gray-800">{consultationType}</p>
                </div>
              </div>
            )}

            {/* Date */}
            {formattedDate && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Appointment Date</p>
                  <p className="text-sm font-semibold text-gray-800">{formattedDate}</p>
                </div>
              </div>
            )}

            {/* Time Slot */}
            {timeSlot && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Time Slot</p>
                  <p className="text-sm font-semibold text-gray-800">{timeSlot}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Total Fee */}
            {totalFee > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Amount Paid</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(totalFee)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Paid</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Reminders Section */}
        {appointmentTimestamp !== null && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-primary" />
                </div>
                <h2 className="font-heading text-base font-semibold text-gray-800">
                  Appointment Reminders
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-9">
                You'll be notified at 24 hours, 3 hours, and 1 hour before your appointment.
              </p>
            </div>

            <div className="px-5 py-4">
              <AppointmentReminders
                appointmentDateTime={appointmentTimestamp}
                doctorId={Number(doctorId)}
                consultationType={consultationType}
              />
            </div>
          </div>
        )}

        {/* Consultation Entry-Point Buttons */}
        {consultationType === 'Online' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="w-3.5 h-3.5 text-primary" />
              </div>
              <h2 className="font-heading text-base font-semibold text-gray-800">
                Online Consultation
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {isWithin15Min
                ? 'Your appointment is starting soon. You can now join the consultation.'
                : 'The "Start Consultation" button will be enabled 15 minutes before your appointment time.'}
            </p>
            <Button
              onClick={handleStartConsultation}
              disabled={!isWithin15Min}
              className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Video className="w-5 h-5 mr-2" />
              {isWithin15Min ? 'Start Consultation' : 'Start Consultation (Available 15 min before)'}
            </Button>
          </div>
        )}

        {consultationType === 'Home Visit' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <h2 className="font-heading text-base font-semibold text-gray-800">
                Home Visit Tracking
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Track your doctor's live location and estimated arrival time.
            </p>
            <Button
              onClick={handleTrackDoctor}
              className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Track Doctor
            </Button>
          </div>
        )}

        {/* Post-Consultation Actions */}
        <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-soft p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="font-heading text-base font-semibold text-gray-800">
              Post-Consultation Actions
            </h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            After your consultation, download your prescription, order medicines, book lab tests, or schedule a follow-up.
          </p>
          <Button
            onClick={handlePostConsultationActions}
            className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
          >
            <ClipboardCheck className="w-5 h-5 mr-2" />
            Post-Consultation Actions
          </Button>
        </div>

        {/* What's Next Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="font-heading text-sm font-semibold text-blue-800 mb-3">What's Next?</h3>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-sm text-blue-700">
                You'll receive a confirmation SMS on your registered mobile number.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-sm text-blue-700">
                The doctor will be notified and will confirm the appointment shortly.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-sm text-blue-700">
                Keep your Booking ID <strong>{bookingId}</strong> handy for reference.
              </p>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={() => navigate({ to: '/' })}
            className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Button>

          <Button
            onClick={() => navigate({ to: '/orders' })}
            variant="outline"
            className="w-full h-12 text-base font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary/5 transition-all"
          >
            <ClipboardList className="w-5 h-5 mr-2" />
            View My Bookings
          </Button>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 h-11 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-medium"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Appointment Confirmed',
                    text: `My appointment is confirmed! Booking ID: ${bookingId}`,
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              className="flex-1 h-11 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-medium"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Save / Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
