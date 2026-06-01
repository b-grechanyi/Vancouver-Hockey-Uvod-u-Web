import { playersByTeam } from "./players.js";

const playerCardsContainer = document.querySelector("#player-cards");

function createParagraph(text, isBold = false) {
    const paragraph = document.createElement("p");

    if (isBold) {
        const boldText = document.createElement("b");
        boldText.textContent = text;
        paragraph.appendChild(boldText);
    } else {
        paragraph.textContent = text;
    }

    return paragraph;
}

function createPlayerCard(player) {
    const card = document.createElement("section");
    card.classList.add("player-card");

    const image = document.createElement("img");
    image.src = player.image;
    image.alt = player.alt;

    card.appendChild(image);
    card.appendChild(createParagraph(player.name, true));

    if (player.tagline) {
        card.appendChild(createParagraph(`(${player.tagline})`, true));
    }

    card.appendChild(createParagraph(player.season));
    card.appendChild(createParagraph(player.stat));
    card.appendChild(createParagraph(player.details));

    return card;
}

function showEmptyState(container) {
    const message = document.createElement("p");
    message.textContent = "No players to show yet.";
    container.appendChild(message);
}

function renderPlayerCards() {
    if (!playerCardsContainer) {
        return;
    }

    const team = playerCardsContainer.dataset.team;
    const players = playersByTeam[team] || [];

    playerCardsContainer.innerHTML = "";

    if (players.length === 0) {
        showEmptyState(playerCardsContainer);
        return;
    }

    players.forEach((player) => {
        playerCardsContainer.appendChild(createPlayerCard(player));
    });
}

renderPlayerCards();
