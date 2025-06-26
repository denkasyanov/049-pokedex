import { describe, expect, test, vi, beforeEach } from "vitest";
import { commandInspect } from "./inspect.js";
describe("commandInspect", () => {
    let mockState;
    let consoleLogSpy;
    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { });
        mockState = {
            pokedex: {},
        };
    });
    test("should display error when no argument is provided", async () => {
        await commandInspect(mockState);
        expect(consoleLogSpy).toHaveBeenCalledWith("You need to provide a Pokemon name!");
    });
    test("should display message when Pokemon not caught", async () => {
        await commandInspect(mockState, "pikachu");
        expect(consoleLogSpy).toHaveBeenCalledWith("you have not caught that pokemon");
    });
    test("should display Pokemon details when caught", async () => {
        const mockPokemon = {
            id: 16,
            name: "pidgey",
            base_experience: 50,
            height: 3,
            weight: 18,
            abilities: [],
            types: [
                { slot: 1, type: { name: "normal", url: "" } },
                { slot: 2, type: { name: "flying", url: "" } }
            ],
            sprites: {
                front_default: null,
                back_default: null,
                front_shiny: null,
                back_shiny: null,
            },
            stats: [
                { base_stat: 40, effort: 0, stat: { name: "hp", url: "" } },
                { base_stat: 45, effort: 0, stat: { name: "attack", url: "" } },
                { base_stat: 40, effort: 0, stat: { name: "defense", url: "" } },
                { base_stat: 35, effort: 0, stat: { name: "special-attack", url: "" } },
                { base_stat: 35, effort: 0, stat: { name: "special-defense", url: "" } },
                { base_stat: 56, effort: 1, stat: { name: "speed", url: "" } },
            ],
        };
        mockState.pokedex.pidgey = mockPokemon;
        await commandInspect(mockState, "pidgey");
        expect(consoleLogSpy).toHaveBeenCalledWith("Name: pidgey");
        expect(consoleLogSpy).toHaveBeenCalledWith("Height: 3");
        expect(consoleLogSpy).toHaveBeenCalledWith("Weight: 18");
        expect(consoleLogSpy).toHaveBeenCalledWith("Stats:");
        expect(consoleLogSpy).toHaveBeenCalledWith("  -hp: 40");
        expect(consoleLogSpy).toHaveBeenCalledWith("  -attack: 45");
        expect(consoleLogSpy).toHaveBeenCalledWith("  -defense: 40");
        expect(consoleLogSpy).toHaveBeenCalledWith("  -special-attack: 35");
        expect(consoleLogSpy).toHaveBeenCalledWith("  -special-defense: 35");
        expect(consoleLogSpy).toHaveBeenCalledWith("  -speed: 56");
        expect(consoleLogSpy).toHaveBeenCalledWith("Types:");
        expect(consoleLogSpy).toHaveBeenCalledWith("  - normal");
        expect(consoleLogSpy).toHaveBeenCalledWith("  - flying");
    });
    test("should normalize input to lowercase", async () => {
        const mockPokemon = {
            id: 25,
            name: "pikachu",
            base_experience: 112,
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
            stats: [
                { base_stat: 35, effort: 0, stat: { name: "hp", url: "" } },
            ],
        };
        mockState.pokedex.pikachu = mockPokemon;
        await commandInspect(mockState, "PIKACHU");
        expect(consoleLogSpy).toHaveBeenCalledWith("Name: pikachu");
    });
    test("should handle Pokemon with single type", async () => {
        const mockPokemon = {
            id: 25,
            name: "pikachu",
            base_experience: 112,
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
        mockState.pokedex.pikachu = mockPokemon;
        await commandInspect(mockState, "pikachu");
        expect(consoleLogSpy).toHaveBeenCalledWith("Types:");
        expect(consoleLogSpy).toHaveBeenCalledWith("  - electric");
    });
});
//# sourceMappingURL=inspect.test.js.map