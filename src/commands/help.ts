import { type State } from "../state.js";

export async function commandHelp(state: State) {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n");
  for (const commandName in state.commands) {
    const command = state.commands[commandName];
    if (command) {
      console.log(`${commandName}: ${command.description}`);
    }
  }
}
