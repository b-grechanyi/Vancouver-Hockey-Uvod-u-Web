import { playersByTeam } from "./players.js";
import { state, setTeam, setFilter } from "./state.js";
import { renderPlayerCards, renderRosterCards } from "./ui.js";

const playerCardsContainer = document.querySelector("#player-cards");
const rosterCardsContainer = document.querySelector("#roster-cards");
const rosterFilterButtons = document.querySelectorAll(".roster-filter");

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

function getFilteredRoster() {
    if (state.filter === "all") {
        return currentRoster;
    }

    return currentRoster.filter((player) => {
        return player.position === state.filter;
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
            updateRosterDisplay();
        });
    });
}

initPlayerCards();
initRosterCards();
initRosterFilters();