# woxios

[![npm version](https://img.shields.io/npm/v/gaxios.svg)](https://www.npmjs.org/package/woxios)
[![Build status](https://img.shields.io/github/actions/workflow/status/axios/axios/ci.yml?branch=v1.x&label=CI&logo=github&style=flat-square)](https://github.com/Parkwochang/woo-fetch)
<!-- [![CDNJS](https://img.shields.io/cdnjs/v/axios.svg?style=flat-square)](https://cdnjs.com/libraries/axios) -->


> An HTTP request client that provides an `axios` like interface over top of `node-fetch`, `fetch`.

> woxios provides ES Modules and typescript by default

## Install

```sh
$ npm install woxios
$ yarn add woxios
$ pnpm add woxios

```

## Example

```ts
import { woxios } from 'woxios';
const res = await woxios.get(
  'https://domain.com/v1/apis/',
  {
    params:{
      ex1: 1, 
      ex2: 2
    },
    cache: 'force-cache'
  }
);
```

## Setting Defaults

woxios supports setting default properties both on the default instance, and on additional instances. This is often useful when making many requests to the same domain with the same base settings. For example:

```ts
import { woxios } from 'woxios';
const instance = woxios.create({
  baseURL: 'https://example.com',
  timeout: 7000,
  headers: {
    Authorization: 'SOME_TOKEN'
  }
})
instance.get({url: '/data'}).then(...);
```

Note that setting default values will take precedence
over other authentication methods, i.e., application default credentials.

## Request Options

```ts
// The url to which the request should be sent.  Required.
  url: string,
{
  // The base Url to use for the request. Prepended to the `url` property above.
  baseURL: 'https://example.com';

  // The HTTP methods to be sent with the request.
  headers: { 'some': 'header' },

  // The data to send in the body of the request. Data objects will be
  // serialized as JSON.
  //
  // Note: if you would like to provide a Content-Type header other than
  // application/json you you must provide a string or readable stream, rather
  // than an object:
  // data: JSON.stringify({some: 'data'})
  // data: fs.readFile('./some-data.jpeg')
  body: {
    some: 'data'
  },
  params: {
    querystring: 'parameters'
  }

  // The max size of the http response content in bytes allowed.
  // Defaults to `0`, which is the same as unset.
  maxContentLength: 2000,

  // The max number of HTTP redirects to follow.
  // Defaults to 100.
  maxRedirects: 100,

  // The querystring parameters that will be encoded using `qs` and
  // appended to the url

  // By default, we use the `querystring` package in node core to serialize
  // querystring parameters.  You can override that and provide your
  // own implementation.
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },

  // The timeout for the HTTP request in milliseconds. Defaults to 0.
  timeout: 1000,

  // The expected return type of the request.  Options are:
  // json | stream | blob | arraybuffer | text | unknown
  // Defaults to `unknown`.
  responseType: 'unknown',

  // Configuration for retrying of requests.
  retryConfig: {
    // The number of times to retry the request.  Defaults to 3.
    retry?: number;

    // The number of retries already attempted.
    currentRetryAttempt?: number;

    // The HTTP Methods that will be automatically retried.
    // Defaults to ['GET','PUT','HEAD','OPTIONS','DELETE']
    httpMethodsToRetry?: string[];

    // The HTTP response status codes that will automatically be retried.
    // Defaults to: [[100, 199], [429, 429], [500, 599]]
    statusCodesToRetry?: number[][];

    // Function to invoke when a retry attempt is made.
    onRetryAttempt?: (err: GaxiosError) => Promise<void> | void;

    // Function to invoke which determines if you should retry
    shouldRetry?: (err: GaxiosError) => Promise<boolean> | boolean;

    // When there is no response, the number of retries to attempt. Defaults to 2.
    noResponseRetries?: number;

    // The amount of time to initially delay the retry, in ms.  Defaults to 100ms.
    retryDelay?: number;
  },

  // Enables default configuration for retries.
  retry: boolean,

  // Cancelling a request requires the `abort-controller` library.
  // See https://github.com/bitinn/node-fetch#request-cancellation-with-abortsignal
  signal?: AbortSignal

  /**
   * An experimental, customizable error redactor.
   *
   * Set `false` to disable.
   *
   * @experimental
   */
  errorRedactor?: typeof defaultErrorRedactor | false;
}
```

## License

<!-- [Apache-2.0](https://github.com/googleapis/gaxios/blob/master/LICENSE) -->
