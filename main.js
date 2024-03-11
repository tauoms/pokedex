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

let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0';

let pokemonsArr = [];


const fetchData = async () => {
    try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    pokemonsArr = json.results;
    pokemonsArr.forEach((pokemon) => {
        fetchPokemonData(pokemon); 
      });

    displayData(pokemonsArr);

    } catch (error) {
        console.error(error);
    }
    
} 

function fetchPokemonData(pokemon){
    let url = pokemon.url
      fetch(url)
      .then(response => response.json())
      .then(function(pokeData){
      console.log(pokeData)
      })
    }

fetchData();


const displayData = (data) => {
    const pokemonContainer = document.querySelector('#pokemonContainer');
    pokemonContainer.innerHTML = '' // Clear previous display data

    data.forEach ((pokemon) => {

        const pokemonCard = document.createElement('div');

        pokemonCard.innerHTML = `
        <h2>${pokemon.name}</h2>
        `;
        pokemonContainer.appendChild(pokemonCard);

    });

}

// SEARCH:

const searchPokemon = (searchTerm) => {
    const filteredData = pokemonsArr.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    displayData(filteredData);
}

document.querySelector('#search-pokemon').addEventListener('input', (e) => searchPokemon(e.target.value));