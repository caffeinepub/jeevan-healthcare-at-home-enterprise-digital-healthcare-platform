import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface Specialist {
  name: string;
}

interface SpecialtyCategory {
  emoji: string;
  title: string;
  specialists: Specialist[];
}

const SPECIALTY_CATEGORIES: SpecialtyCategory[] = [
  {
    emoji: '🩺',
    title: 'Primary Care',
    specialists: [
      { name: 'General Physician' },
      { name: 'Pediatrician' },
      { name: 'Gynecologist' },
      { name: 'Geriatrician' },
      { name: 'Family Medicine' },
    ],
  },
  {
    emoji: '❤️',
    title: 'Cardiac & Vascular',
    specialists: [
      { name: 'Cardiologist' },
      { name: 'Interventional Cardiologist' },
      { name: 'Cardiothoracic Surgeon' },
      { name: 'Vascular Surgeon' },
    ],
  },
  {
    emoji: '🧠',
    title: 'Neuro Sciences',
    specialists: [
      { name: 'Neurologist' },
      { name: 'Neurosurgeon' },
      { name: 'Neuropsychiatrist' },
      { name: 'Neuro Physiotherapist' },
    ],
  },
  {
    emoji: '🫁',
    title: 'Respiratory',
    specialists: [
      { name: 'Pulmonologist' },
      { name: 'TB & Chest Specialist' },
      { name: 'Critical Care Specialist' },
    ],
  },
  {
    emoji: '🦴',
    title: 'Orthopedic & Rehab',
    specialists: [
      { name: 'Orthopedic Specialist' },
      { name: 'Joint Replacement Surgeon' },
      { name: 'Spine Specialist' },
      { name: 'Sports Medicine' },
      { name: 'Physiotherapist' },
    ],
  },
  {
    emoji: '🧴',
    title: 'Skin & Aesthetics',
    specialists: [
      { name: 'Dermatologist' },
      { name: 'Cosmetologist' },
      { name: 'Trichologist' },
      { name: 'Aesthetic Specialist' },
    ],
  },
  {
    emoji: '🩸',
    title: 'Endocrine & Metabolic',
    specialists: [
      { name: 'Diabetologist' },
      { name: 'Endocrinologist' },
      { name: 'Obesity Specialist' },
    ],
  },
  {
    emoji: '🩻',
    title: 'Digestive & Liver',
    specialists: [
      { name: 'Gastroenterologist' },
      { name: 'Hepatologist' },
      { name: 'Endoscopy Specialist' },
    ],
  },
  {
    emoji: '🩺',
    title: 'Kidney & Urinary',
    specialists: [
      { name: 'Nephrologist' },
      { name: 'Urologist' },
      { name: 'Andrologist' },
    ],
  },
  {
    emoji: '👁',
    title: 'Eye Care',
    specialists: [
      { name: 'Ophthalmologist' },
      { name: 'Retina Specialist' },
      { name: 'Cataract Surgeon' },
    ],
  },
  {
    emoji: '👂',
    title: 'ENT & Hearing',
    specialists: [
      { name: 'ENT Specialist' },
      { name: 'Audiologist' },
      { name: 'Rhinologist' },
    ],
  },
  {
    emoji: '🧠',
    title: 'Mental Health',
    specialists: [
      { name: 'Psychiatrist' },
      { name: 'Clinical Psychologist' },
      { name: 'Counsellor' },
    ],
  },
  {
    emoji: '🧬',
    title: 'Cancer Care',
    specialists: [
      { name: 'Medical Oncologist' },
      { name: 'Surgical Oncologist' },
      { name: 'Radiation Oncologist' },
    ],
  },
  {
    emoji: '👶',
    title: 'Pediatric Super Specialists',
    specialists: [
      { name: 'Pediatric Cardiologist' },
      { name: 'Pediatric Neurologist' },
      { name: 'Pediatric Pulmonologist' },
      { name: 'Pediatric Endocrinologist' },
    ],
  },
  {
    emoji: '🤰',
    title: 'Women & Fertility',
    specialists: [
      { name: 'Fertility Specialist' },
      { name: 'Reproductive Endocrinologist' },
      { name: 'High-Risk Pregnancy Specialist' },
    ],
  },
  {
    emoji: '💊',
    title: 'Pain & Emergency',
    specialists: [
      { name: 'Pain Management Specialist' },
      { name: 'Palliative Care Specialist' },
      { name: 'Emergency Medicine' },
    ],
  },
];

interface SpecialtyAccordionProps {
  onSpecialistSelect?: (specialist: string, category: string) => void;
}

export default function SpecialtyAccordion({ onSpecialistSelect }: SpecialtyAccordionProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleToggle = (title: string) => {
    setOpenCategory(prev => (prev === title ? null : title));
  };

  const handleSpecialistClick = (specialistName: string, categoryTitle: string) => {
    // Call optional callback (for local state updates in parent)
    if (onSpecialistSelect) {
      onSpecialistSelect(specialistName, categoryTitle);
    }
    // Navigate to the Doctor Listing page for this specialty
    navigate({
      to: '/doctor-listing/$specialty',
      params: { specialty: encodeURIComponent(specialistName) },
    });
  };

  return (
    <div className="w-full space-y-2">
      {SPECIALTY_CATEGORIES.map((category) => {
        const isOpen = openCategory === category.title;
        return (
          <div
            key={`${category.emoji}-${category.title}`}
            className="rounded-xl border border-blue-100 bg-white shadow-sm overflow-hidden transition-all"
          >
            {/* Category Header */}
            <button
              onClick={() => handleToggle(category.title)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
                isOpen
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-800 hover:bg-blue-50'
              }`}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none" role="img" aria-hidden="true">
                  {category.emoji}
                </span>
                <span className="font-semibold text-base font-heading">
                  {category.title}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    isOpen
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {category.specialists.length} specialists
                </span>
              </div>
              <div className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            {/* Specialist List */}
            {isOpen && (
              <div className="border-t border-blue-100 bg-blue-50/40 px-4 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {category.specialists.map((specialist) => (
                    <button
                      key={specialist.name}
                      onClick={() => handleSpecialistClick(specialist.name, category.title)}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-white border border-blue-100 text-left text-sm font-medium text-gray-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all group shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-white shrink-0 transition-colors" />
                      <span>{specialist.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
