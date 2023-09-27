import NextFetch from "./core/WooFetch";

interface CreateProps {
  baseUrl: string;
  timeOut?: number;
  header?: any;
}

// ! 추후 좀 더 세부적으로 셋팅 필요
const defaultConfig = {
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json',
  },
  //! AbortSignal.timeout 에러 있을 수 있으므로 timeout 감싼 new AbortController().signal 로 처리
  signal: AbortSignal.timeout(8000),
};

function CreateInstance(config: typeof defaultConfig) {
  const instance = new NextFetch(config);

  // instance.create = (instanceConfig: CreateProps) => {
  //   return CreateInstance({ ...config, ...instanceConfig });
  // };

  return instance;
}

const nextFetch = CreateInstance(defaultConfig);

export default nextFetch;

//! 자동완성과 타입 추론을 못하는 에러 발생