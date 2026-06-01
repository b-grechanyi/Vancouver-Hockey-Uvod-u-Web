import { state, setFavorites, addFavorite, removeFavorite, isFavorite } from "./state.js";
import { renderRosterCards } from "./ui.js";

const rosterCardsContainer = document.querySelector("#roster-cards");

export function loadFavorites() {
    const saved = localStorage.getItem("favoritePlayers");
    if (saved) {
        setFavorites(JSON.parse(saved));
    }
}

export function saveFavorites() {
    localStorage.setItem("favoritePlayers", JSON.stringify(state.favorites));
}

export function initFavoriteButtons(getFilteredRoster) {
    if (!rosterCardsContainer) {
        return;
    }

    rosterCardsContainer.addEventListener("click", (event) => {
        const favoriteButton = event.target.closest(".favorite-button");

        if (!favoriteButton) {
            return;
        }

        const playerName = favoriteButton.dataset.playerName;

        if (isFavorite(playerName)) {
            removeFavorite(playerName);
        } else {
            addFavorite(playerName);
        }

        saveFavorites();
        renderRosterCards(rosterCardsContainer, getFilteredRoster());
    });
}