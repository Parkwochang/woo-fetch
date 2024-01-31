export interface IFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit;
  headers?: HeadersInit;
  cache?: 'force-cache' | 'no-store' | 'no-cache';
  next?: NextType;
  retry?: number; // ! retry 로직 구현 필요
  timeout?: number; // ! timeout -> signal 
}