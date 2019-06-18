interface Timeout {
  start(callback: (next: Function) => void): void;
  cancel(): void;
  continue(): void;
  setInterval(interval: number): void;
  setContext(context: any): void;
}

declare function timeout(interval: number, context?: any): Timeout;

export = timeout;