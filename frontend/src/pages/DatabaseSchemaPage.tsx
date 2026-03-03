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

        {/* Legend */}
        <div className="flex items-center gap-4 mb-8 justify-center flex-wrap">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="inline-block bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-semibold">PK</span>
            <span>Primary Key</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="inline-block bg-amber-500 text-white px-2 py-0.5 rounded text-xs font-semibold">FK</span>
            <span>Foreign Key</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono text-xs border border-gray-200">TYPE</span>
            <span>Data Type</span>
          </div>
        </div>

        {/* Schema Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ── 1. Users ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Users</h2>
              <p className="text-blue-100 text-xs mt-1">Stores all platform user accounts, roles, and identity information.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* user_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">user_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">UUID</span>
              </div>
              {/* name */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              {/* email */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">email</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(150)</span>
              </div>
              {/* phone */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">phone</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              {/* role */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">role</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* is_active */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              {/* principal_id */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">principal_id</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* insurance_details */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">insurance_details</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              {/* updated_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">updated_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 2. Doctors ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Doctors</h2>
              <p className="text-blue-100 text-xs mt-1">Physician profiles including credentials, fees, and availability status.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* doctor_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">doctor_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* user_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">user_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* specialization */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">specialization</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              {/* qualifications */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">qualifications</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              {/* experience */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">experience</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">INT (years)</span>
              </div>
              {/* consultation_fee */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">consultation_fee</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* availability */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">availability</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* profile_photo */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">profile_photo</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT (URL)</span>
              </div>
              {/* certifications */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">certifications</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              {/* rating */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">rating</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* total_consultations */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">total_consultations</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BIGINT</span>
              </div>
              {/* status */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 3. Specialties ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Specialties</h2>
              <p className="text-blue-100 text-xs mt-1">Lookup table of medical specialty categories available on the platform.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* specialty_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">specialty_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* name */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              {/* slug */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">slug</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              {/* description */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">description</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* icon_url */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">icon_url</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT (URL)</span>
              </div>
              {/* category */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">category</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(50)</span>
              </div>
              {/* is_active */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              {/* display_order */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">display_order</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">INT</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 4. Doctor_Schedules ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Doctor_Schedules</h2>
              <p className="text-blue-100 text-xs mt-1">Defines weekly availability windows and time slots for each doctor.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* schedule_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">schedule_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* doctor_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">doctor_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* day_of_week */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">day_of_week</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* start_time */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">start_time</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIME</span>
              </div>
              {/* end_time */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">end_time</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIME</span>
              </div>
              {/* slot_duration_mins */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">slot_duration_mins</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">INT</span>
              </div>
              {/* consultation_type */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">consultation_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* max_patients */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">max_patients</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">INT</span>
              </div>
              {/* is_active */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              {/* effective_from */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">effective_from</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DATE</span>
              </div>
              {/* effective_until */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">effective_until</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DATE</span>
              </div>
            </div>
          </div>

          {/* ── 5. Appointments ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Appointments</h2>
              <p className="text-blue-100 text-xs mt-1">Records all patient-doctor consultation bookings and their current status.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* appointment_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">appointment_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* doctor_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">doctor_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* patient_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">patient_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Patients</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* customer_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">customer_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Customers</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* scheduled_datetime */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">scheduled_datetime</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              {/* status */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* consultation_type */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">consultation_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* fee */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">fee</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* notes */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">notes</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 6. Payments ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Payments</h2>
              <p className="text-blue-100 text-xs mt-1">Tracks all financial transactions linked to appointments and services.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* payment_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">payment_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* appointment_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">appointment_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Appointments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* user_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">user_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* amount */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">amount</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* currency */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">currency</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(10)</span>
              </div>
              {/* payment_method */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">payment_method</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* payment_status */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">payment_status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* transaction_id */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">transaction_id</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              {/* payment_date */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">payment_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              {/* gst_amount */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">gst_amount</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* discount_amount */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">discount_amount</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
            </div>
          </div>

          {/* ── 7. Reviews ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Reviews</h2>
              <p className="text-blue-100 text-xs mt-1">Patient ratings and written feedback submitted after consultations.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* review_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">review_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* appointment_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">appointment_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Appointments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* doctor_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">doctor_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* patient_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">patient_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Patients</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* rating */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">rating</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TINYINT (1–5)</span>
              </div>
              {/* review_text */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">review_text</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* would_recommend */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">would_recommend</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              {/* is_verified */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">is_verified</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 8. Medical_Records ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Medical_Records</h2>
              <p className="text-blue-100 text-xs mt-1">Stores SOAP notes, prescriptions, and diagnostic requests per consultation.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* note_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">note_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* appointment_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">appointment_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Appointments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* doctor_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">doctor_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* patient_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">patient_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Patients</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* soap_notes */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">soap_notes</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT</span>
              </div>
              {/* prescription_file */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">prescription_file</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT (URL)</span>
              </div>
              {/* followup_date */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">followup_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              {/* diagnostic_requests */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">diagnostic_requests</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TEXT[]</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
              {/* updated_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">updated_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 9. Corporate_Accounts ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-blue-800 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Corporate_Accounts</h2>
              <p className="text-blue-100 text-xs mt-1">Manages B2B corporate clients with bulk health plan subscriptions.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* corporate_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">corporate_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* admin_user_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">admin_user_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* company_name */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">company_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(200)</span>
              </div>
              {/* gst_number */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">gst_number</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              {/* contact_email */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">contact_email</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(150)</span>
              </div>
              {/* contact_phone */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">contact_phone</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(20)</span>
              </div>
              {/* employee_count */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">employee_count</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">INT</span>
              </div>
              {/* discount_percentage */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">discount_percentage</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* contract_start */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">contract_start</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DATE</span>
              </div>
              {/* contract_end */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">contract_end</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DATE</span>
              </div>
              {/* status */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

          {/* ── 10. Subscriptions ── */}
          <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden flex flex-col">
            <div className="bg-blue-800 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg tracking-wide">Subscriptions</h2>
              <p className="text-blue-100 text-xs mt-1">Tracks individual and corporate health plan subscriptions and renewal cycles.</p>
            </div>
            <div className="px-5 py-4 space-y-2.5 flex-1">
              {/* subscription_id – PK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 truncate">subscription_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* user_id – FK */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">user_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT</span>
              </div>
              {/* corporate_id – FK (nullable) */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 truncate">corporate_id</span>
                  <span className="shrink-0 bg-amber-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FK</span>
                  <span className="shrink-0 text-amber-700 text-xs">→ Corporate_Accounts</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">BIGINT?</span>
              </div>
              {/* plan_name */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">plan_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">VARCHAR(100)</span>
              </div>
              {/* plan_type */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">plan_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* price */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">price</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* billing_cycle */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">billing_cycle</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* start_date */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">start_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DATE</span>
              </div>
              {/* end_date */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">end_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DATE</span>
              </div>
              {/* discount_percentage */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">discount_percentage</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">FLOAT</span>
              </div>
              {/* status */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">ENUM</span>
              </div>
              {/* auto_renew */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">auto_renew</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">BOOLEAN</span>
              </div>
              {/* created_at */}
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-700">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">TIMESTAMP</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          10 tables · Jeevan HealthCare Platform Schema · All fields are hardcoded for reference
        </p>

      </div>
    </div>
  );
}
