// Ensure this file is a module
export {};

declare global {
  interface Array<T> {
    last(): T | undefined;
  }
}

// a non-destructive version of `pop`
Array.prototype.last = function <T>(): T | undefined {
  if (!this || this.length === 0) return undefined;
  return this[this.length - 1];
};

