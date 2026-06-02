# Vancouver Hockey

Vancouver Hockey is a fansite about several ice hockey teams based in Vancouver, British Colombia, Canada. It includes team descriptions, history, roster and photos/videos.
It's a project for Uvod u Web course at University of Zadar.

## Pages

- `index.html` - Home page with the site introduction, personal background story, Vancouver Hockey branding and a JavaScript-rendered player highlight sidebar.
- `pages/canucks.html` - Vancouver Canucks team page with team information, history, image content, latest game highlight video, a JavaScript-rendered full roster and player highlight cards.
- `pages/goldeneyes.html` - Vancouver Goldeneyes team page with the same team-page structure: description, history, media, player highlights and interactive roster section.
- `pages/abbotsford.html` - Abbotsford Canucks team page with team-specific content, images, player highlights and interactive roster section.
- `pages/contact.html` - Contact page with a styled form, required fields, subject selection and JavaScript validation feedback.

## Features

- Multi-page static website
- Responsive layout for mobile and desktop
- Mobile hamburger navigation without JavaScript
- Modular JavaScript architecture using ES module imports and exports
- Shared JavaScript entry point (`scripts/main.js`) that initializes page features only when their required HTML elements exist
- Central state management for selected team, roster filter, search query and favourite players
- Dynamic player highlight cards generated from JavaScript data
- Full roster cards loaded asynchronously from `assets/data/rosters.json` with the Fetch API
- Roster search by player name
- Roster filters for all players, forwards, defense, goalies and favourites
- URL query parameters for roster filters, so filtered views can be linked and restored
- Browser back/forward support for roster filter changes with the History API
- Favourite player buttons with active states, accessible labels and star icons
- Favourite players saved in `localStorage` so choices persist after refreshing or reopening the site
- Contact form with labels, required fields, custom JavaScript validation, live success/error messages and form reset after successful submission
- CSS variables for colors, spacing, and reusable styling
- Basic accessibility features:
  - skip link
  - visible focus states
  - `alt` text for images
- Basic SEO:
  - page titles
  - meta descriptions
  - Open Graph tags

## Author
- Name: Berko Grechanyi
- Study program: Informacijske Tehnologije
- University: University of Zadar
- Course: Uvod u Web
- Academic year: 2025-2026

