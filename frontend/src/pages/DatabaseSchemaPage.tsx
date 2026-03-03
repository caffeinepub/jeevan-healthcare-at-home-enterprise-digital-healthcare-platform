import React from 'react';

export default function DatabaseSchemaPage() {
  return (
    <div className="min-h-screen bg-jeevan-soft-grey py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-heading font-bold text-jeevan-primary mb-2">
            Database Schema
          </h1>
          <p className="text-muted-foreground text-base">
            Core data tables powering the Jeevan HealthCare platform
          </p>
          <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-jeevan-primary" />
        </div>

        {/* Schema Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ── Users ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-primary px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Users
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Authentication &amp; identity</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">user_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">UUID / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">name</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">email</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(150)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">phone</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">role</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">is_active</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">principal_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">insurance_details</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">updated_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Doctors ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-primary px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Doctors
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Physician profiles &amp; credentials</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">doctor_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">user_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">specialization</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">qualifications</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">experience</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT (years)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">consultation_fee</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">availability</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">profile_photo</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT (URL)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">certifications</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">rating</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">total_consultations</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">status</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Specialties ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-primary px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Specialties
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Medical specialty categories</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">specialty_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">name</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">slug</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">description</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">icon_url</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT (URL)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">category</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(50)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">is_active</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">display_order</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Doctor_Schedules ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-teal px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Doctor_Schedules
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Availability &amp; time slots</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">schedule_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">doctor_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">day_of_week</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">start_time</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIME</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">end_time</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIME</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">slot_duration_mins</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">consultation_type</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">max_patients</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">is_active</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">effective_from</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">DATE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">effective_until</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">DATE</span>
              </div>
            </div>
          </div>

          {/* ── Appointments ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-teal px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Appointments
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Booking &amp; consultation records</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">appointment_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">doctor_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">patient_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">customer_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">scheduled_datetime</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">status</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">consultation_type</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">fee</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">notes</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Payments ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-teal px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Payments
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Transaction &amp; billing records</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">payment_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">appointment_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">customer_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">amount</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">currency</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(10)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">payment_method</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">payment_status</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">transaction_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">gst_amount</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">discount_amount</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">payment_date</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Reviews ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-primary px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Reviews
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Patient ratings &amp; feedback</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">review_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">appointment_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">patient_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">doctor_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">rating</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT (1–5)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">review_text</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">would_recommend</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">is_verified</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">submitted_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">review_window_hrs</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT</span>
              </div>
            </div>
          </div>

          {/* ── Medical_Records ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-primary px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Medical_Records
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Clinical notes &amp; prescriptions</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">record_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">appointment_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">doctor_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">patient_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">soap_notes</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">prescription_file</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT (URL)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">diagnostic_requests</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">followup_date</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">blood_group</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(5)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">chronic_conditions</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">updated_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Corporate_Accounts ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-teal px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Corporate_Accounts
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">B2B &amp; enterprise clients</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">account_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">company_name</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(150)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">admin_user_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">contact_email</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(150)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">contact_phone</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">gst_number</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">discount_percent</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">employee_count</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">INT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">contract_start</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">DATE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">contract_end</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">DATE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">status</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── Subscriptions ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
            <div className="bg-jeevan-teal px-5 py-3">
              <h2 className="text-white font-heading font-semibold text-lg tracking-wide">
                Subscriptions
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">Plans &amp; recurring memberships</p>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">subscription_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / PK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">customer_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BIGINT / FK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">plan_name</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">plan_type</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">price</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">billing_cycle</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">discount_percent</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">FLOAT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">start_date</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">DATE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">end_date</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">DATE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">auto_renew</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">status</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">ENUM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">stripe_subscription_id</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-jeevan-text">created_at</span>
                <span className="text-muted-foreground font-mono text-xs bg-jeevan-light-blue px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-xs text-muted-foreground">
          <span className="inline-block bg-white border border-border rounded-full px-4 py-1.5 shadow-xs">
            10 core tables &nbsp;·&nbsp; Jeevan HealthCare Platform Schema
          </span>
        </div>

      </div>
    </div>
  );
}
