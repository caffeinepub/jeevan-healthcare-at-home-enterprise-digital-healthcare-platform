# Specification

## Summary
**Goal:** Add a "Choose Consultation Type" screen to the booking flow, with fee calculation logic and navigation wiring.

**Planned changes:**
- Create a new screen at `/consultation-type/:doctorId` with three selectable cards: 💻 Online, 🏥 Clinic Visit, and 🏠 Home Visit (only one selectable at a time, Medical Blue theme).
- Each card shows the consultation type label, emoji icon, and a brief description.
- Implement fee breakdown below the cards: Base Fee, Travel Fee (₹200, Home Visit only), Corporate Discount (10% off, mock flag), Subscription Discount (15% off, mock flag), and Total Payable — updated in real time when the type changes.
- Add a "Continue" button at the bottom, disabled until a type is selected; on click, navigate to `/book-slot/:doctorId` passing selected consultation type and total fee as route/query parameters.
- Update the "Book Appointment" button on the Doctor Profile screen (`PublicDoctorProfilePage.tsx`) to navigate to `/consultation-type/:doctorId`.
- Register the `/consultation-type/:doctorId` route in the root router (`App.tsx`).

**User-visible outcome:** Users can click "Book Appointment" on a doctor's profile, choose a consultation type (Online, Clinic, or Home Visit), see an auto-calculated fee breakdown with applicable discounts, and proceed to slot selection.
