# Claude Code Instructions for Pokedex Project

## Project Overview
This is a TypeScript CLI application that simulates a Pokedex using the PokeAPI. The project uses:
- TypeScript with strict mode
- ES modules (use `.js` extensions in imports)
- Vitest for testing
- Node.js readline for REPL interface

## Step-by-Step Guide for Adding a New Command

### Step 1: Plan the Implementation
Before coding, create a TodoList with these items:
1. Add any new types/API methods if needed
2. Update State type if storing new data
3. Create command implementation file
4. Register command in commands.ts
5. Create comprehensive tests
6. Test manually with various inputs
7. Run all tests to ensure nothing breaks

### Step 2: API Integration (if needed)
If your command needs new API endpoints:

1. **Add types to `src/pokeapi.ts`** at the top with other types:
   ```typescript
   export type YourNewType = {
     id: number;
     name: string;
     // ... other fields from API
   };
   ```

2. **Add cache in PokeAPI class**:
   ```typescript
   #yourCache: Cache<YourType>;
   
   constructor(cacheInterval: number) {
     // ... existing caches
     this.#yourCache = new Cache<YourType>(cacheInterval);
   }
   ```

3. **Add fetch method**:
   ```typescript
   async fetchYourData(param: string): Promise<YourType> {
     const url = `${PokeAPI.baseUrl}/endpoint/${param}`;
     
     const cached = this.#yourCache.get(url);
     if (cached) {
       return cached;
     }
     
     const response = await fetch(url);
     const data = (await response.json()) as YourType;
     
     this.#yourCache.add(url, data);
     return data;
   }
   ```

4. **Update stopCaching()**:
   ```typescript
   stopCaching(): void {
     // ... existing caches
     this.#yourCache.stopReapLoop();
   }
   ```

### Step 3: State Management (if needed)
If your command needs to store data:

1. **Import type in `src/state.ts`**:
   ```typescript
   import { PokeAPI, type Pokemon, type YourNewType } from "./pokeapi.js";
   ```

2. **Add to State type**:
   ```typescript
   export type State = {
     // ... existing fields
     yourField: YourDataStructure;
   };
   ```

3. **Initialize in initState()**:
   ```typescript
   return {
     // ... existing fields
     yourField: {}, // or [], or initial value
   };
   ```

### Step 4: Command Implementation
Create `src/commands/yourcommand.ts`:

```typescript
import { type State } from "../state.js";

export async function commandYourName(state: State, ...args: string[]) {
  // 1. Validate arguments
  if (args.length === 0) {
    console.log("You need to provide a required argument!");
    return;
  }

  // 2. Process argument (normalize if needed)
  const param = args[0]!.toLowerCase();
  
  // 3. Show immediate feedback for async operations
  console.log(`Doing action with ${param}...`);

  try {
    // 4. Make API call or perform action
    const data = await state.api.fetchYourData(param);
    
    // 5. Process result (update state if needed)
    // state.yourField[param] = data;
    
    // 6. Show result to user
    console.log(`Success message!`);
  } catch (error) {
    // 7. Handle errors gracefully
    console.log(`Failed to action ${param}. Error message!`);
  }
}
```

### Step 5: Register Command
In `src/commands.ts`:

1. **Import at top (alphabetically)**:
   ```typescript
   import { commandYourName } from "./commands/yourcommand.js";
   ```

2. **Add to getCommands() (alphabetically)**:
   ```typescript
   yourcommand: {
     name: "yourcommand",
     description: "Brief description of command",
     callback: commandYourName,
   },
   ```

### Step 6: Create Tests
Create `src/commands/yourcommand.test.ts`:

```typescript
import { describe, expect, test, vi, beforeEach } from "vitest";
import { commandYourName } from "./yourcommand.js";
import type { State } from "../state.js";
import type { YourType } from "../pokeapi.js";

describe("commandYourName", () => {
  let mockState: State;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    
    mockState = {
      api: {
        fetchYourData: vi.fn(),
      },
      // Include any state fields your command uses
      yourField: {},
    } as unknown as State;
  });

  test("should display error when no argument is provided", async () => {
    await commandYourName(mockState);
    
    expect(consoleLogSpy).toHaveBeenCalledWith("You need to provide a required argument!");
  });

  test("should handle successful case", async () => {
    const mockData: YourType = {
      // ... mock data
    };

    vi.mocked(mockState.api.fetchYourData).mockResolvedValue(mockData);

    await commandYourName(mockState, "param");

    expect(consoleLogSpy).toHaveBeenCalledWith("Doing action with param...");
    expect(consoleLogSpy).toHaveBeenCalledWith("Success message!");
    // Add state verification if needed
  });

  test("should normalize input to lowercase", async () => {
    const mockData: YourType = { /* ... */ };
    vi.mocked(mockState.api.fetchYourData).mockResolvedValue(mockData);

    await commandYourName(mockState, "PARAM");

    expect(mockState.api.fetchYourData).toHaveBeenCalledWith("param");
  });

  test("should handle API errors gracefully", async () => {
    vi.mocked(mockState.api.fetchYourData).mockRejectedValue(new Error("API Error"));

    await commandYourName(mockState, "param");

    expect(consoleLogSpy).toHaveBeenCalledWith("Doing action with param...");
    expect(consoleLogSpy).toHaveBeenCalledWith("Failed to action param. Error message!");
  });

  // Add more tests for edge cases
});
```

