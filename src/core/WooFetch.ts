// import { measureTime } from '@utils/formatting';
import Interceptor from './interceptor';
import { transformPrams } from './utils';

interface FetchOption {
  params?: Record<string, string>;
  body?: Blob | BufferSource | FormData /* XMLHttpRequestBodyInit | null; */;
  headers?: RequestInit['headers'];
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  next?: { revalidate: number };
}

export interface IFetchOptions {
  method: string;
  body?: object;
  params?: object;
  query?: object;
  headers?: HeadersInit;
}

interface CreateProps {
  baseUrl: string;
  timeOut?: number;
  header?: any;
}

export default class NextFetch {
  public interceptors;
  private defaults;

  constructor(instanceConfig: any) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
    // this.create = (config: CreateProps) => new NextFetch({ ...instanceConfig, ...config });
  }

  //! 타입 추론 때문에 한번에 붙여야할 필요있다. 어차피 함수로 호출하나 똑같은 것 같다. 
  public create(config: CreateProps) {

    return new NextFetch({ ...this.defaults, ...config });
  }


  public async get(url: string, { ...option }: FetchOption) {
    const new_url = new URL(`${this.defaults.baseUrl}${url}`);

    if (option?.params) {
      // ! 반복문 돌릴지 고민 const queryString = new URLSearchParams(option?.params).toString();
      console.log(
        // measureTime(() => {
        transformPrams(new_url, option.params)
        // }),
      );
      delete option.params;
    }

    const data = await fetch(new_url, { method: 'GET', ...this.defaults, ...option })
      .then(res => {
        if (res.status >= 400) {
          throw new Error();
        }

        if (this.interceptors.response.handlers[0].fulfilled) {
          this.interceptors.response.handlers[0].fulfilled(res);
        }

        return res.json();
      })
      .catch(err => {
        if (this.interceptors.response.handlers[0].rejected) {
          this.interceptors.response.handlers[0].rejected(err);
        }
        return err;
      });

    return data;
  }

  public async post(url: string, option?: FetchOption) {
    const new_url = new URL(`${this.defaults.baseUrl}${url}`);

    const data = await (await fetch(new_url, { method: 'POST', ...option })).json();
    return data;
  }
}
