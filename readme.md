# Pokédex

This project is a simple web-based Pokédex using the PokéAPI. It displays the original 151 Pokémon, allows users to search for Pokémon by name, mark Pokémon as favorites, and filter the list to display only favorites.

## Features

- Display Pokémon Data: Fetch and display data for 151 Pokémon from the PokéAPI.
- Favorites: Mark/unmark Pokémon as favorites, with state saved in localStorage.
- Search: Search for Pokémon by name.
- View Favorites: Toggle between viewing all Pokémon and only favorites.

## Screenshot

![Screenshot 2024-10-16 at 14 07 45](https://github.com/user-attachments/assets/eb488abd-3f74-4e94-bb4f-91fe1bae1185)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/tauoms/pokedex.git
cd pokedex
```

2. Open the index.html file in your browser to start the application.

## How It Works

- Fetching Data: Pokémon data is fetched from the PokéAPI. Each Pokémon’s details, including height, weight, type, and sprite, are displayed in a card format.

```js
let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
```

- Favorites: Users can mark or unmark Pokémon as favorites by clicking the “Mark favorite” button. Favorites are stored using localStorage, allowing the app to remember favorites across sessions.
- Search: The search function uses a debounced input field to filter Pokémon by name.
- Toggle View: Users can toggle between viewing all Pokémon or just favorites by using the “Show Favorites” and “Show All” buttons.

## How to Use

- View Pokémon: The app will automatically display all 151 Pokémon on load.
- Search: Start typing a Pokémon’s name in the search bar to filter the list.
- Mark Favorites: Click on the “Mark favorite” button to save a Pokémon as a favorite. Click “Unmark favorite” to remove it.
- Show Favorites: Click the “Show Favorites” button to filter the view and show only your favorite Pokémon.
- Show All: Click the “Show All” button to return to the full list.

## Future Improvements

- Add pagination for larger Pokémon lists.
- Include more detailed Pokémon stats and abilities.
- Improve the UI/UX with enhanced styling and animations.
