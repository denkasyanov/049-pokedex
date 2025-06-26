export async function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.repl.close();
    process.exit(0);
}
//# sourceMappingURL=exit.js.map