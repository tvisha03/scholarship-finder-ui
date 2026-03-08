/**
 * filters.js — Reusable filter & sort functions for scholarships
 */

const Filters = {
  /**
   * Filter scholarships by selected countries
   * @param {Array} scholarships
   * @param {Array} countries - e.g. ["USA", "UK"]
   * @returns {Array}
   */
  filterByCountry(scholarships, countries) {
    if (!countries || countries.length === 0) return scholarships;
    return scholarships.filter((s) => countries.includes(s.country));
  },

  /**
   * Filter scholarships by selected streams
   * @param {Array} scholarships
   * @param {Array} streams - e.g. ["STEM", "Business"]
   * @returns {Array}
   */
  filterByStream(scholarships, streams) {
    if (!streams || streams.length === 0) return scholarships;
    return scholarships.filter((s) => streams.includes(s.stream));
  },

  /**
   * Filter scholarships by education level
   * @param {Array} scholarships
   * @param {Array} levels - e.g. ["UG", "PG"]
   * @returns {Array}
   */
  filterByLevel(scholarships, levels) {
    if (!levels || levels.length === 0) return scholarships;
    return scholarships.filter((s) => levels.includes(s.level));
  },

  /**
   * Filter scholarships by deadline (before a given date)
   * @param {Array} scholarships
   * @param {string} deadline - ISO date string e.g. "2025-12-31"
   * @returns {Array}
   */
  filterByDeadline(scholarships, deadline) {
    if (!deadline) return scholarships;
    const cutoff = new Date(deadline);
    return scholarships.filter((s) => new Date(s.deadline) <= cutoff);
  },

  /**
   * Filter by search query (title, university, description)
   * @param {Array} scholarships
   * @param {string} query
   * @returns {Array}
   */
  filterBySearch(scholarships, query) {
    if (!query || query.trim() === "") return scholarships;
    const q = query.toLowerCase().trim();
    return scholarships.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.stream.toLowerCase().includes(q)
    );
  },

  /**
   * Apply all active filters at once
   * @param {Array} scholarships
   * @param {Object} activeFilters - { countries, streams, levels, deadline, search }
   * @returns {Array}
   */
  applyAll(scholarships, activeFilters) {
    let result = [...scholarships];
    result = this.filterByCountry(result, activeFilters.countries);
    result = this.filterByStream(result, activeFilters.streams);
    result = this.filterByLevel(result, activeFilters.levels);
    result = this.filterByDeadline(result, activeFilters.deadline);
    result = this.filterBySearch(result, activeFilters.search);
    return result;
  },

  /**
   * Sort scholarships
   * @param {Array} scholarships
   * @param {string} sortBy - "relevance" | "amount" | "deadline"
   * @returns {Array}
   */
  sort(scholarships, sortBy) {
    const sorted = [...scholarships];
    switch (sortBy) {
      case "amount":
        return sorted.sort((a, b) => b.amount - a.amount);
      case "deadline":
        return sorted.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      case "relevance":
      default:
        return sorted; // default order
    }
  },
};
