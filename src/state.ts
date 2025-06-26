import { createInterface, type Interface } from "readline";

import { CLICommand, getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type State = {
  commands: Record<string, CLICommand>;
  repl: Interface;
  api: PokeAPI;
  nextLocationsUrl?: string;
  prevLocationsUrl?: string;
  pokedex: Record<string, Pokemon>;
};

export function initState(cacheInterval: number): State {
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
