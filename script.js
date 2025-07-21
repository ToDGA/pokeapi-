const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0; 
const MAX_POKEMON = 20; 
let allPokemons = [];
let currentPokemonIndex = 0 ;

async function loadData() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex'; 
    let loadedPokemons = []; 
    try {
        for (let i = offset + 1; i <= offset + MAX_POKEMON; i++) {
            let response = await fetch(`${BASE_URL}/${i}`);
            if (!response.ok) {
                throw new Error(`Error fetching Pokémon ID: ${i}, Status: ${response.status}`);
            }
            let newResponse = await response.json();
            loadedPokemons.push(newResponse);
        }

        offset += MAX_POKEMON;
        allPokemons = allPokemons.concat(loadedPokemons);

    } catch (error) {
        console.error('Error loading Pokémon data:', error);

    } finally {
    loadingScreen.style.display = 'none'; 
    renderPokemons();
}

}

function renderPokemons() {
    let pokeCard = document.getElementById('pokedex'); 
    pokeCard.innerHTML = ''; 
    for (let i = 0; i < allPokemons.length; i++) {
        let pokemon = allPokemons[i]; 
        let pokeType = pokemon.types[0]?.type.name; 
        let allTypes = pokemon.types
            .map(element => `<span class="badge bg-${element.type.name}">${element.type.name}</span>`)
            .join(' ');
        pokeCard.innerHTML += showRenderedPokemonMainData(i, pokemon, allTypes, pokeType);
        let card = pokeCard.lastElementChild;
        card.addEventListener('click', ()=> {
            currentPokemonIndex = i;
            fetchPokemonCardData(pokemon.id)});
    }
}

function fetchPokemonCardData(pokemonId) {
    fetch(`${BASE_URL}/${pokemonId}`)
        .then(response => response.json())
        .then(fetchedDetailsOfOnePokemon => {
            showPokemonModal(fetchedDetailsOfOnePokemon);
        });
}

function searchPokemon() {
    let input = document.getElementById('input').value.toLowerCase().trim();
    if (input !== "") {
        let index = allPokemons.findIndex(pokemon =>pokemon.name.toLowerCase().includes(input));
        if (index !== -1) {
            renderSearch(index);
        } else {
            let pokeCard = document.getElementById('pokedex');
            pokeCard.innerHTML = '<p>There is no Pokémon with that name. Check your spelling, load more and try again!</p>';
        }
    } else {
        renderPokemons();
    }
}

function renderSearch(index) {
    let pokeCard = document.getElementById('pokedex');
    pokeCard.innerHTML = ''; 
    let pokemon = allPokemons[index];
    let pokeType = pokemon.types[0]?.type.name;
    let allTypes = pokemon.types
        .map(element => `<span class="badge bg-${element.type.name}">${element.type.name}</span>`)
        .join(' ');
    pokeCard.innerHTML += showRenderedPokemonMainData(index, pokemon, allTypes, pokeType);
    let card = pokeCard.lastElementChild;
    card.addEventListener('click', () => {
        currentPokemonIndex = index;
        fetchPokemonCardData(pokemon.id);
    });
}

document.getElementById("searchbtn").addEventListener("click", function (event){
    event.preventDefault();
});


