class Interceptor {
  handlers: any[];
  constructor() {
    this.handlers = [];
  }

  use(fulfilled: (data: Response) => void, rejected: (err: Error) => void) {
    this.handlers.push({ fulfilled, rejected });
    // return this.handlers.length - 1;
  }
}

export default Interceptor;
