import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  ArrowLeft,
  Search,
  Stethoscope,
  ThumbsUp,
  IndianRupee,
  Award,
  CalendarCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DoctorCard from '@/components/DoctorCard';
import { MOCK_DOCTORS, MockDoctor, isTodayAvailable } from '@/lib/mockDoctors';

type SortOption = 'highest-rated' | 'lowest-fee' | 'most-experienced' | 'available-today';

const SORT_OPTIONS: { key: SortOption; label: string; icon: React.ElementType }[] = [
  { key: 'highest-rated', label: 'Highest Rated', icon: ThumbsUp },
  { key: 'lowest-fee', label: 'Lowest Fee', icon: IndianRupee },
  { key: 'most-experienced', label: 'Most Experienced', icon: Award },
  { key: 'available-today', label: 'Available Today', icon: CalendarCheck },
];

function applySortAndSearch(
  list: MockDoctor[],
  searchQuery: string,
  activeSort: SortOption | null
): MockDoctor[] {
  let result = [...list];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.qualifications.some((qual) => qual.toLowerCase().includes(q))
    );
  }

  if (activeSort === 'available-today') {
    result = result.filter((d) => isTodayAvailable(d.availability));
  } else if (activeSort === 'highest-rated') {
    result = [...result].sort((a, b) => b.rating - a.rating);
  } else if (activeSort === 'lowest-fee') {
    result = [...result].sort((a, b) => a.consultationFee - b.consultationFee);
  } else if (activeSort === 'most-experienced') {
    result = [...result].sort((a, b) => b.experience - a.experience);
  }

  return result;
}

export default function DoctorListingPage() {
  const { specialty } = useParams({ strict: false }) as { specialty: string };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState<SortOption | null>(null);

  // Decode the specialty from URL param
  const decodedSpecialty = decodeURIComponent(specialty || '');

  // Filter doctors by specialty (case-insensitive partial match) — always computed
  const specialtyDoctors = useMemo(() => {
    if (!decodedSpecialty) return MOCK_DOCTORS;
    const q = decodedSpecialty.toLowerCase();
    return MOCK_DOCTORS.filter(
      (d) =>
        d.specialty.toLowerCase().includes(q) ||
        d.specialty.toLowerCase() === q
    );
  }, [decodedSpecialty]);

  // Apply search + sort on specialty-filtered list — always computed
  const filteredSpecialtyDoctors = useMemo(
    () => applySortAndSearch(specialtyDoctors, searchQuery, activeSort),
    [specialtyDoctors, searchQuery, activeSort]
  );

  // Apply search + sort on all doctors (fallback) — always computed
  const filteredAllDoctors = useMemo(
    () => applySortAndSearch(MOCK_DOCTORS, searchQuery, activeSort),
    [searchQuery, activeSort]
  );

  // Determine which list to show — no hooks involved here
  const allDoctorsMode = specialtyDoctors.length === 0;
  const effectiveDoctors = allDoctorsMode ? filteredAllDoctors : filteredSpecialtyDoctors;

  const handleBookNow = (doctor: MockDoctor) => {
    navigate({ to: '/doctor-profile/$doctorId', params: { doctorId: String(doctor.id) } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <button
            onClick={() => navigate({ to: '/doctor-consultation' })}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Doctor Consultation
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 rounded-full p-2.5">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">
              Specialist Listing
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 leading-tight">
            {decodedSpecialty || 'All Doctors'}
          </h1>
          <p className="text-blue-100 text-base max-w-2xl mb-6">
            {allDoctorsMode
              ? 'Browse our network of verified specialists and book your consultation.'
              : `Find the best ${decodedSpecialty} specialists. Compare experience, ratings, and fees to choose the right doctor.`}
          </p>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 h-11 rounded-xl bg-white text-gray-800 border-0 shadow-lg text-sm focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort + Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
              {effectiveDoctors.length} Doctor{effectiveDoctors.length !== 1 ? 's' : ''} Found
            </Badge>
            {allDoctorsMode && decodedSpecialty && (
              <span className="text-sm text-amber-600 font-medium">
                Showing all doctors (no exact match for "{decodedSpecialty}")
              </span>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 mr-1">Sort:</span>
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

        {/* Doctor Cards Grid */}
        {effectiveDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {effectiveDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onBookNow={handleBookNow} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-gray-800 mb-2">No Doctors Found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No doctors available for this specialty at the moment.'}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setActiveSort(null);
              }}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
