import { setFilter, state } from "./state.js";
import { updateRosterDisplay } from "./roster.js";

const rosterFilterButtons = document.querySelectorAll(".roster-filter");

export function getFilterFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const position = params.get("position");

    if (
        position === "forward" ||
        position === "defense" ||
        position === "goalie" ||
        position === "favorite"
    ) {
        return position;
    }

    return "all";
}

export function updateUrlFilter(filter) {
    const url = new URL(window.location.href);

    if (filter === "all") {
        url.searchParams.delete("position");
    } else {
        url.searchParams.set("position", filter);
    }

    history.pushState({ filter }, "", url);
}

export function updateActiveFilterButton() {
    rosterFilterButtons.forEach((button) => {
        if (button.dataset.filter === state.filter) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

export function initRosterFilters(isFavorite) {
    if (rosterFilterButtons.length === 0) {
        return;
    }

    updateActiveFilterButton();

    rosterFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            setFilter(selectedFilter);
            updateUrlFilter(selectedFilter);
            updateRosterDisplay(isFavorite);
            updateActiveFilterButton();
        });
    });
}

export function initBrowserNavigation(isFavorite) {
    window.addEventListener("popstate", () => {
        setFilter(getFilterFromUrl());
        updateRosterDisplay(isFavorite);
        updateActiveFilterButton();
    });
}
