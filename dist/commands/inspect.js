export async function commandInspect(state, ...args) {
    if (args.length === 0) {
        console.log("You need to provide a Pokemon name!");
        return;
    }
    const pokemonName = args[0].toLowerCase();
    const pokemon = state.pokedex[pokemonName];
    if (!pokemon) {
        console.log("you have not caught that pokemon");
        return;
    }
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const type of pokemon.types) {
        console.log(`  - ${type.type.name}`);
    }
}
//# sourceMappingURL=inspect.js.map