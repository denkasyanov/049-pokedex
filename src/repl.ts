import { State } from "./state.js";

export function clearInput(input: string): string[] {
  return input.split(/\s+/).filter(Boolean);
}

export async function startREPL(state: State): Promise<void> {
  state.repl.prompt();

  state.repl.on("line", async (input: string) => {
    const cleanedWords = clearInput(input);

    if (cleanedWords.length === 0) {
      state.repl.prompt();
      return;
    }

    const commandName = cleanedWords[0]!.toLowerCase();
    const args = cleanedWords.slice(1);

    const command = state.commands[commandName];

    if (!command) {
      console.log(`Unknown command: ${commandName}`);
      state.repl.prompt();
      return;
    }

    await command.callback(state, ...args);

    state.repl.prompt();
  });
}
