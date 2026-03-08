/**
 * render.js — DOM rendering functions for the Scholarship Finder UI
 */

const Render = {
  /**
   * Format currency
   */
  formatAmount(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  },

  /**
   * Format date to readable string
   */
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  /**
   * Calculate days remaining until deadline
   */
  daysUntilDeadline(dateStr) {
    const now = new Date();
    const deadline = new Date(dateStr);
    const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diff;
  },

  /**
   * Get badge class for funding type
   */
  getFundingBadgeClass(type) {
    switch (type) {
      case "Full":
        return "badge-full";
      case "Partial":
        return "badge-partial";
      case "Tuition Only":
        return "badge-tuition";
      case "Living Stipend":
        return "badge-stipend";
      default:
        return "badge-default";
    }
  },

  /**
   * Get level badge class
   */
  getLevelBadge(level) {
    switch (level) {
      case "PhD":
        return "level-phd";
      case "PG":
        return "level-pg";
      case "UG":
        return "level-ug";
      default:
        return "";
    }
  },

  /**
   * Render scholarship cards into the grid
   */
  renderScholarshipCards(scholarships, container) {
    container.innerHTML = "";

    if (scholarships.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No scholarships found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>`;
      return;
    }

    scholarships.forEach((s) => {
      const daysLeft = this.daysUntilDeadline(s.deadline);
      const deadlineClass =
        daysLeft <= 30 ? "deadline-urgent" : daysLeft <= 90 ? "deadline-soon" : "deadline-ok";

      const card = document.createElement("div");
      card.className = "scholarship-card";
      card.setAttribute("data-id", s.id);
      card.innerHTML = `
        <div class="card-header">
          <span class="card-flag">${s.flag}</span>
          <div class="card-badges">
            <span class="badge ${this.getFundingBadgeClass(s.fundingType)}">${s.fundingType}</span>
            <span class="badge level-badge ${this.getLevelBadge(s.level)}">${s.level}</span>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${s.title}</h3>
          <p class="card-university">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            ${s.university}
          </p>
          <p class="card-description">${s.description}</p>
        </div>
        <div class="card-footer">
          <div class="card-meta">
            <div class="card-amount">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>${this.formatAmount(s.amount)}</span>
            </div>
            <div class="card-deadline ${deadlineClass}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${daysLeft > 0 ? daysLeft + " days left" : "Expired"}</span>
            </div>
          </div>
          <button class="btn-view-details" data-id="${s.id}">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  },

  /**
   * Render scholarship table view
   */
  renderScholarshipTable(scholarships, container) {
    container.innerHTML = "";

    if (scholarships.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No scholarships found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>`;
      return;
    }

    const table = document.createElement("div");
    table.className = "table-wrapper";
    table.innerHTML = `
      <table class="scholarship-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>University</th>
            <th>Country</th>
            <th>Stream</th>
            <th>Level</th>
            <th>Amount</th>
            <th>Deadline</th>
            <th>Funding</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${scholarships
            .map(
              (s) => `
            <tr class="table-row-clickable" data-id="${s.id}">
              <td class="table-flag">${s.flag}</td>
              <td class="table-title">${s.title}</td>
              <td>${s.university}</td>
              <td>${s.country}</td>
              <td><span class="table-stream">${s.stream}</span></td>
              <td><span class="badge level-badge ${this.getLevelBadge(s.level)}">${s.level}</span></td>
              <td class="table-amount">${this.formatAmount(s.amount)}</td>
              <td>${this.formatDate(s.deadline)}</td>
              <td><span class="badge ${this.getFundingBadgeClass(s.fundingType)}">${s.fundingType}</span></td>
              <td>
                <button class="btn-table-details" data-id="${s.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
    container.appendChild(table);
  },

  /**
   * Render top statistics bar
   */
  renderStats(scholarships) {
    const totalEl = document.getElementById("stat-total");
    const fullFundingEl = document.getElementById("stat-full-funding");
    const deadlineEl = document.getElementById("stat-deadline");
    const countriesEl = document.getElementById("stat-countries");

    if (totalEl)
      totalEl.textContent = scholarships.length;
    if (fullFundingEl)
      fullFundingEl.textContent = scholarships.filter(
        (s) => s.fundingType === "Full"
      ).length;
    if (deadlineEl) {
      const now = new Date();
      const quarterEnd = new Date(
        now.getFullYear(),
        Math.ceil((now.getMonth() + 1) / 3) * 3,
        0
      );
      deadlineEl.textContent = scholarships.filter(
        (s) => new Date(s.deadline) <= quarterEnd && new Date(s.deadline) >= now
      ).length;
    }
    if (countriesEl) {
      const uniqueCountries = new Set(scholarships.map((s) => s.country));
      countriesEl.textContent = uniqueCountries.size;
    }
  },

  /**
   * Render skeleton loading cards
   */
  renderSkeletons(container, count = 6) {
    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "scholarship-card skeleton-card";
      skeleton.innerHTML = `
        <div class="card-header">
          <div class="skeleton skeleton-flag"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="card-body">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
        <div class="card-footer">
          <div class="skeleton skeleton-meta"></div>
          <div class="skeleton skeleton-btn"></div>
        </div>
      `;
      container.appendChild(skeleton);
    }
  },

  /**
   * Render the map view — an interactive SVG world map with country markers
   */
  renderScholarshipMap(scholarships, allScholarships, container) {
    container.innerHTML = "";

    if (scholarships.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <h3>No scholarships found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>`;
      return;
    }

    // Group scholarships by country
    const grouped = {};
    scholarships.forEach((s) => {
      if (!grouped[s.country]) {
        grouped[s.country] = { flag: s.flag, items: [] };
      }
      grouped[s.country].items.push(s);
    });

    // Country approximate positions on the map (percentage-based x, y)
    const COUNTRY_POSITIONS = {
      USA:         { x: 18, y: 38 },
      UK:          { x: 46, y: 28 },
      Canada:      { x: 20, y: 24 },
      Germany:     { x: 50, y: 30 },
      France:      { x: 47, y: 34 },
      Australia:   { x: 82, y: 72 },
      Netherlands: { x: 49, y: 28 },
      Sweden:      { x: 52, y: 20 },
      Japan:       { x: 85, y: 38 },
      Switzerland: { x: 49, y: 33 },
    };

    const mapWrapper = document.createElement("div");
    mapWrapper.className = "map-wrapper";

    // Build the SVG world map background
    mapWrapper.innerHTML = `
      <div class="map-header">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          Scholarships Around the World
        </h3>
        <span class="map-subtitle">${Object.keys(grouped).length} countries · ${scholarships.length} scholarships</span>
      </div>
      <div class="map-canvas" id="map-canvas">
        <svg class="map-bg-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          <!-- Simplified world map paths -->
          <g fill="#E2E8F0" stroke="#CBD5E1" stroke-width="0.5">
            <!-- North America -->
            <path d="M80,80 L220,60 L260,90 L280,150 L260,200 L220,220 L180,260 L130,240 L100,200 L60,180 L50,120 Z"/>
            <!-- South America -->
            <path d="M180,270 L220,260 L250,290 L260,350 L240,400 L210,430 L180,410 L160,360 L150,310 Z"/>
            <!-- Europe -->
            <path d="M430,70 L500,60 L540,80 L560,100 L550,140 L530,160 L490,170 L450,160 L430,130 L420,100 Z"/>
            <!-- Africa -->
            <path d="M430,180 L500,170 L540,200 L550,260 L530,330 L490,370 L450,360 L430,310 L420,250 L410,200 Z"/>
            <!-- Asia -->
            <path d="M560,60 L700,40 L800,60 L880,100 L900,160 L880,220 L800,240 L700,230 L620,200 L570,160 L560,100 Z"/>
            <!-- Australia -->
            <path d="M760,320 L840,310 L880,340 L890,380 L860,410 L800,420 L760,400 L750,360 Z"/>
            <!-- Japan -->
            <path d="M860,130 L870,110 L880,130 L875,160 L860,170 L855,150 Z"/>
            <!-- UK/Ireland -->
            <path d="M440,75 L455,65 L460,80 L455,95 L445,90 Z"/>
            <!-- Greenland -->
            <path d="M260,20 L340,10 L370,30 L360,60 L320,70 L280,55 Z"/>
            <!-- Iceland -->
            <path d="M380,40 L410,35 L415,50 L395,55 Z"/>
          </g>
          <!-- Grid lines -->
          <g stroke="#F1F5F9" stroke-width="0.3" stroke-dasharray="4,4">
            <line x1="0" y1="125" x2="1000" y2="125"/>
            <line x1="0" y1="250" x2="1000" y2="250"/>
            <line x1="0" y1="375" x2="1000" y2="375"/>
            <line x1="250" y1="0" x2="250" y2="500"/>
            <line x1="500" y1="0" x2="500" y2="500"/>
            <line x1="750" y1="0" x2="750" y2="500"/>
          </g>
          <!-- Equator -->
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#CBD5E1" stroke-width="0.5" stroke-dasharray="8,4" opacity="0.5"/>
        </svg>
        <div class="map-markers" id="map-markers"></div>
      </div>
      <div class="map-country-cards" id="map-country-cards"></div>
    `;

    container.appendChild(mapWrapper);

    // Render markers on the map
    const markersContainer = document.getElementById("map-markers");
    Object.entries(grouped).forEach(([country, data]) => {
      const pos = COUNTRY_POSITIONS[country] || { x: 50, y: 50 };
      const count = data.items.length;
      const totalAmount = data.items.reduce((sum, s) => sum + s.amount, 0);
      const size = Math.max(36, Math.min(64, 30 + count * 1.5));

      const marker = document.createElement("div");
      marker.className = "map-marker";
      marker.style.left = pos.x + "%";
      marker.style.top = pos.y + "%";
      marker.style.width = size + "px";
      marker.style.height = size + "px";
      marker.setAttribute("data-country", country);
      marker.innerHTML = `
        <span class="marker-flag">${data.flag}</span>
        <span class="marker-count">${count}</span>
        <div class="marker-tooltip">
          <strong>${data.flag} ${country}</strong>
          <span>${count} scholarship${count > 1 ? "s" : ""}</span>
          <span>Total: ${this.formatAmount(totalAmount)}</span>
        </div>
      `;
      marker.addEventListener("click", () => {
        document.querySelectorAll(".map-country-detail.active").forEach((el) => el.classList.remove("active"));
        const detail = document.querySelector(`.map-country-detail[data-country="${country}"]`);
        if (detail) {
          detail.classList.add("active");
          detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
      markersContainer.appendChild(marker);
    });

    // Render country detail cards below the map
    const cardsContainer = document.getElementById("map-country-cards");
    Object.entries(grouped)
      .sort((a, b) => b[1].items.length - a[1].items.length)
      .forEach(([country, data]) => {
        const totalAmount = data.items.reduce((sum, s) => sum + s.amount, 0);
        const fullCount = data.items.filter((s) => s.fundingType === "Full").length;
        const card = document.createElement("div");
        card.className = "map-country-detail";
        card.setAttribute("data-country", country);
        card.innerHTML = `
          <div class="map-detail-header">
            <span class="map-detail-flag">${data.flag}</span>
            <div class="map-detail-info">
              <h4>${country}</h4>
              <span class="map-detail-meta">${data.items.length} scholarship${data.items.length > 1 ? "s" : ""} · ${fullCount} full funding · Total ${this.formatAmount(totalAmount)}</span>
            </div>
            <button class="map-detail-toggle" aria-label="Toggle details">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
          <div class="map-detail-list">
            ${data.items
              .slice(0, 5)
              .map(
                (s) => `
              <div class="map-detail-item map-item-clickable" data-id="${s.id}">
                <div class="map-item-info">
                  <span class="map-item-title">${s.title}</span>
                  <span class="map-item-uni">${s.university}</span>
                </div>
                <div class="map-item-right">
                  <span class="map-item-amount">${this.formatAmount(s.amount)}</span>
                  <span class="badge ${this.getFundingBadgeClass(s.fundingType)}">${s.fundingType}</span>
                </div>
              </div>
            `
              )
              .join("")}
            ${data.items.length > 5 ? `<div class="map-detail-more">+${data.items.length - 5} more scholarships</div>` : ""}
          </div>
        `;

        // Toggle expand/collapse
        card.querySelector(".map-detail-toggle").addEventListener("click", (e) => {
          e.stopPropagation();
          card.classList.toggle("active");
        });
        card.querySelector(".map-detail-header").addEventListener("click", () => {
          card.classList.toggle("active");
        });

        cardsContainer.appendChild(card);
      });
  },

  /**
   * Render the detail modal for a single scholarship
   */
  renderDetailModal(scholarship) {
    const existing = document.getElementById("detail-modal");
    if (existing) existing.remove();

    const daysLeft = this.daysUntilDeadline(scholarship.deadline);

    const modal = document.createElement("div");
    modal.id = "detail-modal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" id="modal-close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="modal-header">
          <span class="modal-flag">${scholarship.flag}</span>
          <div>
            <h2>${scholarship.title}</h2>
            <p class="modal-university">${scholarship.university}</p>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <span class="meta-label">Country</span>
              <span class="meta-value">${scholarship.country}</span>
            </div>
            <div class="modal-meta-item">
              <span class="meta-label">Stream</span>
              <span class="meta-value">${scholarship.stream}</span>
            </div>
            <div class="modal-meta-item">
              <span class="meta-label">Level</span>
              <span class="meta-value">${scholarship.level}</span>
            </div>
            <div class="modal-meta-item">
              <span class="meta-label">Amount</span>
              <span class="meta-value amount-highlight">${this.formatAmount(scholarship.amount)}</span>
            </div>
            <div class="modal-meta-item">
              <span class="meta-label">Funding Type</span>
              <span class="meta-value"><span class="badge ${this.getFundingBadgeClass(scholarship.fundingType)}">${scholarship.fundingType}</span></span>
            </div>
            <div class="modal-meta-item">
              <span class="meta-label">Deadline</span>
              <span class="meta-value">${this.formatDate(scholarship.deadline)} ${daysLeft > 0 ? `(${daysLeft} days left)` : "(Expired)"}</span>
            </div>
          </div>
          <div class="modal-description">
            <h4>Description</h4>
            <p>${scholarship.description}</p>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-primary" id="modal-apply-btn">Apply Now</button>
          <button class="btn-secondary" id="modal-close-secondary">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Apply Now handler — opens a Google search for the scholarship
    const applyBtn = modal.querySelector("#modal-apply-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        const query = encodeURIComponent(`${scholarship.title} ${scholarship.university} scholarship apply`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
      });
    }

    // Close handlers
    const closeBtns = modal.querySelectorAll(
      "#modal-close-btn, #modal-close-secondary"
    );
    closeBtns.forEach((btn) =>
      btn.addEventListener("click", () => modal.remove())
    );
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    // Animate in
    requestAnimationFrame(() => modal.classList.add("active"));
  },
};
