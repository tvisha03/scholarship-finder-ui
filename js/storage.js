/**
 * storage.js — Local Storage API wrapper for scholarship data
 */

const STORAGE_KEY = "scholarships";

const Storage = {
  /**
   * Initialize data: generate and store if not already in Local Storage
   */
  initializeData() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const data = generateDummyData();
      this.saveScholarships(data);
    }
  },

  /**
   * Retrieve all scholarships from Local Storage
   * @returns {Array} Array of scholarship objects
   */
  getScholarships() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  /**
   * Save scholarships array to Local Storage
   * @param {Array} scholarships
   */
  saveScholarships(scholarships) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scholarships));
  },

  /**
   * Clear scholarship data from Local Storage
   */
  clearData() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
