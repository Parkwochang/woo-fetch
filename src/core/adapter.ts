export interface IFetchOptions {
  method: string;
  body?: BodyInit;
  headers?: HeadersInit;
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  next?: { revalidate: number };
  retry?: number;
  timeout?: number;
}

export class Adapter {
  static async fetch<T>(url: string, fetchOptions: IFetchOptions) {
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

// ! 현재 필요한 것  request, reponse, error, retry, timeout
