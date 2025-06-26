import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseUrl = "https://pokeapi.co/api/v2";
    #locationListCache;
    #locationAreaCache;
    #pokemonCache;
    constructor(cacheInterval) {
        this.#locationListCache = new Cache(cacheInterval);
        this.#locationAreaCache = new Cache(cacheInterval);
        this.#pokemonCache = new Cache(cacheInterval);
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseUrl}/location-area`;
        const cached = this.#locationListCache.get(url);
        if (cached) {
            return cached;
        }
        const response = await fetch(url);
        const data = (await response.json());
        const locationList = {
            locations: data.results ?? [],
            next: data.next,
            previous: data.previous,
        };
        this.#locationListCache.add(url, locationList);
        return locationList;
    }
    async fetchLocationArea(locationAreaName) {
        const url = `${PokeAPI.baseUrl}/location-area/${locationAreaName}`;
        const cached = this.#locationAreaCache.get(url);
        if (cached) {
            return cached;
        }
        const response = await fetch(url);
        const data = (await response.json());
        this.#locationAreaCache.add(url, data);
        return data;
    }
    async fetchPokemon(pokemonName) {
        const url = `${PokeAPI.baseUrl}/pokemon/${pokemonName}`;
        const cached = this.#pokemonCache.get(url);
        if (cached) {
            return cached;
        }
        const response = await fetch(url);
        const data = (await response.json());
        this.#pokemonCache.add(url, data);
        return data;
    }
    stopCaching() {
        this.#locationListCache.stopReapLoop();
        this.#locationAreaCache.stopReapLoop();
        this.#pokemonCache.stopReapLoop();
    }
}
//# sourceMappingURL=pokeapi.js.map