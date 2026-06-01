import { isFavorite } from "./state.js";

const FAVORITE_ICON = "../assets/icons/star_picked.png";
const NOT_FAVORITE_ICON = "../assets/icons/star-off.png";

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

export function createPlayerCard(player) {
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

export function showEmptyState(container) {
    const message = document.createElement("p");
    message.textContent = "No players to show yet.";
    container.appendChild(message);
}

export function renderPlayerCards(container, players) {
    container.innerHTML = "";

    if (players.length === 0) {
        showEmptyState(container);
        return;
    }

    players.forEach((player) => {
        const card = createPlayerCard(player);
        container.appendChild(card);
    });
}

export function createRosterCard(player) {
    const card = document.createElement("section");
    card.classList.add("roster-card");

    const image = document.createElement("img");
    image.src = player.image;
    image.alt = player.alt;

    const name = document.createElement("h3");
    name.textContent = player.name;

    const number = document.createElement("p");
    number.textContent = `#${player.number}`;

    const position = document.createElement("p");
    position.textContent = player.position;

    const stat = document.createElement("p");
    stat.textContent = player.stat;

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.classList.add("favorite-button");
    favoriteButton.dataset.playerName = player.name;

    const favoriteIcon = document.createElement("img");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.alt = "";

    if (isFavorite(player.name)) {
        favoriteButton.classList.add("active");
        favoriteButton.setAttribute("aria-label", `Remove ${player.name} from favourites`);
        favoriteIcon.src = FAVORITE_ICON;
    } else {
        favoriteButton.setAttribute("aria-label", `Add ${player.name} to favourites`);
        favoriteIcon.src = NOT_FAVORITE_ICON;
    }

    favoriteButton.appendChild(favoriteIcon);

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(number);
    card.appendChild(position);
    card.appendChild(stat);
    card.appendChild(favoriteButton);

    return card;
}

export function renderRosterCards(container, players) {
    container.innerHTML = "";

    if (players.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No roster players found.";
        container.appendChild(message);
        return;
    }

    players.forEach((player) => {
        const card = createRosterCard(player);
        container.appendChild(card);
    });
}

