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
git clone https://github.com/yourusername/pokedex-cli.git
cd pokedex-cli

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
git clone https://github.com/yourusername/pokedex-cli.git
cd pokedex-cli

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
pokedex > explore pallet-town-area
Exploring pallet-town-area...
Found Pokemon:
 - caterpie
 - metapod
 - pidgey
 - rattata

pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!

pokedex > inspect pikachu
Name: pikachu
Height: 4
Weight: 60
Stats:
 - hp: 35
 - attack: 55
 - defense: 40
 - special-attack: 50
 - special-defense: 50
 - speed: 90
Types:
 - electric

pokedex > pokedex
Your Pokedex:
 - pikachu (Base EXP: 112)
Total Pokemon caught: 1

pokedex > exit
```

## Architecture

### Tech Stack

- **Language**: TypeScript with ES modules
- **Runtime**: Node.js
- **Testing**: Vitest
- **API**: PokeAPI v2
- **CLI**: Node.js readline interface

### Project Structure

```
├── src/
│   ├── commands/       # Individual command implementations
│   │   ├── catch.ts
│   │   ├── explore.ts
│   │   ├── help.ts
│   │   ├── inspect.ts
│   │   ├── map.ts
│   │   └── pokedex.ts
│   ├── cache.ts        # Caching system with TTL
│   ├── commands.ts     # Command registry
│   ├── main.ts         # Application entry point
│   ├── pokeapi.ts      # API client with type definitions
│   ├── repl.ts         # REPL implementation
│   └── state.ts        # Application state management
├── dist/               # Compiled JavaScript output
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project dependencies
└── CLAUDE.md          # Development guidelines
```

### Key Design Decisions

1. **Command Pattern**: Each command is isolated in its own module for maintainability
2. **State Management**: Centralized state object passed through command chain
3. **Cache Implementation**: Time-based cache with configurable TTL to reduce API load
4. **Type Safety**: Comprehensive TypeScript types for all API responses
5. **Error Handling**: Graceful error handling for network failures and invalid inputs

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

## Pros & Cons

### Pros

- **Educational**: Great for learning TypeScript, API integration, and CLI development
- **Extensible**: Easy to add new commands following the established pattern
- **Performance**: Efficient caching reduces API calls
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Testing**: Comprehensive test suite ensures reliability
- **Clean Code**: Modular architecture makes code easy to understand

### Cons

- **Limited Offline Support**: Requires internet connection for API calls
- **No Persistence**: Data is lost when application exits (by design)
- **Terminal Only**: No GUI interface
- **Rate Limiting**: Subject to PokeAPI rate limits

## Future Enhancements

- Data persistence with SQLite or JSON file storage
- Battle system implementation
- Pokemon team management
- Trading simulation
- Advanced search and filtering
- Colorized terminal output
- Progress indicators for long-running operations

## Contributing

This project follows clean code principles and comprehensive testing. When adding new features:

1. Follow the command pattern in `src/commands/`
2. Add comprehensive tests
3. Update types in `pokeapi.ts` if adding new API endpoints
4. Maintain the existing code style
5. Ensure all tests pass before submitting

## License

MIT

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokemon data
- Built as a learning project to demonstrate TypeScript and CLI development skills