import NextFetch from "./core/WooFetch";

interface CreateProps {
  baseUrl: string;
  timeout?: number;
  header?: any;
}

// ! 추후 좀 더 세부적으로 셋팅 필요
const defaultConfig = {
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json',
  },
  //! AbortSignal.timeout 에러 있을 수 있으므로 timeout 감싼 new AbortController().signal 로 처리
  // signal: AbortSignal.timeout(8000), -> 가끔 에러 생김 
};

function CreateInstance(config: typeof defaultConfig) {
  const instance = new NextFetch(config);

  return instance;
}

// ! class ->module 패턴으로 재 설계중 
function CreateFetch(config: typeof defaultConfig): any {
  const defaultConfig = config;
  return {
    create: (config: any) => CreateFetch(config),
    interceptor() { },
    get<T>(): Promise<T> { return Promise.resolve({} as T) },
    post<T>() { return Promise.resolve({} as T) },
  } as const;
}

export const woxios = CreateInstance(defaultConfig);