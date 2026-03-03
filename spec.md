# Specification

## Summary
**Goal:** Update the `DatabaseSchemaPage.tsx` component to display all 10 database tables as detailed, fully hardcoded cards with PK/FK labels.

**Planned changes:**
- Rewrite `DatabaseSchemaPage.tsx` with 10 hardcoded table cards (Users, Doctors, Specialties, Doctor_Schedules, Appointments, Payments, Reviews, Medical_Records, Corporate_Accounts, Subscriptions)
- Each card shows: bold table name heading, one-line plain-English description, field list in "Column Name – Data Type" format, a "PK" badge on the primary key field, and "FK → ReferencedTable" badges on all foreign key fields
- Layout uses a responsive grid with Medical Blue Tailwind styling consistent with the rest of the app
- Component uses no hooks, no `.map()`, no external libraries beyond React and Tailwind, no backend calls, no routing logic, and no animations — all content is pure hardcoded JSX

**User-visible outcome:** Users viewing the Database Schema page will see all 10 tables displayed as clean, readable cards clearly indicating each field's data type along with prominent PK and FK relationship labels.
