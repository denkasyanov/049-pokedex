export type CacheEntry<T> = {
  value: T;
  createdAt: number;
};

export class Cache<T = unknown> {
  #cache = new Map<string, CacheEntry<T>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add(key: string, value: T) {
    this.#cache.set(key, {
      value,
      createdAt: Date.now(),
    });
  }

  get(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) {
      return undefined;
    }

    return entry.value;
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache) {
      if (now - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval / 2);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
