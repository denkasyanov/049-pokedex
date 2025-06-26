import { commandCatch } from "./commands/catch.js";
import { commandExit } from "./commands/exit.js";
import { commandExplore } from "./commands/explore.js";
import { commandHelp } from "./commands/help.js";
import { commandInspect } from "./commands/inspect.js";
import { commandMap, commandMapBack } from "./commands/map.js";
import { commandPokedex } from "./commands/pokedex.js";

import { State } from "./state.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the program",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Show all commands",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Show the map",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Show the map backwards",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore a location area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch a Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a caught Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Show all caught Pokemon",
      callback: commandPokedex,
    },
  };
}
