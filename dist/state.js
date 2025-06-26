import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export function initState(cacheInterval) {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    return {
        commands: getCommands(),
        repl,
        api: new PokeAPI(cacheInterval),
        pokedex: {},
    };
}
//# sourceMappingURL=state.js.map