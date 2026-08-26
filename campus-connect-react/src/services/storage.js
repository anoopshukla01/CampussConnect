export const storage = {
  async set(key, value) {
    const strVal = typeof value === 'string' ? value : JSON.stringify(value);
    try {
      localStorage.setItem(key, strVal);
    } catch (_) {}
  },

  async get(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  },

  async remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (_) {}
  },

  async clear() {
    try {
      localStorage.clear();
    } catch (_) {}
  }
};


