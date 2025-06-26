export async function commandPokedex(state) {
    const caughtPokemon = Object.keys(state.pokedex);
    if (caughtPokemon.length === 0) {
        console.log("Your Pokedex is empty!");
        return;
    }
    console.log("Your Pokedex:");
    for (const pokemonName of caughtPokemon) {
        console.log(` - ${pokemonName}`);
    }
}
//# sourceMappingURL=pokedex.js.map