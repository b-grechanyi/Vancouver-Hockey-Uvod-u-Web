import { isFavorite, setQuery } from "./state.js";
import { initPlayerCards } from "./players.js";
import { getFilteredRoster, initRosterCards, initRosterSearch } from "./roster.js";
import { initRosterFilters, initBrowserNavigation, getFilterFromUrl } from "./filters.js";
import { loadFavorites, initFavoriteButtons } from "./favorites.js";
import { initContactForm } from "./form.js";

loadFavorites();
initPlayerCards();
initRosterCards(isFavorite, getFilterFromUrl());
initRosterSearch(isFavorite, setQuery);
initRosterFilters(isFavorite);
initFavoriteButtons(() => getFilteredRoster(isFavorite));
initBrowserNavigation(isFavorite);
initContactForm();
