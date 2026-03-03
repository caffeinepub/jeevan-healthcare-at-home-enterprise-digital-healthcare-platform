# Specification

## Summary
**Goal:** Update the Doctor Listing Screen to display full doctor card details and add real-time sorting controls.

**Planned changes:**
- Update each doctor card on `DoctorListingPage.tsx` to display: photo (or avatar placeholder), full name, qualification, specialty, years of experience, star rating (numeric + icons), starting consultation fee, available consultation modes (Online / Clinic / Home Visit) as badge icons, and a "Book Now" button in the Medical Blue theme.
- Ensure card layout is responsive and consistent across mobile, tablet, and desktop viewports.
- Add a sorting control bar above the doctor card list with four options: "Highest Rated", "Lowest Fee", "Most Experienced", and "Available Today".
- Active sort option is visually highlighted using the Medical Blue theme.
- Sorting and filtering update the card list in real time without a page reload; "Available Today" filters by the current day of the week from mock availability data.
- All doctor data sourced exclusively from `frontend/src/lib/mockDoctors.ts`.

**User-visible outcome:** Users browsing the Doctor Listing Screen see rich doctor cards with all key details and can instantly sort/filter the list by rating, fee, experience, or today's availability.
