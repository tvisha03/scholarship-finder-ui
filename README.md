# 🎓 ScholarFind — Scholarship Finder Web App

A modern, responsive Scholarship Finder dashboard built with **pure HTML, CSS, and Vanilla JavaScript (ES6)**. Browse, filter, sort, and explore 250+ scholarships from universities around the world — all powered by Local Storage.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Features

- **250 Scholarship Listings** — Realistic dummy data with diverse countries, streams, and universities
- **Advanced Filtering** — Filter by Country, Stream, Education Level, and Deadline
- **Real-time Search** — Instant search across titles, universities, and descriptions
- **Smart Sorting** — Sort by Relevance, Amount (High → Low), or Deadline (Soonest)
- **Dual View Modes** — Toggle between Card View, Table View, and Map View
- **Responsive Design** — Desktop sidebar, collapsible sidebar on tablet, modal filters on mobile
- **Local Storage** — Data persists across sessions via the browser's Local Storage API
- **Detail Modal** — Rich scholarship details with deadline countdown
- **Skeleton Loading** — Smooth loading animation on initial render
- **Active Filter Tags** — Visual feedback for applied filters with one-click removal
- **Statistics Dashboard** — Live stats: total scholarships, full funding count, deadlines this quarter, countries

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools, frameworks, or dependencies required

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/scholarship-finder.git
   cd scholarship-finder
   ```

2. **Open in browser:**
   ```bash
   open index.html
   ```
   Or simply double-click `index.html` in your file explorer.

3. **That's it!** The app generates 250 scholarships and stores them in Local Storage on first load.

---

## 📁 Project Structure

```
scholarship-finder/
│
├── index.html              # Main HTML layout
│
├── css/
│   └── styles.css          # Complete responsive styles
│
├── js/
│   ├── data.js             # Dummy data generation (250 scholarships)
│   ├── storage.js          # Local Storage API wrapper
│   ├── filters.js          # Filter & sort logic
│   ├── render.js           # DOM rendering functions
│   └── app.js              # Main app controller & event wiring
│
├── assets/
│   └── flags/              # Flag assets (emoji flags used inline)
│
└── README.md               # This file
```

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 (Flexbox + Grid) | Layout & responsive design |
| Vanilla JavaScript (ES6) | Application logic |
| Local Storage API | Client-side data persistence |
| SVG Icons | Inline vector icons (no external deps) |

---

## 🔍 Filtering & Sorting

### Filters
- **Country** — USA, UK, Canada, Germany, France, Australia, Netherlands, Sweden, Japan, Switzerland
- **Stream** — STEM, Business, Law, International Relations, Arts, Medicine
- **Level** — UG (Undergraduate), PG (Postgraduate), PhD (Doctoral)
- **Deadline** — Filter scholarships with deadlines before a selected date

### Sorting Options
- **Relevance** — Default order
- **Amount** — Highest scholarship amount first
- **Deadline** — Soonest deadlines first

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Desktop (>1024px) | Sidebar + Scholarship Grid |
| Tablet (768–1024px) | Collapsible sidebar overlay |
| Mobile (<768px) | Full-width cards, slide-in filter panel |
| Small mobile (<480px) | Compact stats, hidden brand text |

---

## 🎯 Scholarship Data Schema

```javascript
{
  id: 1,
  title: "Global Scholars STEM Graduate Award",
  country: "USA",
  flag: "🇺🇸",
  stream: "STEM",
  level: "PG",
  amount: 50000,
  fundingType: "Full",
  deadline: "2025-07-15",
  university: "Stanford University",
  description: "Scholarship for outstanding STEM students..."
}
```

---

## 📝 Suggested Git Commit History

```
git commit -m "Initial commit: project structure and README"
git commit -m "Add HTML layout with navbar, sidebar, and content area"
git commit -m "Add CSS styles with responsive design"
git commit -m "Add dummy data generation (250 scholarships)"
git commit -m "Add Local Storage module"
git commit -m "Add filter and sort logic"
git commit -m "Add rendering module (cards, table, stats, modal)"
git commit -m "Add main app controller with event bindings"
git commit -m "Final polish: skeleton loading, active tags, responsive fixes"
```

---

## 🧩 Bonus Features Included

- ✅ Interactive world map view with country markers
- ✅ Search bar with debounced input
- ✅ Funding type badges (Full, Partial, Tuition Only, Living Stipend)
- ✅ Deadline countdown (days remaining)
- ✅ Skeleton loading animation
- ✅ Active filter tags with removal
- ✅ Detail modal with Apply Now action
- ✅ Keyboard shortcuts (Escape to close)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using pure HTML, CSS & JavaScript — no frameworks, no dependencies.
