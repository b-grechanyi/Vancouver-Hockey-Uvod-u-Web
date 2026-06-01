import { state, setTeam, setFilter } from "./state.js";
import { renderRosterCards } from "./ui.js";

const rosterCardsContainer = document.querySelector("#roster-cards");
const rosterSearchInput = document.querySelector("#roster-search-input");

let currentRoster = [];

function getRosterDataPath() {
    const isInPagesFolder = window.location.pathname.includes("/pages/");
    return isInPagesFolder ? "../assets/data/rosters.json" : "assets/data/rosters.json";
}

async function loadRosters() {
    const response = await fetch(getRosterDataPath());

    if (!response.ok) {
        throw new Error("Could not load roster data.");
    }

    return await response.json();
}

export function getFilteredRoster(isFavorite) {
    return currentRoster.filter((player) => {
        const matchesPosition =
            state.filter === "all" ||
            player.position === state.filter ||
            (state.filter === "favorite" && isFavorite(player.name));

        const matchesSearch = player.name
            .toLowerCase()
            .includes(state.query.toLowerCase());

        return matchesPosition && matchesSearch;
    });
}

export function updateRosterDisplay(isFavorite) {
    renderRosterCards(rosterCardsContainer, getFilteredRoster(isFavorite));
}

export function initRosterSearch(isFavorite, setQuery) {
    if (!rosterSearchInput) {
        return;
    }

    rosterSearchInput.addEventListener("input", () => {
        setQuery(rosterSearchInput.value.trim());
        updateRosterDisplay(isFavorite);
    });
}

export async function initRosterCards(isFavorite, initialFilter) {
    if (!rosterCardsContainer) {
        return;
    }

    const team = rosterCardsContainer.dataset.team;
    setTeam(team);
    setFilter(initialFilter);

    rosterCardsContainer.textContent = "Loading roster...";

    try {
        const rostersByTeam = await loadRosters();
        currentRoster = rostersByTeam[state.team] || [];

        updateRosterDisplay(isFavorite);
    } catch (error) {
        rosterCardsContainer.textContent = "Could not load roster.";
        console.error(error);
    }
}