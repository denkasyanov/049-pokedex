import { Cache } from "./pokecache.js";

export type ShallowLocation = {
  name: string;
  url: string;
};

export type LocationList = {
  locations: ShallowLocation[];
  next?: string;
  previous?: string;
};

export type PokeAPILocationResponse = {
  results?: ShallowLocation[];
  next?: string;
  previous?: string;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
};

export type PokemonEncounter = {
  pokemon: {
    name: string;
    url: string;
  };
  version_details: Array<{
    encounter_details: Array<{
      chance: number;
      condition_values: Array<unknown>;
      max_level: number;
      method: {
        name: string;
        url: string;
      };
      min_level: number;
    }>;
    max_chance: number;
    version: {
      name: string;
      url: string;
    };
  }>;
};

export type LocationArea = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    language: {
      name: string;
      url: string;
    };
    name: string;
  }>;
  pokemon_encounters: PokemonEncounter[];
};

export class PokeAPI {
  private static readonly baseUrl = "https://pokeapi.co/api/v2";
  #locationListCache: Cache<LocationList>;
  #locationAreaCache: Cache<LocationArea>;
  #pokemonCache: Cache<Pokemon>;

  constructor(cacheInterval: number) {
    this.#locationListCache = new Cache<LocationList>(cacheInterval);
    this.#locationAreaCache = new Cache<LocationArea>(cacheInterval);
    this.#pokemonCache = new Cache<Pokemon>(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<LocationList> {
    const url = pageURL ?? `${PokeAPI.baseUrl}/location-area`;

    const cached = this.#locationListCache.get(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    const data = (await response.json()) as PokeAPILocationResponse;

    const locationList: LocationList = {
      locations: data.results ?? [],
      next: data.next,
      previous: data.previous,
    };
    
    this.#locationListCache.add(url, locationList);
    return locationList;
  }

  async fetchLocationArea(locationAreaName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseUrl}/location-area/${locationAreaName}`;
    
    const cached = this.#locationAreaCache.get(url);
    if (cached) {
      return cached;
    }
    
    const response = await fetch(url);
    const data = (await response.json()) as LocationArea;
    
    this.#locationAreaCache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseUrl}/pokemon/${pokemonName}`;
    
    const cached = this.#pokemonCache.get(url);
    if (cached) {
      return cached;
    }
    
    const response = await fetch(url);
    const data = (await response.json()) as Pokemon;
    
    this.#pokemonCache.add(url, data);
    return data;
  }
  
  stopCaching(): void {
    this.#locationListCache.stopReapLoop();
    this.#locationAreaCache.stopReapLoop();
    this.#pokemonCache.stopReapLoop();
  }
}
