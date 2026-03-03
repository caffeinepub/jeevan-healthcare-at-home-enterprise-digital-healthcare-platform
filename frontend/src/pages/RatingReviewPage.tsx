import React, { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Star, Home, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getDoctorById } from '@/lib/mockDoctors';

export default function RatingReviewPage() {
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

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [recommendation, setRecommendation] = useState<'Yes' | 'No' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const MAX_CHARS = 500;

  const canSubmit = rating > 0 && reviewText.trim().length > 0 && !submitted;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary to-blue-700 text-white pt-10 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30">
              <Star className="w-8 h-8 text-white fill-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-heading text-3xl font-bold mb-2">Rate Your Consultation</h1>
          <p className="text-blue-100 text-sm">
            Your feedback helps us improve care quality
          </p>

          {/* Doctor & Booking Info */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {doctor && (
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2">
                <Star className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="text-white text-sm font-medium">{doctor.name}</span>
              </div>
            )}
            {bookingId && (
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2">
                <span className="text-white text-sm font-medium">#{bookingId}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-10 space-y-4">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 font-medium">
            Reviews can be submitted 2 hours after your consultation
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-5 flex flex-col items-center text-center gap-3">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-base font-bold text-green-800">Thank you! Your review has been submitted.</p>
              <p className="text-sm text-green-600 mt-1">Your feedback helps other patients make informed decisions.</p>
            </div>
            <Button
              onClick={() => navigate({ to: '/' })}
              className="mt-2 h-11 px-8 text-sm font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </div>
        )}

        {/* Review Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading text-base font-semibold text-gray-800">Share Your Experience</h2>
            {doctor && (
              <p className="text-sm text-gray-500 mt-0.5">
                {doctor.name} · {doctor.specialty}
              </p>
            )}
          </div>

          <div className="px-5 py-5 space-y-6">

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rate Doctor
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      disabled={submitted}
                      onClick={() => !submitted && setRating(star)}
                      onMouseEnter={() => !submitted && setHoverRating(star)}
                      onMouseLeave={() => !submitted && setHoverRating(0)}
                      className={`transition-transform duration-100 ${!submitted ? 'hover:scale-110 active:scale-95 cursor-pointer' : 'cursor-default'} focus:outline-none`}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-9 h-9 transition-colors duration-150 ${
                          isActive
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300 fill-gray-100'
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  );
                })}
                {(hoverRating || rating) > 0 && (
                  <span className="ml-2 text-sm font-semibold text-primary">
                    {ratingLabels[hoverRating || rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Write Your Review
              </label>
              <Textarea
                placeholder="Share your experience with the doctor…"
                value={reviewText}
                disabled={submitted}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_CHARS) {
                    setReviewText(e.target.value);
                  }
                }}
                rows={4}
                className="resize-none rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <div className="flex justify-end mt-1.5">
                <span className={`text-xs font-medium ${reviewText.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-400'}`}>
                  {reviewText.length} / {MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Recommendation Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Would you recommend this doctor?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => !submitted && setRecommendation(recommendation === 'Yes' ? null : 'Yes')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-150 focus:outline-none ${
                    recommendation === 'Yes'
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary'
                  } ${submitted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
                >
                  <span>👍</span>
                  <span>Yes</span>
                </button>
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => !submitted && setRecommendation(recommendation === 'No' ? null : 'No')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-150 focus:outline-none ${
                    recommendation === 'No'
                      ? 'bg-red-500 border-red-500 text-white shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                  } ${submitted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
                >
                  <span>👎</span>
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-5 pb-5">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Star className="w-5 h-5 mr-2 fill-white" />
              Submit Review
            </Button>
            {!submitted && rating === 0 && (
              <p className="text-xs text-gray-400 text-center mt-2">
                Please select a star rating to continue
              </p>
            )}
            {!submitted && rating > 0 && reviewText.trim().length === 0 && (
              <p className="text-xs text-gray-400 text-center mt-2">
                Please write a review to continue
              </p>
            )}
          </div>
        </div>

        {/* Consultation Details */}
        {(patientName || consultationType || date || timeSlot) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-heading text-sm font-semibold text-gray-800">Consultation Details</h2>
            </div>
            <div className="px-5 py-4 space-y-3">
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
              {date && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Date</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
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

        {/* Go to Home (always visible at bottom) */}
        {!submitted && (
          <div className="pt-1">
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/' })}
              className="w-full h-11 text-sm font-semibold rounded-xl border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-all"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
