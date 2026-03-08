# ScholarFind — Scholarship Finder Web Application

> A modern, responsive scholarship discovery dashboard built entirely with **HTML5, CSS3, and Vanilla JavaScript (ES6)** — zero external dependencies.

[![Live Demo](https://img.shields.io/badge/Live-Demo-2B6CB0?style=for-the-badge&logo=googlechrome&logoColor=white)](https://tvisha03.github.io/scholarship-finder-ui/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-brightgreen?style=flat-square)]()

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Tech Stack](#tech-stack)
- [Feature Details](#feature-details)
- [Responsive Design](#responsive-design)
- [Data Model](#data-model)
- [Browser Compatibility](#browser-compatibility)

---

## Overview

ScholarFind is a client-side scholarship discovery platform that enables users to browse, search, filter, and explore **250 dynamically generated scholarships** across 10 countries, 6 academic streams, and 3 education levels. The application features three distinct view modes (Card, Table, and Map), real-time filtering with visual feedback, and a detail modal with external application links.

### Why Vanilla JavaScript?

This project intentionally avoids frameworks to demonstrate proficiency in core web fundamentals:

- **DOM manipulation** — Efficient rendering with `innerHTML` batching and event delegation
- **State management** — Centralized application state with controlled re-renders
- **CSS architecture** — Custom properties, responsive grid/flexbox layouts, and 4-tier breakpoint system
- **Data layer** — Seeded PRNG for reproducible data generation with Local Storage persistence

---

## Key Features

| Category | Feature | Implementation |
|----------|---------|----------------|
| **Data** | 250 scholarship listings | Seeded pseudo-random generation across 10 countries, 100 universities, 6 streams |
| **Search** | Real-time debounced search | 300ms debounce; searches title, university, country, stream, and description |
| **Filtering** | Multi-dimensional filtering | Country (10), Stream (6), Level (3), Deadline — combinable with AND logic |
| **Sorting** | 3 sort modes | Relevance (default), Amount (descending), Deadline (ascending/soonest) |
| **Views** | Card / Table / Map toggle | Three-way view switch with state persistence across interactions |
| **Pagination** | Progressive loading | "Load More" batches of 6 with remaining count indicator |
| **Detail Modal** | Rich scholarship details | Full metadata grid, deadline countdown, and Google Search "Apply Now" link |
| **Statistics** | Live dashboard | Total count, full-funding count, deadlines this quarter, country coverage |
| **UX Polish** | Skeleton loading, filter tags, keyboard shortcuts | Shimmer animation, removable tag chips, Escape-to-close |
| **Responsive** | 4-tier breakpoint system | Desktop sidebar → tablet overlay → mobile slide-in → compact small mobile |

---

## Demo

### Quick Start (No Installation)

Simply open `index.html` in any modern browser — the app is fully self-contained.

### With Local Server (Recommended)

```bash
git clone https://github.com/tvisha03/scholarship-finder-ui.git
cd scholarship-finder-ui
python3 -m http.server 8080
# Open http://localhost:8080
```

> **Note:** A local server avoids potential CORS/module restrictions in some browsers.

---

## Getting Started

### Prerequisites

- Any modern browser (Chrome 80+, Firefox 78+, Safari 14+, Edge 80+)
- No Node.js, npm, or build tools required

### Installation

```bash
# Clone the repository
git clone https://github.com/tvisha03/scholarship-finder-ui.git

# Navigate to the project
cd scholarship-finder-ui

# Option 1: Open directly
open index.html

# Option 2: Local server
python3 -m http.server 8080
```

The app generates 250 scholarships and persists them to Local Storage on first load. Subsequent visits load instantly from cache.

---

## Project Structure

```
scholarship-finder/
├── index.html                # Semantic HTML5 layout (373 lines)
├── css/
│   └── styles.css            # Complete responsive stylesheet (1,703 lines)
├── js/
│   ├── data.js               # Seeded data generation engine (293 lines)
│   ├── storage.js            # Local Storage abstraction layer (41 lines)
│   ├── filters.js            # Filter & sort pipeline (106 lines)
│   ├── render.js             # View rendering module (560 lines)
│   └── app.js                # Application controller & state manager (441 lines)
├── assets/
│   └── flags/                # Reserved for flag assets (emoji flags used inline)
└── README.md
```

**Total: ~3,500 lines** across 7 source files — no bundler, no transpiler, no framework.

---

## Architecture & Design Decisions

### Modular JavaScript (No Framework)

The codebase follows a clean separation of concerns across five modules:

```
┌─────────────────────────────────────────────────┐
│                    app.js                        │
│            (Controller / State Manager)          │
│  - Centralized state object                     │
│  - Event binding via delegation                 │
│  - Coordinates all modules                      │
├────────────┬────────────┬───────────────────────┤
│  data.js   │ filters.js │      render.js        │
│  (Model)   │ (Logic)    │      (View)           │
│  - PRNG    │ - Filter   │  - Cards / Table /    │
│  - Schema  │   pipeline │    Map rendering      │
│  - 250 obj │ - Sort     │  - Modal / Stats /    │
│            │   engine   │    Skeletons          │
├────────────┴────────────┴───────────────────────┤
│                  storage.js                      │
│            (Persistence Layer)                   │
│  - Local Storage get/set/clear                  │
└─────────────────────────────────────────────────┘
```

### Key Design Choices

| Decision | Rationale |
|----------|-----------|
| **Seeded PRNG (seed=42)** | Produces identical 250 scholarships on every load — reproducible for testing and review |
| **Event delegation** | Single listener on parent containers for cards, table rows, and map items — O(1) memory |
| **CSS Custom Properties** | 20+ design tokens for consistent theming; single source of truth for colors, spacing, radii |
| **innerHTML batching** | Builds full HTML strings before single DOM insertion — avoids layout thrashing |
| **Dynamic deadlines** | Uses `new Date().getFullYear()` as base — deadlines are always future-dated, never stale |

---

## Tech Stack

| Layer | Technology | Details |
|-------|------------|---------|
| **Structure** | HTML5 | Semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`), ARIA labels |
| **Styling** | CSS3 | Flexbox + CSS Grid, Custom Properties, transitions, media queries |
| **Logic** | Vanilla JS (ES6) | Modules, template literals, destructuring, arrow functions, `map`/`filter`/`sort` |
| **Persistence** | Local Storage API | JSON serialization/deserialization for 250-object dataset |
| **Icons** | Inline SVG | Zero external requests — all icons are inline `<svg>` elements |
| **Flags** | Unicode Emoji | Native OS emoji rendering — no image assets needed |

---

## Feature Details

### Search

- **Debounced input** (300ms) prevents excessive re-renders during fast typing
- Searches across 5 fields: title, university, description, country, and stream
- Case-insensitive substring matching
- Displays "No scholarships found" empty state with contextual messaging

### Filtering

| Filter | Options | Behavior |
|--------|---------|----------|
| **Country** | 10 countries (USA, UK, Canada, Germany, France, Australia, Netherlands, Sweden, Japan, Switzerland) | Multi-select checkboxes, instant apply |
| **Stream** | STEM, Business, Law, International Relations, Arts, Medicine | Multi-select checkboxes |
| **Level** | UG (Undergraduate), PG (Postgraduate), PhD (Doctoral) | Multi-select checkboxes |
| **Deadline** | Date picker | Filters scholarships with deadlines on or before selected date |

- All filters combine with **AND logic** — narrowing results progressively
- **Active filter tags** appear as removable chips above the results area
- **Reset button** clears all filters and restores the full dataset

### Three View Modes

1. **Card View** — Responsive grid of scholarship cards with flag, funding badge, level badge, amount, deadline countdown, and "View Details" button
2. **Table View** — Sortable data table with 9 columns; entire rows are clickable to open the detail modal
3. **Map View** — SVG world map with interactive country markers; expandable country cards list individual scholarships with click-to-detail

### Detail Modal

- Opens from any view (card button, table row, or map item)
- Displays full metadata in a 2-column grid: Country, Stream, Level, Amount, Funding Type, Deadline (with countdown)
- **Apply Now** button opens a pre-filled Google Search: `"{title} {university} scholarship apply"`
- Closeable via: Close button, X icon, Escape key, or backdrop click

### Statistics Dashboard

Four live-updating metric cards:

| Metric | Description |
|--------|-------------|
| **Total Scholarships** | Count of all scholarships matching current filters |
| **Full Funding** | Count with `fundingType === "Full"` |
| **Deadlines This Quarter** | Count with deadlines within the current 90-day window |
| **Countries** | Count of unique countries in the current dataset |

---

## Responsive Design

The application implements a 4-tier responsive layout system:

| Breakpoint | Layout | Key Changes |
|------------|--------|-------------|
| **Desktop** (>1024px) | Sidebar + content grid | Persistent sidebar, 3-column card grid |
| **Tablet** (768–1024px) | Overlay sidebar | Collapsible sidebar via toggle button, 2-column grid |
| **Mobile** (<768px) | Full-width stacked | Slide-in filter panel, single-column cards, compact stats |
| **Small Mobile** (<480px) | Minimal chrome | Hidden brand text, condensed stat cards |

Additional responsive features:
- CSS Grid with `auto-fill` and `minmax()` for fluid card layouts
- Custom scrollbar styling on WebKit browsers
- Print stylesheet that hides navigation, sidebar, and footer

---

## Data Model

Each scholarship object follows this schema:

```javascript
{
  id: Number,              // Unique identifier (1–250)
  title: String,           // e.g., "Global Scholars STEM Graduate Award"
  country: String,         // e.g., "USA"
  flag: String,            // Unicode emoji flag, e.g., "🇺🇸"
  stream: String,          // One of: STEM, Business, Law, IR, Arts, Medicine
  level: String,           // One of: UG, PG, PhD
  amount: Number,          // $5,000 – $100,000
  fundingType: String,     // One of: Full, Partial, Tuition Only, Living Stipend
  deadline: String,        // ISO date string (always future-dated)
  university: String,      // e.g., "MIT"
  description: String      // Stream-specific description text
}
```

### Data Generation

- **Seeded PRNG** (seed=42) ensures deterministic output across all environments
- **10 countries** × **10 universities each** = 100 university options
- **30 scholarship name prefixes** combined with stream/level suffixes
- **5 descriptions per stream** for natural variation
- **Dynamic deadlines**: generated relative to `new Date().getFullYear()`, with past dates automatically shifted forward by one year

---

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 80+ | Fully supported |
| Firefox | 78+ | Fully supported |
| Safari | 14+ | Fully supported |
| Edge | 80+ | Fully supported |

> Requires ES6 support (template literals, arrow functions, `const`/`let`, destructuring). No polyfills needed for modern browsers.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with HTML, CSS & JavaScript — zero frameworks, zero dependencies.
</p>
