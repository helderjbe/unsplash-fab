let debounceTimer: NodeJS.Timeout;
export function debounceSearch(cb: () => void, delay: number) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    cb();
  }, delay);
}
