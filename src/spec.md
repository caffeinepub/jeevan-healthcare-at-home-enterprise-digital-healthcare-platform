# Specification

## Summary
**Goal:** Replace all existing Jeevan green/teal brand styling with Medical Blue across the entire frontend (public pages and all dashboards), in both light and dark modes.

**Planned changes:**
- Update global theme CSS variables so tokens previously mapped to green/teal (e.g., `--jeevan-teal`, `--secondary`, `--accent`, and related chart/status colors) now resolve to Medical Blue.
- Ensure Tailwind-driven UI (including existing utility classes and hover/focus states) visually renders Medical Blue site-wide without modifying read-only UI component sources.
- Verify no remaining noticeable green/teal accents remain in buttons, badges, icons, links, highlights, charts, or status elements across admin/doctor/phlebotomist sections and public pages, while keeping text contrast readable.

**User-visible outcome:** The application displays a consistent Medical Blue theme everywhere (light and dark modes), with green/teal accents fully replaced across all pages and dashboards.
