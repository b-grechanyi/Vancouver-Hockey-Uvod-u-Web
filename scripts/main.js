import { playersByTeam } from "./players.js";
import {
    state,
    setTeam,
    setFilter,
    setQuery,
    setFavorites,
    addFavorite,
    removeFavorite,
    isFavorite
} from "./state.js";
import { renderPlayerCards, renderRosterCards } from "./ui.js";

const playerCardsContainer = document.querySelector("#player-cards");
const rosterCardsContainer = document.querySelector("#roster-cards");
const rosterFilterButtons = document.querySelectorAll(".roster-filter");
const rosterSearchInput = document.querySelector("#roster-search-input");

let currentRoster = [];

function getCurrentPlayers() {
    return playersByTeam[state.team] || [];
}

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

function getFilterFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const position = params.get("position");

    if (position === "forward" || position === "defense" || position === "goalie") {
        return position;
    }

    return "all";
}

function updateUrlFilter(filter) {
    const url = new URL(window.location.href);

    if (filter === "all") {
        url.searchParams.delete("position");
    } else {
        url.searchParams.set("position", filter);
    }

    history.pushState({ filter: filter }, "", url);
}

function getFilteredRoster() {
    return currentRoster.filter((player) => {
        const matchesPosition =
            state.filter === "all" || player.position === state.filter;

        const matchesSearch = player.name
            .toLowerCase()
            .includes(state.query.toLowerCase());

        return matchesPosition && matchesSearch;
    });
}

function initRosterSearch() {
    if (!rosterSearchInput) {
        return;
    }

    rosterSearchInput.addEventListener("input", () => {
        setQuery(rosterSearchInput.value.trim());
        updateRosterDisplay();
    });
}

function updateActiveFilterButton() {
    rosterFilterButtons.forEach((button) => {
        if (button.dataset.filter === state.filter) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

function updateRosterDisplay() {
    const filteredRoster = getFilteredRoster();

    renderRosterCards(rosterCardsContainer, filteredRoster);
    updateActiveFilterButton();
}

function loadFavorites() {
    const savedFavorites = localStorage.getItem("favoritePlayers");

    if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
    }
}

function saveFavorites() {
    localStorage.setItem("favoritePlayers", JSON.stringify(state.favorites));
}


function initPlayerCards() {
    if (!playerCardsContainer) {
        return;
    }

    const team = playerCardsContainer.dataset.team;
    setTeam(team);

    const players = getCurrentPlayers();
    renderPlayerCards(playerCardsContainer, players);
}

async function initRosterCards() {
    if (!rosterCardsContainer) {
        return;
    }

    const team = rosterCardsContainer.dataset.team;
    setTeam(team);
    setFilter(getFilterFromUrl());

    rosterCardsContainer.textContent = "Loading roster...";

    try {
        const rostersByTeam = await loadRosters();
        currentRoster = rostersByTeam[state.team] || [];

        updateRosterDisplay();
    } catch (error) {
        rosterCardsContainer.textContent = "Could not load roster.";
        console.error(error);
    }
}

function initRosterFilters() {
    if (rosterFilterButtons.length === 0) {
        return;
    }

    rosterFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            setFilter(selectedFilter);
            updateUrlFilter(selectedFilter);
            updateRosterDisplay();
        });
    });
}

function initBrowserNavigation() {
    window.addEventListener("popstate", () => {
        setFilter(getFilterFromUrl());
        updateRosterDisplay();
    });
}

function initFavoriteButtons() {
    if (!rosterCardsContainer) {
        return;
    }

    rosterCardsContainer.addEventListener("click", (event) => {
        if (!event.target.classList.contains("favorite-button")) {
            return;
        }

        const playerName = event.target.dataset.playerName;

        if (isFavorite(playerName)) {
            removeFavorite(playerName);
        } else {
            addFavorite(playerName);
        }

        saveFavorites();
        updateRosterDisplay();
    });
}

loadFavorites();
initPlayerCards();
initRosterCards();
initRosterFilters();
initRosterSearch();
initFavoriteButtons();
initBrowserNavigation();