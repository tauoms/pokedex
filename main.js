let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

let pokemonsArr = [];
let onFavoritesPage = false;

const fetchData = async () => {
    try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);

    const fetches = await json.results.map((item) => {
        return fetch(item.url).then((res) => res.json());
      });
    Promise.all(fetches).then(data => {
        pokemonsArr = data;
        displayData(pokemonsArr);
        console.log(pokemonsArr);
    })

    } catch (error) {
        console.error(error);
    }
    
} 


fetchData();

const displayData = (data) => {
    const pokemonContainer = document.querySelector('#pokemonContainer');
    pokemonContainer.innerHTML = ''; // Clear previous display data

    data.forEach ((pokemon) => {
        const pokemonCard = document.createElement('div');
        const imageUrl = pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.other.dream_world.front_default;
        let types = pokemon.types.map(type => type.type.name).join(', ');

        const isFavorite = localStorage.getItem(pokemon.name) === 'true';
    const favoriteText = isFavorite ? 'Unmark favorite' : 'Mark favorite';

        pokemonCard.innerHTML = `
            <div class="idcircle">#${pokemon.id}</div>
            <img src="${imageUrl}">
            <h2>${pokemon.name}</h2>
            <p>
            Height: ${pokemon.height / 10} m<br>
            Weight: ${pokemon.weight / 10} kg<br>
            Type(s): ${types}
            </p>
            <button id="favButton" data-name="${pokemon.name}">${favoriteText}</button>
            `;
            pokemonContainer.appendChild(pokemonCard);
            })
            addFavorites();

        };

// SEARCH:

const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

const searchPokemon = debounce((searchTerm) => {
    const filteredData = pokemonsArr.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    displayData(filteredData);
}, 300);


// TOGGLE FAVORITE:

const toggleFavorite = (e) => {
    const pokemonName = e.target.getAttribute('data-name');
    const isFavorite = localStorage.getItem(pokemonName) === 'true';
    localStorage.setItem(pokemonName, !isFavorite);
  
    if (onFavoritesPage === true) {
      const favoritePokemons = pokemonsArr.filter((pokemon) => localStorage.getItem(pokemon.name) === 'true');
      displayData(favoritePokemons);
    } else {
      displayData(pokemonsArr);
    }
  }

 // ADD TO FAVORITES:
 
 const addFavorites = () => {
    document.
      querySelectorAll('#favButton').
      forEach(button => button.addEventListener('click', toggleFavorite));
  }

// EVENT LISTENERS:

document.querySelector('#search-pokemon').addEventListener('input', (e) => searchPokemon(e.target.value));

document.querySelector('#showFavorites').addEventListener('click', () => {
    const favoritePokemons = pokemonsArr.filter((pokemon) => localStorage.getItem(pokemon.name) === 'true');
    onFavoritesPage = true;
    displayData(favoritePokemons);
  });
  
  document.querySelector('#showAll').addEventListener('click', () => {
    onFavoritesPage = false;
    displayData(pokemons);
  });