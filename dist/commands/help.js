export async function commandHelp(state) {
    console.log("\nWelcome to the Pokedex!");
    console.log("Usage:\n");
    for (const commandName in state.commands) {
        const command = state.commands[commandName];
        if (command) {
            console.log(`${commandName}: ${command.description}`);
        }
    }
}
//# sourceMappingURL=help.js.map