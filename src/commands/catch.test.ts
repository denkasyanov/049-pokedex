import { describe, expect, test, vi, beforeEach } from "vitest";
import { commandCatch } from "./catch.js";
import type { State } from "../state.js";
import type { Pokemon } from "../pokeapi.js";

describe("commandCatch", () => {
  let mockState: State;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let mathRandomSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mathRandomSpy = vi.spyOn(Math, "random");
    
    mockState = {
      api: {
        fetchPokemon: vi.fn(),
      },
      pokedex: {},
    } as unknown as State;
  });

  test("should display error when no pokemon name is provided", async () => {
    await commandCatch(mockState);
    
    expect(consoleLogSpy).toHaveBeenCalledWith("You need to provide a Pokemon name!");
  });

  test("should catch pokemon with low base experience", async () => {
    const mockPokemon: Pokemon = {
      id: 25,
      name: "pikachu",
      base_experience: 50,
      height: 4,
      weight: 60,
      abilities: [],
      types: [{ slot: 1, type: { name: "electric", url: "" } }],
      sprites: {
        front_default: null,
        back_default: null,
        front_shiny: null,
        back_shiny: null,
      },
      stats: [],
    };

    vi.mocked(mockState.api.fetchPokemon).mockResolvedValue(mockPokemon);
    mathRandomSpy.mockReturnValue(0.5); // Should be caught with 90% probability

    await commandCatch(mockState, "pikachu");

    expect(consoleLogSpy).toHaveBeenCalledWith("Throwing a Pokeball at pikachu...");
    expect(consoleLogSpy).toHaveBeenCalledWith("pikachu was caught!");
    expect(mockState.pokedex["pikachu"]).toEqual(mockPokemon);
  });

  test("should fail to catch pokemon with high base experience", async () => {
    const mockPokemon: Pokemon = {
      id: 150,
      name: "mewtwo",
      base_experience: 306,
      height: 20,
      weight: 1220,
      abilities: [],
      types: [{ slot: 1, type: { name: "psychic", url: "" } }],
      sprites: {
        front_default: null,
        back_default: null,
        front_shiny: null,
        back_shiny: null,
      },
      stats: [],
    };

    vi.mocked(mockState.api.fetchPokemon).mockResolvedValue(mockPokemon);
    mathRandomSpy.mockReturnValue(0.5); // Should not be caught with ~12% probability

    await commandCatch(mockState, "mewtwo");

    expect(consoleLogSpy).toHaveBeenCalledWith("Throwing a Pokeball at mewtwo...");
    expect(consoleLogSpy).toHaveBeenCalledWith("mewtwo escaped!");
    expect(mockState.pokedex["mewtwo"]).toBeUndefined();
  });

  test("should handle medium difficulty pokemon appropriately", async () => {
    const mockPokemon: Pokemon = {
      id: 6,
      name: "charizard",
      base_experience: 100,
      height: 17,
      weight: 905,
      abilities: [],
      types: [{ slot: 1, type: { name: "fire", url: "" } }],
      sprites: {
        front_default: null,
        back_default: null,
        front_shiny: null,
        back_shiny: null,
      },
      stats: [],
    };

    vi.mocked(mockState.api.fetchPokemon).mockResolvedValue(mockPokemon);
    mathRandomSpy.mockReturnValue(0.75); // Should not be caught with ~71% probability

    await commandCatch(mockState, "charizard");

    expect(consoleLogSpy).toHaveBeenCalledWith("Throwing a Pokeball at charizard...");
    expect(consoleLogSpy).toHaveBeenCalledWith("charizard escaped!");
    expect(mockState.pokedex["charizard"]).toBeUndefined();
  });

  test("should normalize pokemon name to lowercase", async () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: "bulbasaur",
      base_experience: 64,
      height: 7,
      weight: 69,
      abilities: [],
      types: [{ slot: 1, type: { name: "grass", url: "" } }],
      sprites: {
        front_default: null,
        back_default: null,
        front_shiny: null,
        back_shiny: null,
      },
      stats: [],
    };

    vi.mocked(mockState.api.fetchPokemon).mockResolvedValue(mockPokemon);
    mathRandomSpy.mockReturnValue(0.5);

    await commandCatch(mockState, "BULBASAUR");

    expect(mockState.api.fetchPokemon).toHaveBeenCalledWith("bulbasaur");
    expect(consoleLogSpy).toHaveBeenCalledWith("Throwing a Pokeball at bulbasaur...");
    expect(consoleLogSpy).toHaveBeenCalledWith("bulbasaur was caught!");
  });

  test("should handle API errors gracefully", async () => {
    vi.mocked(mockState.api.fetchPokemon).mockRejectedValue(new Error("API Error"));

    await commandCatch(mockState, "invalid-pokemon");

    expect(consoleLogSpy).toHaveBeenCalledWith("Throwing a Pokeball at invalid-pokemon...");
    expect(consoleLogSpy).toHaveBeenCalledWith("Failed to catch invalid-pokemon. Pokemon not found!");
  });

  test("should not overwrite existing pokemon in pokedex", async () => {
    const existingPokemon: Pokemon = {
      id: 25,
      name: "pikachu",
      base_experience: 50,
      height: 4,
      weight: 60,
      abilities: [],
      types: [{ slot: 1, type: { name: "electric", url: "" } }],
      sprites: {
        front_default: null,
        back_default: null,
        front_shiny: null,
        back_shiny: null,
      },
      stats: [],
    };

    mockState.pokedex["pikachu"] = existingPokemon;

    const newPokemon: Pokemon = { ...existingPokemon, height: 5 };
    vi.mocked(mockState.api.fetchPokemon).mockResolvedValue(newPokemon);
    mathRandomSpy.mockReturnValue(0.1);

    await commandCatch(mockState, "pikachu");

    expect(consoleLogSpy).toHaveBeenCalledWith("pikachu was caught!");
    expect(mockState.pokedex["pikachu"]).toEqual(newPokemon);
  });
});