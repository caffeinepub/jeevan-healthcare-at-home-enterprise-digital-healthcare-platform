import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  FileText,
  Pill,
  FlaskConical,
  CalendarPlus,
  Home,
  Stethoscope,
  ClipboardList,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDoctorById } from '@/lib/mockDoctors';

interface ActionCard {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export default function PostConsultationPage() {
  const navigate = useNavigate();

  const search = useSearch({ strict: false }) as {
    doctorId?: string;
    bookingId?: string;
    consultationType?: string;
    date?: string;
    timeSlot?: string;
    patientName?: string;
  };

  const doctorId = search?.doctorId ?? '';
  const bookingId = search?.bookingId ?? '';
  const consultationType = search?.consultationType ?? '';
  const date = search?.date ?? '';
  const timeSlot = search?.timeSlot ?? '';
  const patientName = search?.patientName ?? '';

  const doctor = getDoctorById(Number(doctorId));

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const handleDownloadPrescription = () => {
    window.print();
  };

  const handleOrderMedicines = () => {
    navigate({ to: '/tests' });
  };

  const handleBookLabTests = () => {
    navigate({ to: '/tests' });
  };

  const handleScheduleFollowUp = () => {
    if (doctorId) {
      navigate({ to: '/consultation-type/$doctorId', params: { doctorId } });
    } else {
      navigate({ to: '/doctor-consultation' });
    }
  };

