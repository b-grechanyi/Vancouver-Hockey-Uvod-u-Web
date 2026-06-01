export const state = {
    team: "",
    filter: "all",
    query: "",
    favorites: []
};

export function setTeam(team) {
    state.team = team;
}

export function setFilter(filter) {
    state.filter = filter;
}

export function setQuery(query) {
    state.query = query;
}

export function setFavorites(favorites) {
    state.favorites = favorites;
}

export function addFavorite(playerName) {
    if (!state.favorites.includes(playerName)) {
        state.favorites.push(playerName);
    }
}

export function removeFavorite(playerName) {
    state.favorites = state.favorites.filter((favorite) => {
        return favorite !== playerName;
    });
}

export function isFavorite(playerName) {
    return state.favorites.includes(playerName);
}