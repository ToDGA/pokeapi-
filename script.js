const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const MAX_POKEMON = 20;
let allPokemons = [];
let currentPokemonIndex = 0;

async function fetchPokemonData() {
    let loadedPokemons = [];
    for (let i = offset + 1; i <= offset + MAX_POKEMON; i++) {
        let response = await fetch(`${BASE_URL}/${i}`);
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon ID: ${i}, Status: ${response.status}`);
        }
        let newResponse = await response.json();
        loadedPokemons.push(newResponse);
    }
    return loadedPokemons;
 }
 
 async function loadData() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';
    try {
        let loadedPokemons = await fetchPokemonData();
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
            .map(element => `<span class="badge bg-${element.type.name} text-dark fs-6">${element.type.name}</span>`)
            .join(' ');
        pokeCard.innerHTML += showRenderedPokemonMainData(i, pokemon, allTypes, pokeType);
        pokeCard.lastElementChild.addEventListener('click', () => {
            currentPokemonIndex = i; 
            showPokemonModal(allPokemons[i]); 
        });
    }
}

function fetchPokemonCardData(pokemonId) {
    const pokemon = allPokemons.find(p => p.id === pokemonId);
    if (pokemon) {
        currentPokemonIndex = allPokemons.indexOf(pokemon); 
        showPokemonModal(pokemon);
    } else {
        console.error('Pokémon not found in allPokemons:', pokemonId);
    }
}

function searchPokemon() {
    let input = document.getElementById('input').value.toLowerCase().trim();
    let pokeCard = document.getElementById('pokedex');
    if (input.length < 3) {
        pokeCard.innerHTML = input ? '<p>Please type at least 3 characters to search for a Pokémon.</p>' : '';
        if (!input) renderPokemons();
        return;
    }
    let matchingPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input));
    if (matchingPokemons.length > 0) renderSearch(matchingPokemons);
    else pokeCard.innerHTML = '<p>No Pokémon found with that name. Check your spelling, load more, and try again!</p>';
    document.getElementById('input').value ='';
}

function renderSearch(matchingPokemons) {
    let pokeCard = document.getElementById('pokedex');
    pokeCard.innerHTML = '';
    let tempAllPokemons = allPokemons; 
    allPokemons = matchingPokemons; 
    renderPokemons(); 
    allPokemons = tempAllPokemons; 
}

document.getElementById("searchbtn").addEventListener("click", function (event) {
    event.preventDefault();
});

function injectModalNavigation(modalHTML) {
    document.getElementById('modalRef').innerHTML = modalHTML;
    const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
    setupModalButton('leftBtn', -1, modal);
    setupModalButton('rightBtn', 1, modal);
    disableLeftBtn();
    disableRightBtn();
    modal.show();
}

function setupModalButton(buttonId, direction, modal) {
    document.getElementById(buttonId).addEventListener('click', () => {
        const nextIndex = currentPokemonIndex + direction;
        if (nextIndex >= 0 && nextIndex < allPokemons.length) {
            modal.hide();
            currentPokemonIndex = nextIndex;
            showPokemonModal(allPokemons[nextIndex]);
            disableLeftBtn();
            disableRightBtn();
        }
    });
}

function disableLeftBtn() {
    const leftBtn = document.getElementById('leftBtn');
    if (currentPokemonIndex < 1) {
        leftBtn.disabled = true;
    } else {
        leftBtn.disabled = false;
    }
}

function disableRightBtn(){
    const rightBtn = document.getElementById('rightBtn');
    if (currentPokemonIndex>= allPokemons.length - 1){
        rightBtn.disabled = true;
    }else{
        rightBtn.disabled = false;
    }
}


function cleanupExistingModals() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    document.body.classList.remove('modal-open');
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

