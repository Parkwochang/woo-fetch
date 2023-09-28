export interface IFetchOptions {
  method: string
  body?: object
  params?: object
  query?: object
  headers?: HeadersInit
  // watch?: MultiWatchSources
}

export class Adapter {

  private static async fetch<T>(url: string, fetchOptions: IFetchOptions) {
    const optionsInit = {
      ...fetchOptions,
      initialCache: false,
      headers: { ...fetchOptions.headers }
    }

    return new Promise((resolve, reject) => {
      fetch(url, {

      })
    })
  }
}

// ! 현재 필요한 것  request, reponse, error, retry, timeout
