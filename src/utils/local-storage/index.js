class LocalStorage {

  setItem(key, value) {
    if (value) localStorage.setItem(key, value);
  }

  getItem(key) {
    if (!key) return null;
    return localStorage.getItem(key);
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorage();
