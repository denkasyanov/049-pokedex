# Pokedex CLI

A TypeScript-based command-line Pokedex application that interfaces with the PokeAPI to simulate Pokemon catching and management.

## Features

- **Interactive REPL Interface**: Clean command-line interface with tab completion
- **Pokemon Management**: Catch, explore, and manage Pokemon in your personal Pokedex
- **Real-time API Integration**: Fetches live data from PokeAPI
- **Efficient Caching**: Built-in cache system to minimize API calls and improve performance
- **Type-safe Architecture**: Full TypeScript implementation with strict mode
- **Comprehensive Testing**: Unit tests with Vitest framework
- **Modular Design**: Clean separation of concerns with command pattern implementation

## Requirements

- Node.js 18+ (LTS recommended)
- pnpm or npm package manager

## Installation

### Using pnpm (Recommended)

```bash
# Clone the repository
git clone https://github.com/denkasyanov/049-pokedex.git
cd 049-pokedex

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Start the application
pnpm run dev
```

### Using npm

```bash
# Clone the repository
git clone https://github.com/denkasyanov/049-pokedex.git
cd 049-pokedex

# Install dependencies
npm install

# Build the project
npm run build

# Start the application
npm run dev
```

## Usage

Once started, you'll enter an interactive REPL with the following commands:

### Available Commands

- `help` - Display all available commands
- `exit` - Exit the Pokedex
- `catch <pokemon-name>` - Attempt to catch a Pokemon
- `explore <location-area>` - Explore an area for available Pokemon
- `map` - Display the next 20 location areas
- `mapb` - Display the previous 20 location areas
- `pokedex` - Show all caught Pokemon
- `inspect <pokemon-name>` - View detailed stats of a caught Pokemon

### Example Session

```bash
$ pnpm run dev
Welcome to the Pokedex!

pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!

pokedex > pokedex
Your Pokedex:
 - pikachu (Base EXP: 112)
Total Pokemon caught: 1

pokedex > exit
```

<details>
<summary>Click to see a more detailed example session</summary>

```bash
$ pnpm run dev
Welcome to the Pokedex!

pokedex > help
Available commands:
 - help: Display this help message
 - exit: Exit the Pokedex
 - catch <pokemon>: Catch a Pokemon (50% chance)
 - explore <area>: List Pokemon in a location area
 - map: Show next 20 location areas
 - mapb: Show previous 20 location areas
 - pokedex: Show all your caught Pokemon
 - inspect <pokemon>: View stats of a caught Pokemon

pokedex > map
 - canalave-city-area
 - eterna-city-area
 - pastoria-city-area
 - sunyshore-city-area
 - sinnoh-pokemon-league-area
 - oreburgh-mine-1f
 - valley-windworks-area
 - eterna-forest-area
 - fuego-ironworks-area
 - mt-coronet-1f-route-207
 - ... (20 areas total)

pokedex > explore eterna-forest-area
Exploring eterna-forest-area...
Found Pokemon:
 - buneary
 - gastly
 - hoothoot
 - wurmple
 - cascoon
 - silcoon
 - beautifly
 - dustox

pokedex > catch gastly
Throwing a Pokeball at gastly...
gastly escaped!

pokedex > catch gastly
Throwing a Pokeball at gastly...
gastly was caught!

pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!

pokedex > inspect gastly
Name: gastly
Height: 13
Weight: 1
Stats:
 - hp: 30
 - attack: 35
 - defense: 30
 - special-attack: 100
 - special-defense: 35
 - speed: 80
Types:
 - ghost
 - poison

pokedex > inspect charizard
You need to catch charizard first!

pokedex > pokedex
Your Pokedex:
 - gastly (Base EXP: 62)
 - pikachu (Base EXP: 112)
Total Pokemon caught: 2

pokedex > mapb
 - pallet-town-area
 - viridian-city-area
 - pewter-city-area
 - cerulean-city-area
 - vermilion-city-area
 - lavender-town-area
 - celadon-city-area
 - fuchsia-city-area
 - saffron-city-area
 - cinnabar-island-area
 - ... (20 areas total)

pokedex > exit
```

</details>

## Development

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run a specific test file
pnpm dlx vitest run src/commands/catch.test.ts
```

### Building

```bash
# TypeScript compilation
pnpm run build

# Watch mode for development
pnpm run build:watch
```

### Scripts Explained

- `pnpm run build` - Compiles TypeScript files from `src/` to JavaScript in `dist/`
- `pnpm run dev` - Builds the project and immediately runs the compiled application
- `pnpm run start` - Runs the previously compiled application from `dist/`
- `pnpm run test` - Executes the Vitest test suite


## License

MIT

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokemon data
- Built as a learning project to demonstrate TypeScript and CLI development skills
