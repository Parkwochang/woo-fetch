interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: string[]
}

interface NextType {
  next?: NextFetchRequestConfig | undefined
}

interface FetchOption {
  params?: Record<string, string>;
  body?: XMLHttpRequestBodyInit;
  headers?: HeadersInit;
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  next?: NextType
}