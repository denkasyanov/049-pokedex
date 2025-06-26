import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache(1000); // 1 second interval
  });

  afterEach(() => {
    cache.stopReapLoop();
  });

  it("should store and retrieve values", () => {
    cache.add("key1", "value1");
    cache.add("key2", { data: "test" });
    
    expect(cache.get("key1")).toBe("value1");
    expect(cache.get("key2")).toEqual({ data: "test" });
  });

  it("should return undefined for non-existent keys", () => {
    expect(cache.get("nonexistent")).toBeUndefined();
    
    cache.add("exists", "value");
    expect(cache.get("exists")).toBe("value");
    expect(cache.get("doesnotexist")).toBeUndefined();
  });

  it("should overwrite existing values with same key", () => {
    cache.add("key", "initial");
    expect(cache.get("key")).toBe("initial");
    
    cache.add("key", "updated");
    expect(cache.get("key")).toBe("updated");
  });

  it("should remove expired entries after interval", async () => {
    // Use fake timers for this test
    vi.useFakeTimers();
    
    // Create cache with 100ms interval
    const shortCache = new Cache(100);
    
    shortCache.add("key1", "value1");
    shortCache.add("key2", "value2");
    
    // Verify values exist
    expect(shortCache.get("key1")).toBe("value1");
    expect(shortCache.get("key2")).toBe("value2");
    
    // Advance time past the interval
    vi.advanceTimersByTime(150);
    
    // Values should be gone after reaping
    expect(shortCache.get("key1")).toBeUndefined();
    expect(shortCache.get("key2")).toBeUndefined();
    
    // Clean up
    shortCache.stopReapLoop();
    vi.useRealTimers();
  });
});
