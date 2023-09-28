export function transformPrams(url: URL, params: any) {
  for (const key in params) {
    url.searchParams.set(key, params[key]);
  }
}

export function measureTime(fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
}

export function mergeOptions(defaultOptions: any, options: any) {
  return { ...defaultOptions, ...options };
}