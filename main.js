let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

let pokemonsArr = [];
let onFavoritesPage = false;

const showFavBtn = document.querySelector('#showFavorites');
const showAllBtn = document.querySelector('#showAll');


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
        // console.log(pokemonsArr);
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
        let pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const isFavorite = localStorage.getItem(pokemon.name) === 'true';
        const favoriteText = isFavorite ? 'Unmark favorite' : 'Mark favorite';

        const isFavBg = isFavorite ? ' isFavorite' : '';

        pokemonCard.innerHTML = `
            <div class="idcircle">#${pokemon.id}</div>
            <img src="${imageUrl}">
            <h2>${pokeName}</h2>
            <p>
            Height: ${pokemon.height / 10} m<br>
            Weight: ${pokemon.weight / 10} kg<br>
            Type(s): ${types}
            </p>
            <button class="favButton${isFavBg}" data-name="${pokemon.name}">${favoriteText}</button>
            `;
            pokemonContainer.appendChild(pokemonCard);
            });
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
      const favoritesArr = pokemonsArr.filter((pokemon) => localStorage.getItem(pokemon.name) === 'true');
      displayData(favoritesArr);
    } else {
      displayData(pokemonsArr);
    }
  }

  // TOGGLE DISPLAYED BUTTON:

  const toggleButton = () => {
    if (onFavoritesPage === false) {
        showFavBtn.style.display = 'inline';
        showAllBtn.style.display = 'none';
    } else {
        showFavBtn.style.display = 'none';
        showAllBtn.style.display = 'inline';
    }
  }

 // ADD FAVORITES:
 
 const addFavorites = () => {
    document.
      querySelectorAll('.favButton').
      forEach(button => button.addEventListener('click', toggleFavorite));
  }

// SHOW FAVORITES

showFavBtn.addEventListener('click', () => {
    const favoritesArr = pokemonsArr.filter((pokemon) => localStorage.getItem(pokemon.name) === 'true');
    onFavoritesPage = true;
    toggleButton();
    displayData(favoritesArr);
  });
  

  // SHOW ALL:

 showAllBtn.addEventListener('click', () => {
    onFavoritesPage = false;
    toggleButton();
    displayData(pokemonsArr);
  });

  // SEARCH EVENT LISTENER:
document.querySelector('#search-pokemon').addEventListener('input', (e) => searchPokemon(e.target.value));