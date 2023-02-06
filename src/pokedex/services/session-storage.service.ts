const sessionStorageService = {
  get(key: string): any {
    return JSON.parse(window.sessionStorage.getItem(key) as string);
  },
  set(key: string, value: any): void {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string): void {
    return window.sessionStorage.removeItem(key);
  },
  clear(): void {
    return window.sessionStorage.clear();
  }
};

export default sessionStorageService;