### Step 7: Manual Testing

#### Build and Initial Test
```bash
# 1. Build to check for TypeScript errors
npm run build

# 2. Run your specific test file
npx vitest run src/commands/yourcommand.test.ts

# 3. Run all tests to ensure nothing broke
npm test
```

#### Interactive Testing
```bash
# Test single command with timing for async operations
(echo "yourcommand param"; sleep 2; echo "exit") | npm run dev

# Test multiple scenarios
(echo "yourcommand valid"; sleep 2; echo "yourcommand invalid"; sleep 2; echo "yourcommand"; sleep 1; echo "exit") | npm run dev | tee test.log
```


## Complete Example: Adding a "pokedex" Command

If you were to add a command that shows all caught Pokemon:

1. **Command file** `src/commands/pokedex.ts`:
```typescript
import { type State } from "../state.js";

export async function commandPokedex(state: State) {
  const caughtPokemon = Object.values(state.pokedex);
  
  if (caughtPokemon.length === 0) {
    console.log("Your Pokedex is empty! Catch some Pokemon first.");
    return;
  }
  
  console.log("Your Pokedex:");
  for (const pokemon of caughtPokemon) {
    console.log(` - ${pokemon.name} (Base EXP: ${pokemon.base_experience})`);
  }
  console.log(`Total Pokemon caught: ${caughtPokemon.length}`);
}
```

2. **Register in** `src/commands.ts`:
```typescript
import { commandPokedex } from "./commands/pokedex.js";
// ... other imports

pokedex: {
  name: "pokedex",
  description: "Show all caught Pokemon",
  callback: commandPokedex,
},
```

3. **Test file** `src/commands/pokedex.test.ts`:
```typescript
import { describe, expect, test, vi, beforeEach } from "vitest";
import { commandPokedex } from "./pokedex.js";
import type { State } from "../state.js";
import type { Pokemon } from "../pokeapi.js";

describe("commandPokedex", () => {
  let mockState: State;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mockState = { pokedex: {} } as State;
  });

  test("should show empty message when no Pokemon caught", async () => {
    await commandPokedex(mockState);
    expect(consoleLogSpy).toHaveBeenCalledWith("Your Pokedex is empty! Catch some Pokemon first.");
  });

  test("should list all caught Pokemon", async () => {
    mockState.pokedex = {
      pikachu: { name: "pikachu", base_experience: 112 } as Pokemon,
      charizard: { name: "charizard", base_experience: 240 } as Pokemon,
    };

    await commandPokedex(mockState);

    expect(consoleLogSpy).toHaveBeenCalledWith("Your Pokedex:");
    expect(consoleLogSpy).toHaveBeenCalledWith(" - pikachu (Base EXP: 112)");
    expect(consoleLogSpy).toHaveBeenCalledWith(" - charizard (Base EXP: 240)");
    expect(consoleLogSpy).toHaveBeenCalledWith("Total Pokemon caught: 2");
  });
});
```

## Common Commands to Remember
```bash
# Check TypeScript compilation
pnpm run build

# Run all tests
pnpm run test

# Run specific test file
pnpm dlx vitest run src/commands/catch.test.ts

# Check git status
git status

# See what would be committed
git diff --cached
```

## REPL Testing Pattern
For testing REPL commands that need specific output captured:
```bash
# Create output with proper timing
(echo "first command"; sleep 1; echo "second command"; sleep 1; echo "exit") | npm run dev | tee output.log
```

This ensures async operations complete before the next command runs.

## Final Checklist Before Completing Task
- [ ] All TypeScript compiles without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Manual testing shows expected output
- [ ] Error cases handled gracefully
- [ ] Command registered alphabetically
- [ ] Imports use `.js` extension
- [ ] No comments in code
- [ ] Arguments validated before use
- [ ] Async operations show immediate feedback
