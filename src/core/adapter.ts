export interface IFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete';
  body?: BodyInit;
  headers?: HeadersInit;
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  next?: { revalidate: number };
  retry?: number; // ! retry 로직 구현 필요
  timeout?: number; // ! timeout -> signal 
}

export class Adapter {
  static async fetch<T>(url: string, fetchOptions: IFetchOptions): Promise<T> {
    if (fetchOptions.retry) {
      // ! retry 로직 구현 필요 -> timeout과 연계 필요 
    }
    const optionsInit = {
      ...fetchOptions,
      headers: { ...fetchOptions.headers }
    }

    return new Promise((resolve, reject) => {
      fetch(url, {
        ...optionsInit,
      })
    })
  }
}

export function fetchAdapter(url: URL, fetchOptions: IFetchOptions) {


  return new Promise((resolve, reject) => {
    fetch(url, {
      ...fetchOptions,
    })
  })
}

// ! 현재 필요한 것  request, reponse, error, retry, timeout

//! timeout 구현 중 
// const controller = new AbortController();
// const timeout = setTimeout(() => {
// 	controller.abort();
// }, 150);

// try {
// 	const response = await fetch('https://example.com', {signal: controller.signal});
// 	const data = await response.json();
// } catch (error) {
// 	if (error instanceof AbortError) {
// 		console.log('request was aborted');
// 	}
// } finally {
// 	clearTimeout(timeout);
// }
