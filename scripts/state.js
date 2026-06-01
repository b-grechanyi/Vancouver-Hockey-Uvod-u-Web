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