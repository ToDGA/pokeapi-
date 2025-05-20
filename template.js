function showRenderedPokemonMainData(i, pokemon, allTypes, pokeType) {
    return ` <div class="cards-layout shadow-lg p-3 mb-5 bg-body-tertiary rounded"> <!-- Bootstrap column for responsive card layout -->
                <div class="card text-center ${pokeType}" style="width: 18rem;" onclick="fetchPokemonCardData(${pokemon.id})">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" class="card-img-top" alt="${pokemon.name}"> 
                <div class="card-body">
                <h5 class="card-title">${capitalize(pokemon.name)}</h5> 
                <p class="card-text">ID: #${pokemon.id}</p> 
                <div>${allTypes}</div> 
               <div>HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</div>
               <div>AP: ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</div>
            </div>
        </div>
    </div>`;
}


function showPokemonModal(pokemonData) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="pokemonModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button id="leftBtn" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">zurück</span>
                        </button>
                        <h5 class="modal-title">${capitalize(pokemonData.name)}</h5>
                        <button id="rightBtn" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">weiter</span>
                        </button>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg" class="card-img-top" alt="${pokemonData.name}"
                        class="img-fluid mb-3">
                    </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modalRef').innerHTML = modalHTML;
        const modalElement = document.getElementById('pokemonModal');
        const modal = new bootstrap.Modal(modalElement);
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        leftBtn.addEventListener('click', () => {
            if (currentPokemonIndex > 0) {
                modal.hide();
                currentPokemonIndex = currentPokemonIndex - 1;
                fetchPokemonCardData(allPokemons[currentPokemonIndex].id);
            }
        });   
        rightBtn.addEventListener('click', () => {
            if (currentPokemonIndex < allPokemons.length - 1) {
                modal.hide();
                currentPokemonIndex = currentPokemonIndex + 1;
                fetchPokemonCardData(allPokemons[currentPokemonIndex].id);
            }
        });        
        modal.show();
}

function capitalize(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

