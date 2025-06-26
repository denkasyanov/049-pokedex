export async function commandMap(state) {
    const { locations, next, previous } = await state.api.fetchLocations(state.nextLocationsUrl);
    state.nextLocationsUrl = next;
    state.prevLocationsUrl = previous;
    for (const location of locations) {
        console.log(location.name);
    }
}
export async function commandMapBack(state) {
    if (!state.prevLocationsUrl) {
        console.log("you're on the first page");
        return;
    }
    const { locations, next, previous } = await state.api.fetchLocations(state.prevLocationsUrl);
    state.nextLocationsUrl = next;
    state.prevLocationsUrl = previous;
    for (const location of locations) {
        console.log(location.name);
    }
}
//# sourceMappingURL=map.js.map