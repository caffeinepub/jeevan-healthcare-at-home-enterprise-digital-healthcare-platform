# Specification

## Summary
**Goal:** Update the `DatabaseSchemaPage.tsx` to display all 10 database table cards with enhanced content including descriptions, PK/FK labels, and field listings.

**Planned changes:**
- Update `DatabaseSchemaPage.tsx` to render 10 hardcoded table cards: Users, Doctors, Specialties, Doctor_Schedules, Appointments, Payments, Reviews, Medical_Records, Corporate_Accounts, and Subscriptions
- Each card displays the table name as a bold heading, a one-line description of the table's purpose, and a field list in "Column Name – Data Type" format
- Primary Key fields are clearly labelled with a "PK" badge on each card
- Foreign Key fields are clearly labelled with a "FK" badge indicating the referenced table
- All content is hardcoded JSX with no hooks, no `.map()`, no dynamic rendering, and no external imports beyond React
- Styling follows the existing Medical Blue theme using Tailwind utility classes

**User-visible outcome:** The Database Schema page shows all 10 tables as clean, informative cards with descriptions, field types, and clear PK/FK indicators, making the schema easy to read and understand at a glance.
