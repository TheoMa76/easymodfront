export function getLocalStorage(key: string, defaultValue: any): any {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null && stickyValue !== 'undefined'
      ? JSON.parse(stickyValue)
      : defaultValue;
  }
  
  export function setLocalStorage(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }