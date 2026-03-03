# Specification

## Summary
**Goal:** Add a static Database Schema Viewer page that displays the 10 core database tables as individual cards in a responsive grid.

**Planned changes:**
- Create `frontend/src/pages/DatabaseSchemaPage.tsx` as a fully static, self-contained React functional component
- Display 10 table cards: Users, Doctors, Specialties, Doctor_Schedules, Appointments, Payments, Reviews, Medical_Records, Corporate_Accounts, and Subscriptions
- Each card shows the table name as a heading and lists all field names with their data types as hardcoded static text rows
- Style cards using Medical Blue theme Tailwind utility classes consistent with the rest of the application
- No hooks, state, props, routing, API calls, animations, dynamic rendering, or external library imports beyond React

**User-visible outcome:** Users can view a dedicated Database Schema page showing all 10 core tables with their fields and data types laid out in a readable, responsive grid of cards.
