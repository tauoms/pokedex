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
    console.log(json);
    pokemonsArr = json.results;
    displayData(pokemonsArr);

    } catch (error) {
        console.error(error);
    }
    
} 

fetchData();

const displayData = (data) => {
    const postsContainer = document.querySelector('#postsContainer');
    postsContainer.innerHTML = '' // Clear previous display data

    data.forEach ((pokemon) => {
        const postElement = document.createElement('div');

        postElement.innerHTML = `
        <h2>${pokemon.name}</h2>
        `;
        postsContainer.appendChild(postElement);
    });

    console.log(pokemonsArr);

}

// SEARCH:


const displayResults = (data) => {
    const postsContainer = document.querySelector('#postsContainer');
    postsContainer.innerHTML = '' // Clear previous display data

    data.forEach ((pokemon) => {
        const postElement = document.createElement('div');

        postElement.innerHTML = `
        <h2>${pokemon.name}</h2>
        `;
        postsContainer.appendChild(postElement);
    });

}

const searchPokemon = (searchTerm) => {
    const filteredData = pokemonsArr.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    displayData(filteredData);
}

document.querySelector('#search-pokemon').addEventListener('input', (e) => searchPokemon(e.target.value));