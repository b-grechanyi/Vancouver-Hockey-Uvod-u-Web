import { playersByTeam } from "./players.js";
import { state, setTeam } from "./state.js";
import { renderPlayerCards } from "./ui.js";

const playerCardsContainer = document.querySelector("#player-cards");

function getCurrentPlayers() {
    return playersByTeam[state.team] || [];
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

initPlayerCards();