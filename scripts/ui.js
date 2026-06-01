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