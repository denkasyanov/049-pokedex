import { type State } from "../state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("You need to provide a location area name!");
    return;
  }

  const locationAreaName = args[0]!;
  console.log(`Exploring ${locationAreaName}...`);

  try {
    const locationArea = await state.api.fetchLocationArea(locationAreaName);

    if (locationArea.pokemon_encounters.length === 0) {
      console.log("No Pokemon found in this area.");
      return;
    }

    console.log("Found Pokemon:");
    const uniquePokemon = new Set<string>();

    for (const encounter of locationArea.pokemon_encounters) {
      uniquePokemon.add(encounter.pokemon.name);
    }

    for (const pokemon of uniquePokemon) {
      console.log(` - ${pokemon}`);
    }
  } catch (error) {
    console.log(`Failed to explore ${locationAreaName}`);
  }
}