  const handleRateAndReview = () => {
    navigate({
      to: '/rating-review',
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

  const actionCards: ActionCard[] = [
    {
      icon: <FileText className="w-7 h-7" />,
      emoji: '📄',
      title: 'Download Prescription',
      description: 'Get your e-prescription issued during the consultation',
      onClick: handleDownloadPrescription,
      colorClass: 'text-primary',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-100 hover:border-primary',
    },
    {
      icon: <Pill className="w-7 h-7" />,
      emoji: '💊',
      title: 'Order Medicines',
      description: 'Order prescribed medicines for home delivery',
      onClick: handleOrderMedicines,
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-100 hover:border-emerald-500',
    },
    {
      icon: <FlaskConical className="w-7 h-7" />,
      emoji: '🧪',
      title: 'Book Lab Tests',
      description: 'Schedule diagnostic tests recommended by your doctor',
      onClick: handleBookLabTests,
      colorClass: 'text-violet-600',
      bgClass: 'bg-violet-50',
      borderClass: 'border-violet-100 hover:border-violet-500',
    },
    {
      icon: <CalendarPlus className="w-7 h-7" />,
      emoji: '📅',
      title: 'Schedule Follow-up',
      description: 'Book a follow-up appointment with the same doctor',
      onClick: handleScheduleFollowUp,
      colorClass: 'text-orange-600',
      bgClass: 'bg-orange-50',
      borderClass: 'border-orange-100 hover:border-orange-500',
    },
    {
      icon: <Star className="w-7 h-7" />,
      emoji: '⭐',
      title: 'Rate & Review',
      description: 'Share your feedback and rate your doctor',
      onClick: handleRateAndReview,
      colorClass: 'text-amber-500',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-100 hover:border-amber-500',
    },
  ];

  return (
    <>
      {/* Print-only prescription section */}
      <div className="print-only hidden">
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: '0 auto', padding: '32px' }}>
          {/* Header */}
          <div style={{ borderBottom: '3px solid #1d4ed8', paddingBottom: '16px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1d4ed8', margin: 0 }}>
              Jeevan HealthCare
            </h1>
            <p style={{ color: '#6b7280', margin: '4px 0 0' }}>E-Prescription</p>
          </div>

          {/* Doctor & Patient Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#374151' }}>Prescribing Doctor</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                {doctor?.name ?? 'Doctor'}
              </p>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>{doctor?.specialty ?? ''}</p>
              {doctor?.qualifications && (
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>{doctor.qualifications.join(', ')}</p>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#374151' }}>Patient</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                {patientName || 'Patient'}
              </p>
              {formattedDate && (
                <p style={{ fontSize: '13px', color: '#6b7280' }}>Date: {formattedDate}</p>
              )}
              {timeSlot && (
                <p style={{ fontSize: '13px', color: '#6b7280' }}>Time: {timeSlot}</p>
              )}
            </div>
          </div>

          {/* Booking ID */}
          {bookingId && (
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', color: '#1d4ed8', margin: 0 }}>
                <strong>Booking ID:</strong> {bookingId} &nbsp;|&nbsp;
                <strong>Consultation Type:</strong> {consultationType || 'Consultation'}
              </p>
            </div>
          )}

          {/* Diagnosis */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '12px' }}>
              Diagnosis
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
              [Diagnosis details as discussed during consultation]
            </p>
          </div>

          {/* Medicines */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '12px' }}>
              Prescribed Medicines
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: '#374151' }}>Medicine</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: '#374151' }}>Dosage</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: '#374151' }}>Duration</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: '#374151' }}>Instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 12px', color: '#111827' }}>[Medicine 1]</td>
                  <td style={{ padding: '8px 12px', color: '#6b7280' }}>1 tablet</td>
                  <td style={{ padding: '8px 12px', color: '#6b7280' }}>7 days</td>
                  <td style={{ padding: '8px 12px', color: '#6b7280' }}>After meals</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 12px', color: '#111827' }}>[Medicine 2]</td>
                  <td style={{ padding: '8px 12px', color: '#6b7280' }}>1 tablet</td>
                  <td style={{ padding: '8px 12px', color: '#6b7280' }}>5 days</td>
                  <td style={{ padding: '8px 12px', color: '#6b7280' }}>Before meals</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Advice */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '12px' }}>
              Advice & Follow-up
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
              [Follow-up instructions and advice as discussed during consultation]
            </p>
          </div>

          {/* Footer */}
          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Jeevan HealthCare at Home</p>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>+91 9700104108 | info@jeevanhealthcare.com</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ borderTop: '1px solid #374151', paddingTop: '4px', marginTop: '32px' }}>
                <p style={{ fontSize: '12px', color: '#374151' }}>Doctor's Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen content (hidden during print) */}
      <div className="no-print min-h-screen bg-gray-50">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-primary to-blue-700 text-white pt-10 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30">
                <Stethoscope className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="font-heading text-3xl font-bold mb-2">Post-Consultation</h1>
            <p className="text-blue-100 text-sm">
              Your consultation is complete. Here's what you can do next.
            </p>

            {/* Doctor & Booking Info */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {doctor && (
                <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2">
                  <Stethoscope className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-white text-sm font-medium">{doctor.name}</span>
                </div>
              )}
              {bookingId && (
                <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2">
                  <ClipboardList className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-white text-sm font-medium">{bookingId}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-10 space-y-5">

          {/* Action Cards Grid — 2 columns, Rate & Review spans naturally */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {actionCards.map((card) => (
              <button
                key={card.title}
                onClick={card.onClick}
                className={`group bg-white rounded-2xl border-2 ${card.borderClass} shadow-soft p-4 sm:p-5 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/30`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${card.bgClass} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                  <span className={card.colorClass}>{card.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-sm font-bold text-gray-800 mb-1 leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {card.description}
                </p>

                {/* Arrow indicator */}
                <div className={`flex items-center gap-1 mt-3 ${card.colorClass} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span className="text-xs font-semibold">Go</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>

          {/* Consultation Summary Card */}
          {(doctor || patientName || formattedDate) && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-heading text-sm font-semibold text-gray-800">
                  Consultation Summary
                </h2>
              </div>
              <div className="px-5 py-4 space-y-3">
                {doctor && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Doctor</span>
                    <span className="text-sm font-semibold text-gray-800">{doctor.name}</span>
                  </div>
                )}
                {patientName && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Patient</span>
                    <span className="text-sm font-semibold text-gray-800">{patientName}</span>
                  </div>
                )}
                {consultationType && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Type</span>
                    <span className="text-sm font-semibold text-gray-800">{consultationType}</span>
                  </div>
                )}
                {formattedDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Date</span>
                    <span className="text-sm font-semibold text-gray-800">{formattedDate}</span>
                  </div>
                )}
                {timeSlot && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Time</span>
                    <span className="text-sm font-semibold text-gray-800">{timeSlot}</span>
                  </div>
                )}
                {bookingId && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Booking ID</span>
                    <span className="text-sm font-bold text-primary tracking-wide">{bookingId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Go to Home Button */}
          <div className="pt-1">
            <Button
              onClick={() => navigate({ to: '/' })}
              className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
