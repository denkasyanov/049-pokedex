import { describe, expect, test, vi, beforeEach } from "vitest";
import { commandExplore } from "./explore.js";
describe("commandExplore", () => {
    let mockState;
    let consoleLogSpy;
    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { });
        mockState = {
            api: {
                fetchLocationArea: vi.fn(),
            },
        };
    });
    test("should display error when no location area is provided", async () => {
        await commandExplore(mockState);
        expect(consoleLogSpy).toHaveBeenCalledWith("You need to provide a location area name!");
    });
    test("should display pokemon from location area", async () => {
        const mockLocationArea = {
            id: 1,
            name: "pastoria-city-area",
            game_index: 1,
            encounter_method_rates: [],
            location: { name: "pastoria-city", url: "https://pokeapi.co/api/v2/location/1/" },
            names: [],
            pokemon_encounters: [
                {
                    pokemon: { name: "tentacool", url: "https://pokeapi.co/api/v2/pokemon/72/" },
                    version_details: [],
                },
                {
                    pokemon: { name: "tentacruel", url: "https://pokeapi.co/api/v2/pokemon/73/" },
                    version_details: [],
                },
                {
                    pokemon: { name: "magikarp", url: "https://pokeapi.co/api/v2/pokemon/129/" },
                    version_details: [],
                },
            ],
        };
        vi.mocked(mockState.api.fetchLocationArea).mockResolvedValue(mockLocationArea);
        await commandExplore(mockState, "pastoria-city-area");
        expect(consoleLogSpy).toHaveBeenCalledWith("Exploring pastoria-city-area...");
        expect(consoleLogSpy).toHaveBeenCalledWith("Found Pokemon:");
        expect(consoleLogSpy).toHaveBeenCalledWith(" - tentacool");
        expect(consoleLogSpy).toHaveBeenCalledWith(" - tentacruel");
        expect(consoleLogSpy).toHaveBeenCalledWith(" - magikarp");
    });
    test("should handle duplicate pokemon", async () => {
        const mockLocationArea = {
            id: 1,
            name: "test-area",
            game_index: 1,
            encounter_method_rates: [],
            location: { name: "test", url: "https://pokeapi.co/api/v2/location/1/" },
            names: [],
            pokemon_encounters: [
                {
                    pokemon: { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
                    version_details: [],
                },
                {
                    pokemon: { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
                    version_details: [],
                },
            ],
        };
        vi.mocked(mockState.api.fetchLocationArea).mockResolvedValue(mockLocationArea);
        await commandExplore(mockState, "test-area");
        expect(consoleLogSpy).toHaveBeenCalledWith(" - pikachu");
        expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    });
    test("should display message when no pokemon found", async () => {
        const mockLocationArea = {
            id: 1,
            name: "empty-area",
            game_index: 1,
            encounter_method_rates: [],
            location: { name: "empty", url: "https://pokeapi.co/api/v2/location/1/" },
            names: [],
            pokemon_encounters: [],
        };
        vi.mocked(mockState.api.fetchLocationArea).mockResolvedValue(mockLocationArea);
        await commandExplore(mockState, "empty-area");
        expect(consoleLogSpy).toHaveBeenCalledWith("Exploring empty-area...");
        expect(consoleLogSpy).toHaveBeenCalledWith("No Pokemon found in this area.");
    });
    test("should handle API errors gracefully", async () => {
        vi.mocked(mockState.api.fetchLocationArea).mockRejectedValue(new Error("API Error"));
        await commandExplore(mockState, "invalid-area");
        expect(consoleLogSpy).toHaveBeenCalledWith("Exploring invalid-area...");
        expect(consoleLogSpy).toHaveBeenCalledWith("Failed to explore invalid-area");
    });
});
//# sourceMappingURL=explore.test.js.map