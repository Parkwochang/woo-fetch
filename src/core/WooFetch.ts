import { fetchAdapter } from './adapter';
import Interceptor from './interceptor';
import { transformPrams } from './utils';

interface FetchOption {
  params?: Record<string, string>;
  body?: Blob | BufferSource | FormData /* XMLHttpRequestBodyInit | null; */;
  headers?: RequestInit['headers'];
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  next?: { revalidate: number };
}

interface CreateProps {
  baseUrl: string;
  timeout?: number;
  header?: RequestInit['headers'];
}

export default class NextFetch {
  public interceptors;
  private defaults;

  // instanceConfig -> param, body 같은 값 제외하고 header 등의 정의 필요 
  constructor(instanceConfig: any) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
  }

  public create(config: CreateProps): NextFetch {
    const initOptions = {
      ...this.defaults,
      signal: AbortSignal.timeout(config.timeout || 8000),
      baseUrl: config.baseUrl || '',
      ...config.header,
    }

    return new NextFetch({ ...initOptions });
  }


  public async get<T>(url: string, { ...option }: FetchOption): Promise<T> {
    const new_url = new URL(`${this.defaults.baseUrl}${url}`);

    // ! 객체에 대한 불변 처리 필요 
    if (option?.params) {
      // ! 반복문 돌릴지 고민 const queryString = new URLSearchParams(option?.params).toString();      
      transformPrams(new_url, option.params)
      delete option.params;
    }

    const data = await fetch(new_url, { method: 'GET', ...this.defaults, ...option })
      .then(res => {
        if (res.status >= 400) {
          // ! 에러에 대한 확실한 알림 필요 
          throw new Error();
        }
        // ! 인터셉터에 대한 분기 처리 필요 
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

    return await fetchAdapter(new_url, { method: 'POST', ...this.defaults, ...option })
  }
}
