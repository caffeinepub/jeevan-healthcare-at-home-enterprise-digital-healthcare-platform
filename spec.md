# Specification

## Summary
**Goal:** Build consultation execution features for Online and Home Visit consultation types, including a secure video call interface with chat, file upload, and e-Prescription for Online consultations, and live tracking, ETA countdown, and contact doctor functionality for Home Visit consultations.

**Planned changes:**
- Create `OnlineConsultationPage.tsx` at route `/online-consultation` that reads `doctorId`, `bookingId`, `date`, `timeSlot`, and `patientName` from URL search params and displays doctor info from mock data
- Add a mock video call interface with doctor avatar, patient self-view thumbnail, control bar (Mute, Camera, End Call), and status transitions from "Waiting for doctor to join…" to "Connected" after 3 seconds
- Add a collapsible Chat panel toggled from the video control bar, with patient messages (right-aligned, Medical Blue) and mock auto-replies (left-aligned, grey) after 2 seconds
- Add a File Upload feature (PDF, JPG, PNG) accessible from the control bar, listing files with name/size and remove button, with a 5-file maximum limit
- Add an e-Prescription tab with pre-filled read-only fields (Patient Name, Doctor Name, Date), editable Diagnosis, dynamic Medicines list, Additional Notes, and a Generate Prescription button that renders a styled summary card with a Download PDF (print) button
- Create `HomeVisitTrackingPage.tsx` at route `/home-visit-tracking` that reads the same URL search params and displays doctor info
- Add a Live Tracking section with a mock map placeholder, animated doctor marker (moves every 5 seconds), fixed patient home marker, dashed route line, and a status banner cycling through three statuses every 8 seconds
- Add an ETA section with an 18-minute countdown timer (MM:SS format) that replaces itself with a "Doctor has arrived!" success banner when it reaches 0
- Add a Contact Doctor section with a "Call Doctor" button (opens modal with mock phone number) and a "Message Doctor" button (opens inline chat panel with mock auto-reply), plus doctor avatar and "Verified Doctor" badge
- Update `BookingConfirmationPage.tsx` to add a "Start Consultation" button for Online type (enabled only within 15 minutes of appointment) navigating to `/online-consultation`, and a "Track Doctor" button for Home Visit type (always visible) navigating to `/home-visit-tracking`, both placed below AppointmentReminders and above navigation buttons
- Register both new routes in `App.tsx` following the existing TanStack Router pattern

**User-visible outcome:** Patients can execute Online consultations via a mock video call with chat, file sharing, and e-Prescription generation, and track Home Visit doctors via a simulated live map, ETA countdown, and in-app messaging — all accessible from the Booking Confirmation page.
