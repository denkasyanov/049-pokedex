export function clearInput(input) {
    return input.split(/\s+/).filter(Boolean);
}
export async function startREPL(state) {
    state.repl.prompt();
    state.repl.on("line", async (input) => {
        const cleanedWords = clearInput(input);
        if (cleanedWords.length === 0) {
            state.repl.prompt();
            return;
        }
        const commandName = cleanedWords[0].toLowerCase();
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
//# sourceMappingURL=repl.js.map