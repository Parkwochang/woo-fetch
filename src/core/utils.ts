export function transformPrams(url: URL, params: any) {
  for (const key in params) {
    url.searchParams.set(key, params[key]);
  }
}