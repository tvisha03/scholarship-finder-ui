/**
 * app.js — Main application controller
 * Wires up UI events, manages state, coordinates modules
 */

const App = {
  /** Application state */
  state: {
    allScholarships: [],
    filteredScholarships: [],
    displayedCount: 6,
    batchSize: 6,
    currentView: "cards", // "cards" | "table" | "map"
    currentSort: "relevance",
    filters: {
      countries: [],
      streams: [],
      levels: [],
      deadline: "",
      search: "",
    },
  },

  /** DOM element references */
  els: {},

  /**
   * Initialize the application
   */
  init() {
    // Force fresh data generation to avoid stale schema issues
    Storage.clearData();
    Storage.initializeData();

    // Load data
    this.state.allScholarships = Storage.getScholarships();
    this.state.filteredScholarships = [...this.state.allScholarships];

    // Guard: if data failed to load, abort gracefully
    if (!this.state.allScholarships || this.state.allScholarships.length === 0) {
      console.error('ScholarFind: Failed to load scholarship data.');
      return;
    }

    // Cache DOM elements
    this.cacheElements();

    // Render initial UI
    this.renderAll();

    // Bind event listeners
    this.bindEvents();

    // Show loading animation then render
    this.showLoadingThenRender();
  },

  /**
   * Cache frequently used DOM elements
   */
  cacheElements() {
    this.els = {
      scholarshipGrid: document.getElementById("scholarship-grid"),
      scholarshipTable: document.getElementById("scholarship-table"),
      loadMoreBtn: document.getElementById("load-more-btn"),
      loadMoreCount: document.getElementById("load-more-count"),
      searchInput: document.getElementById("search-input"),
      sortSelect: document.getElementById("sort-select"),
      viewCards: document.getElementById("view-cards"),
      viewTable: document.getElementById("view-table"),
      applyFiltersBtn: document.getElementById("apply-filters"),
      resetFiltersBtn: document.getElementById("reset-filters"),
      deadlineFilter: document.getElementById("deadline-filter"),
      resultCount: document.getElementById("result-count"),
      filterToggle: document.getElementById("filter-toggle"),
      sidebar: document.getElementById("sidebar"),
      sidebarOverlay: document.getElementById("sidebar-overlay"),
      sidebarClose: document.getElementById("sidebar-close"),
      activeFiltersContainer: document.getElementById("active-filters"),
      scholarshipMap: document.getElementById("scholarship-map"),
      viewMap: document.getElementById("view-map"),
    };
  },

  /**
   * Show skeleton loading, then render actual data
   */
  showLoadingThenRender() {
    Render.renderSkeletons(this.els.scholarshipGrid);
    setTimeout(() => {
      this.updateDisplay();
    }, 600);
  },

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Search — debounced, reads all filters from UI
    let searchTimeout;
    this.els.searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.state.filters.search = e.target.value;
        this.readFiltersFromUI();
        this.applyFiltersAndSort();
      }, 300);
    });

    // Sort
    this.els.sortSelect.addEventListener("change", (e) => {
      this.state.currentSort = e.target.value;
      this.readFiltersFromUI();
      this.state.filters.search = this.els.searchInput.value;
      this.applyFiltersAndSort();
    });

    // View toggles
    this.els.viewCards.addEventListener("click", () =>
      this.setView("cards")
    );
    this.els.viewTable.addEventListener("click", () =>
      this.setView("table")
    );
    this.els.viewMap.addEventListener("click", () =>
      this.setView("map")
    );

    // Apply filters button
    this.els.applyFiltersBtn.addEventListener("click", () =>
      this.applyFiltersFromUI()
    );

    // Reset filters
    this.els.resetFiltersBtn.addEventListener("click", () =>
      this.resetFilters()
    );

    // Deadline filter — auto-apply on change
    this.els.deadlineFilter.addEventListener("change", (e) => {
      this.state.filters.deadline = e.target.value;
      this.applyFiltersFromUI();
    });

    // Load more
    this.els.loadMoreBtn.addEventListener("click", () =>
      this.loadMore()
    );

    // View details click delegation
    this.els.scholarshipGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-view-details");
      if (btn) this.showDetail(parseInt(btn.dataset.id));
    });
    this.els.scholarshipTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-table-details");
      if (btn) {
        this.showDetail(parseInt(btn.dataset.id));
        return;
      }
      const row = e.target.closest(".table-row-clickable");
      if (row) this.showDetail(parseInt(row.dataset.id));
    });
    this.els.scholarshipMap.addEventListener("click", (e) => {
      const item = e.target.closest(".map-item-clickable");
      if (item) this.showDetail(parseInt(item.dataset.id));
    });

    // Mobile sidebar toggle
    this.els.filterToggle.addEventListener("click", () =>
      this.toggleSidebar()
    );
    this.els.sidebarOverlay.addEventListener("click", () =>
      this.toggleSidebar()
    );
    this.els.sidebarClose.addEventListener("click", () =>
      this.toggleSidebar()
    );

    // Keyboard shortcut — Escape to close modal/sidebar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.getElementById("detail-modal");
        if (modal) modal.remove();
        if (this.els.sidebar.classList.contains("open")) {
          this.toggleSidebar();
        }
      }
    });

    // Checkbox filter change — auto-apply instantly
    document
      .querySelectorAll('.filter-group input[type="checkbox"]')
      .forEach((cb) => {
        cb.addEventListener("change", () => {
          this.applyFiltersFromUI();
        });
      });
  },

  /**
   * Read filter values from the UI checkboxes and inputs
   */
  readFiltersFromUI() {
    const getChecked = (name) =>
      Array.from(
        document.querySelectorAll(`input[name="${name}"]:checked`)
      ).map((el) => el.value);

    this.state.filters.countries = getChecked("country");
    this.state.filters.streams = getChecked("stream");
    this.state.filters.levels = getChecked("level");
    this.state.filters.deadline = this.els.deadlineFilter.value;
    // Preserve the current search input value
    this.state.filters.search = this.els.searchInput.value;
  },

  /**
   * Apply filters from sidebar UI and update display
   */
  applyFiltersFromUI() {
    this.readFiltersFromUI();
    this.applyFiltersAndSort();

    // Close sidebar on mobile if open
    if (this.els.sidebar.classList.contains("open")) {
      this.toggleSidebar();
    }
  },

  /**
   * Apply all filters and sort, then update display
   */
  applyFiltersAndSort() {
    this.state.displayedCount = this.state.batchSize;

    // Always read the freshest filter state from the UI
    this.readFiltersFromUI();
    this.state.currentSort = this.els.sortSelect.value;

    this.state.filteredScholarships = Filters.applyAll(
      this.state.allScholarships,
      this.state.filters
    );
    this.state.filteredScholarships = Filters.sort(
      this.state.filteredScholarships,
      this.state.currentSort
    );
    this.updateDisplay();
    this.updateActiveFilterTags();
  },

  /**
   * Reset all filters to defaults
   */
  resetFilters() {
    // Uncheck all checkboxes
    document
      .querySelectorAll('.filter-group input[type="checkbox"]')
      .forEach((cb) => (cb.checked = false));

    // Reset deadline
    this.els.deadlineFilter.value = "";

    // Reset search
    this.els.searchInput.value = "";

    // Reset state
    this.state.filters = {
      countries: [],
      streams: [],
      levels: [],
      deadline: "",
      search: "",
    };
    this.state.currentSort = "relevance";
    this.els.sortSelect.value = "relevance";
    this.state.displayedCount = this.state.batchSize;
    this.state.filteredScholarships = [...this.state.allScholarships];

    this.updateDisplay();
    this.updateActiveFilterTags();
  },

  /**
   * Show detail modal for a scholarship
   */
  showDetail(id) {
    const scholarship = this.state.allScholarships.find((s) => s.id === id);
    if (scholarship) {
      Render.renderDetailModal(scholarship);
    }
  },

  /**
   * Toggle between card and table view
   */
  setView(view) {
    this.state.currentView = view;
    this.els.viewCards.classList.toggle("active", view === "cards");
    this.els.viewTable.classList.toggle("active", view === "table");
    this.els.viewMap.classList.toggle("active", view === "map");
    this.els.scholarshipGrid.classList.toggle("hidden", view !== "cards");
    this.els.scholarshipTable.classList.toggle("hidden", view !== "table");
    this.els.scholarshipMap.classList.toggle("hidden", view !== "map");
    this.updateDisplay();
  },

  /**
   * Load more scholarships
   */
  loadMore() {
    this.state.displayedCount += this.state.batchSize;
    this.updateDisplay();
  },

  /**
   * Update display with current state
   */
  updateDisplay() {
    const visible = this.state.filteredScholarships.slice(
      0,
      this.state.displayedCount
    );
    const total = this.state.filteredScholarships.length;

    // Render stats
    Render.renderStats(this.state.allScholarships);

    // Render current view
    if (this.state.currentView === "cards") {
      Render.renderScholarshipCards(visible, this.els.scholarshipGrid);
    } else if (this.state.currentView === "table") {
      Render.renderScholarshipTable(visible, this.els.scholarshipTable);
    } else if (this.state.currentView === "map") {
      // Map view shows all filtered results (no pagination)
      Render.renderScholarshipMap(
        this.state.filteredScholarships,
        this.state.allScholarships,
        this.els.scholarshipMap
      );
    }

    // Update result count
    this.els.resultCount.textContent = `Showing ${Math.min(this.state.displayedCount, total)} of ${total} scholarships`;

    // Show/hide load more (hidden in map view)
    if (this.state.currentView === "map") {
      this.els.loadMoreBtn.classList.add("hidden");
    } else {
      const remaining = total - this.state.displayedCount;
      if (remaining > 0) {
        this.els.loadMoreBtn.classList.remove("hidden");
        this.els.loadMoreCount.textContent = `(${Math.min(remaining, this.state.batchSize)} more)`;
      } else {
        this.els.loadMoreBtn.classList.add("hidden");
      }
    }
  },

  /**
   * Toggle mobile sidebar
   */
  toggleSidebar() {
    this.els.sidebar.classList.toggle("open");
    this.els.sidebarOverlay.classList.toggle("active");
    document.body.classList.toggle("sidebar-open");
  },

  /**
   * Update active filter tags display
   */
  updateActiveFilterTags() {
    this.readFiltersFromUI();
    const container = this.els.activeFiltersContainer;
    if (!container) return;

    const tags = [];
    this.state.filters.countries.forEach((c) =>
      tags.push({ label: c, type: "country", value: c })
    );
    this.state.filters.streams.forEach((s) =>
      tags.push({ label: s, type: "stream", value: s })
    );
    this.state.filters.levels.forEach((l) =>
      tags.push({ label: l, type: "level", value: l })
    );
    if (this.state.filters.deadline) {
      tags.push({
        label: `Before ${this.state.filters.deadline}`,
        type: "deadline",
        value: this.state.filters.deadline,
      });
    }

    if (tags.length === 0) {
      container.innerHTML = "";
      container.classList.add("hidden");
      return;
    }

    container.classList.remove("hidden");
    container.innerHTML = tags
      .map(
        (t) => `
      <span class="filter-tag" data-type="${t.type}" data-value="${t.value}">
        ${t.label}
        <button class="tag-remove" data-type="${t.type}" data-value="${t.value}">×</button>
      </span>
    `
      )
      .join("");

    // Remove tag handler
    container.querySelectorAll(".tag-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const type = e.target.dataset.type;
        const value = e.target.dataset.value;
        if (type === "deadline") {
          this.els.deadlineFilter.value = "";
        } else {
          const checkbox = document.querySelector(
            `input[name="${type}"][value="${value}"]`
          );
          if (checkbox) checkbox.checked = false;
        }
        this.applyFiltersFromUI();
      });
    });
  },

  /**
   * Render everything from scratch
   */
  renderAll() {
    Render.renderStats(this.state.allScholarships);
  },
};

// Boot the application
document.addEventListener("DOMContentLoaded", () => App.init());
