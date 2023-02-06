const sessionStorageService = {
  get(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  },
  set(key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    return window.sessionStorage.removeItem(key);
  },
  clear() {
    return window.sessionStorage.clear();
  }
};

export default sessionStorageService;
