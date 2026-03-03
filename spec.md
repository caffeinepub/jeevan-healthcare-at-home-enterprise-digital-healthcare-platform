# Specification

## Summary
**Goal:** Remove the standalone `/symptom-checker` route from the router configuration to eliminate the missing-route console warning, while keeping the Symptom Checker functioning as an embedded component inside the Health tab.

**Planned changes:**
- Remove the standalone `/symptom-checker` route entry from the root router/App.tsx configuration
- Remove any unused imports of a SymptomChecker route component from the router file
- Remove all orphaned navigation references (e.g., `useNavigate('/symptom-checker')`, `<Link to='/symptom-checker'>`) across the frontend codebase
- Ensure the Symptom Checker remains embedded and functional within the Health tab's Digital Health section

**User-visible outcome:** The app starts with a clean console (no missing-route warnings), the bottom tab navigator remains unchanged (Home, Bookings, Health, Subscriptions, Profile), and the Symptom Checker continues to work inside the Health tab as before.
