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
            10 core data tables powering the Jeevan HealthCare at Home platform
          </p>
          <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-jeevan-primary" />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-8 justify-center flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-block bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold">PK</span>
            <span>Primary Key</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-block bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-bold">FK</span>
            <span>Foreign Key</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono text-xs border border-gray-200">Type</span>
            <span>Data Type</span>
          </div>
        </div>

        {/* Schema Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ── 1. Users ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Users</h2>
              <p className="text-blue-100 text-xs mt-1">Stores all platform user accounts, roles, and identity information.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              {/* _id – PK */}
              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">full_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">phone</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">email</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">password_hash</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">role</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">abha_id</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">date_of_birth</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Date</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">gender</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">address</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Object</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">otp_verified</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">updated_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 2. Doctors ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Doctors</h2>
              <p className="text-blue-100 text-xs mt-1">Physician profiles including credentials, fees, and availability modes.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">user_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">specialty_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Specialties</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">full_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">qualification</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">registration_number</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">years_of_experience</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">consultation_fee</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">available_modes</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Array</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">bio</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">photo_url</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">star_rating</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_verified</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">languages</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Array</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 3. Specialties ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Specialties</h2>
              <p className="text-blue-100 text-xs mt-1">Lookup table of medical specialty categories available on the platform.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">category_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">emoji_icon</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">specialist_types</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Array</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">sort_order</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 4. Doctor_Schedules ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Doctor_Schedules</h2>
              <p className="text-blue-100 text-xs mt-1">Defines weekly availability windows and time slots for each doctor.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">doctor_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">day_of_week</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">start_time</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">end_time</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">slot_duration_minutes</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">consultation_mode</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_available</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 5. Appointments ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Appointments</h2>
              <p className="text-blue-100 text-xs mt-1">Records all patient-doctor appointment bookings and their current status.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">booking_id</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">user_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">doctor_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">consultation_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">appointment_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Date</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">time_slot</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">patient_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">patient_age</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">patient_gender</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">symptoms</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">address</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">patient_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">slot_locked_until</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 6. Payments ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Payments</h2>
              <p className="text-blue-100 text-xs mt-1">Tracks all payment transactions linked to appointments and users.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">appointment_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Appointments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">user_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">consultation_fee</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">travel_fee</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">gst_amount</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">discount_amount</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">total_amount</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">payment_method</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">payment_status</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">razorpay_order_id</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">razorpay_payment_id</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 7. Reviews ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Reviews</h2>
              <p className="text-blue-100 text-xs mt-1">Patient ratings and written feedback submitted after consultations.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">appointment_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Appointments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">user_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">doctor_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">star_rating</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">review_text</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">would_recommend</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_published</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">submitted_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 8. Medical_Records ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-jeevan-primary px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Medical_Records</h2>
              <p className="text-blue-100 text-xs mt-1">Stores prescriptions, diagnostic reports, and SOAP notes per consultation.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">user_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">appointment_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Appointments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">doctor_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Doctors</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">record_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">diagnosis</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">medicines</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Array</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">additional_notes</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">file_urls</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Array</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 9. Corporate_Accounts ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Corporate_Accounts</h2>
              <p className="text-blue-100 text-xs mt-1">B2B corporate client accounts with contract terms and employee health plans.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">company_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">hr_contact_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">hr_email</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">hr_phone</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">city</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">discount_percent</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">employee_count</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">contract_start</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Date</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">contract_end</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Date</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

          {/* ── 10. Subscriptions ── */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-700 px-5 py-4">
              <h2 className="text-white font-heading font-bold text-lg">Subscriptions</h2>
              <p className="text-blue-100 text-xs mt-1">Patient subscription plans granting discounts and benefits over a period.</p>
            </div>
            <div className="px-5 py-4 divide-y divide-gray-100 flex-1">

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">_id</span>
                  <span className="shrink-0 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">PK</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">user_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Users</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">plan_name</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">String</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">plan_type</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Enum</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">discount_percent</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Number</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">start_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Date</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">end_date</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Date</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">is_active</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">Boolean</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-gray-700 text-sm">payment_id</span>
                  <span className="shrink-0 bg-purple-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">FK</span>
                  <span className="shrink-0 text-purple-700 text-xs font-medium">→ Payments</span>
                </div>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded shrink-0">ObjectId</span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-medium text-gray-700 text-sm">created_at</span>
                <span className="text-gray-500 font-mono text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">DateTime</span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          All tables use MongoDB with Mongoose ODM. <span className="font-semibold">_id</span> is auto-generated by MongoDB as the primary key.
        </p>

      </div>
    </div>
  );
}
