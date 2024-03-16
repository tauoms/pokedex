// PROMISE VERSION:
// const fetchData = () => {
//     fetch('https://jsonplaceholder.typicode.com/posts') // Promise
//       .then((response) => response.json())
//       .then((json) => { 
//         displayData(json);
//         console.log(json);
//     });
// };

// ASYNC / AWAIT VERSION:

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
    pokemonContainer.innerHTML = '' // Clear previous display data

    data.forEach ((pokemon) => {
        const pokemonCard = document.createElement('div')
        let types = pokemon.types.map(type => type.type.name).join(', ');

                pokemonCard.innerHTML = `
                    <img src="${pokemon.sprites.other['official-artwork'].front_default}">
                    <h2>${pokemon.name}</h2>
                    <p>
                    ID: ${pokemon.id}<br>
                    Height: ${pokemon.height / 10} m<br>
                    Weight: ${pokemon.weight / 10} kg<br>
                    Type(s): ${types}
                    </p>
                    `;
                    pokemonContainer.appendChild(pokemonCard);
                    })
                    
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

document.querySelector('#search-pokemon').addEventListener('input', (e) => searchPokemon(e.target.value));