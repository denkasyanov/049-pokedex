import { describe, expect, test, vi, beforeEach } from "vitest";
import { commandPokedex } from "./pokedex.js";
import type { State } from "../state.js";
import type { Pokemon } from "../pokeapi.js";

describe("commandPokedex", () => {
  let mockState: State;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mockState = { pokedex: {} } as State;
  });

  test("should show empty message when no Pokemon caught", async () => {
    await commandPokedex(mockState);
    expect(consoleLogSpy).toHaveBeenCalledWith("Your Pokedex is empty!");
  });

  test("should list all caught Pokemon names", async () => {
    mockState.pokedex = {
      pikachu: { name: "pikachu", base_experience: 112 } as Pokemon,
      charizard: { name: "charizard", base_experience: 240 } as Pokemon,
    };

    await commandPokedex(mockState);

    expect(consoleLogSpy).toHaveBeenCalledWith("Your Pokedex:");
    expect(consoleLogSpy).toHaveBeenCalledWith(" - pikachu");
    expect(consoleLogSpy).toHaveBeenCalledWith(" - charizard");
  });

  test("should display Pokemon names in the order they appear in the pokedex object", async () => {
    mockState.pokedex = {
      bulbasaur: { name: "bulbasaur" } as Pokemon,
      squirtle: { name: "squirtle" } as Pokemon,
      charmander: { name: "charmander" } as Pokemon,
    };

    await commandPokedex(mockState);

    const calls = consoleLogSpy.mock.calls.map(call => call[0]);
    const pokemonCalls = calls.filter(call => typeof call === 'string' && call.startsWith(" - "));
    
    expect(pokemonCalls).toEqual([" - bulbasaur", " - squirtle", " - charmander"]);
  });
});