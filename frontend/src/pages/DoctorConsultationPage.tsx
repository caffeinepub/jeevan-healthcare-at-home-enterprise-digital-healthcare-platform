import React, { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Stethoscope,
  Search,
  ArrowRight,
  Phone,
  Video,
  Home,
  Building2,
  Star,
  Clock,
  IndianRupee,
  Award,
  TrendingUp,
  CalendarCheck,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SpecialtyAccordion from '@/components/SpecialtyAccordion';
import DoctorCard from '@/components/DoctorCard';
import { MOCK_DOCTORS, MockDoctor, isTodayAvailable } from '@/lib/mockDoctors';

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = 'highest-rated' | 'lowest-fee' | 'most-experienced' | 'available-today';

// ─── Sort Button ──────────────────────────────────────────────────────────────

const SORT_OPTIONS: { key: SortOption; label: string; icon: React.ElementType }[] = [
  { key: 'highest-rated', label: 'Highest Rated', icon: ThumbsUp },
  { key: 'lowest-fee', label: 'Lowest Fee', icon: IndianRupee },
  { key: 'most-experienced', label: 'Most Experienced', icon: Award },
  { key: 'available-today', label: 'Available Today', icon: CalendarCheck },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DoctorConsultationPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<{ name: string; category: string } | null>(null);
  const [activeSort, setActiveSort] = useState<SortOption | null>(null);

  const handleSpecialistSelect = (specialist: string, category: string) => {
    setSelectedSpecialist({ name: specialist, category });
  };

  const handleBookConsultation = () => {
    navigate({ to: '/booking' });
  };

  const handleBookDoctor = (doctor: MockDoctor) => {
    navigate({ to: '/doctor-profile/$doctorId', params: { doctorId: String(doctor.id) } });
  };

  // ── Filtered + sorted doctors ──────────────────────────────────────────────
  const displayedDoctors = useMemo(() => {
    let list = [...MOCK_DOCTORS];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.qualifications.some((qual) => qual.toLowerCase().includes(q))
      );
    }

    // Filter/sort by active sort option
    if (activeSort === 'available-today') {
      list = list.filter((d) => isTodayAvailable(d.availability));
    } else if (activeSort === 'highest-rated') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'lowest-fee') {
      list = [...list].sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (activeSort === 'most-experienced') {
      list = [...list].sort((a, b) => b.experience - a.experience);
    }

    return list;
  }, [searchQuery, activeSort]);

  const consultationModes = [
    {
      icon: Video,
      title: 'Online Consultation',
      description: 'Video call with specialist from home',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Building2,
      title: 'Clinic Visit',
      description: 'Visit the specialist at their clinic',
      badge: 'In-Person',
      badgeColor: 'bg-gray-100 text-gray-600',
    },
    {
      icon: Home,
      title: 'Home Visit',
      description: 'Doctor visits you at your home',
      badge: 'Convenient',
      badgeColor: 'bg-blue-50 text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 rounded-full p-2.5">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">
              Specialist Booking
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Doctor Consultation
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mb-8">
            Connect with India's top specialists. Choose your specialty, select a consultation mode,
            and book your appointment in minutes.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by doctor, specialty, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 h-12 rounded-xl bg-white text-gray-800 border-0 shadow-lg text-base focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Consultation Modes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {consultationModes.map((mode) => (
            <div
              key={mode.title}
              className="bg-white rounded-xl shadow-md border border-blue-50 p-5 flex items-start gap-4 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer"
              onClick={handleBookConsultation}
            >
              <div className="bg-blue-50 rounded-lg p-2.5 flex-shrink-0">
                <mode.icon className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{mode.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mode.badgeColor}`}>
                    {mode.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{mode.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Specialty Accordion + Doctor Listing */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specialty Accordion */}
            <div>
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-1">
                  Browse by Specialty
                </h2>
                <p className="text-gray-500 text-sm">
                  Select a category to explore specialists. Click on a specialist to view their listing.
                </p>
              </div>
              <SpecialtyAccordion onSpecialistSelect={handleSpecialistSelect} />
            </div>

            {/* Doctor Listing */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-0.5">
                    Our Doctors
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {displayedDoctors.length} specialist{displayedDoctors.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                {/* Sort Controls */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {SORT_OPTIONS.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveSort(activeSort === key ? null : key)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                        activeSort === key
                          ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Cards */}
              {displayedDoctors.length > 0 ? (
                <div className="space-y-4">
                  {displayedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} onBookNow={handleBookDoctor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-blue-50">
                  <Stethoscope className="w-10 h-10 text-blue-200 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No doctors found matching your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-blue-600 text-sm font-medium hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Emergency Panel */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="font-heading font-bold text-red-800 text-sm">Emergency?</h3>
              </div>
              <p className="text-red-700 text-xs mb-3">
                For medical emergencies, call our 24/7 helpline immediately.
              </p>
              <a
                href="tel:+918008001234"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 8008 001 234
              </a>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-xl border border-blue-50 shadow-sm p-5">
              <h3 className="font-heading font-bold text-gray-900 text-sm mb-4">
                Why Choose Jeevan?
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: Award, text: 'Verified & Experienced Doctors' },
                  { icon: CalendarCheck, text: 'Easy Online Booking' },
                  { icon: Clock, text: '24/7 Availability' },
                  { icon: Star, text: 'Rated 4.8/5 by Patients' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Book CTA */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-5 text-white">
              <h3 className="font-heading font-bold text-base mb-2">Need Help Choosing?</h3>
              <p className="text-blue-200 text-xs mb-4">
                Our health advisors can help you find the right specialist for your needs.
              </p>
              <Button
                size="sm"
                className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-lg"
                onClick={handleBookConsultation}
              >
                Talk to an Advisor
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
