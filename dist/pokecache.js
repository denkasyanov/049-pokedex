export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, value) {
        this.#cache.set(key, {
            value,
            createdAt: Date.now(),
        });
    }
    get(key) {
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
//# sourceMappingURL=pokecache.js.map