export async function commandCatch(state, ...args) {
    if (args.length === 0) {
        console.log("You need to provide a Pokemon name!");
        return;
    }
    const pokemonName = args[0].toLowerCase();
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    try {
        const pokemon = await state.api.fetchPokemon(pokemonName);
        // Calculate catch probability based on base_experience
        // Higher base_experience = harder to catch
        // Base experience ranges from ~40 (easy) to ~300+ (legendary)
        // We'll use a formula that gives:
        // - 90% chance for base_exp <= 50
        // - 50% chance for base_exp ~= 100
        // - 20% chance for base_exp ~= 200
        // - 5% chance for base_exp >= 300
        const catchProbability = Math.max(0.05, Math.min(0.9, 1 - (pokemon.base_experience / 350)));
        const randomValue = Math.random();
        if (randomValue < catchProbability) {
            // Pokemon was caught!
            state.pokedex[pokemon.name] = pokemon;
            console.log(`${pokemon.name} was caught!`);
        }
        else {
            // Pokemon escaped!
            console.log(`${pokemon.name} escaped!`);
        }
    }
    catch (error) {
        console.log(`Failed to catch ${pokemonName}. Pokemon not found!`);
    }
}
//# sourceMappingURL=catch.js.map