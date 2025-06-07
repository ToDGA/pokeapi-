function showRenderedPokemonMainData(i, pokemon, allTypes, pokeType) {
    return ` <div class="cards-layout shadow-lg p-3 mb-5 bg-body-tertiary rounded"> <!-- Bootstrap column for responsive card layout -->
                <div class="card text-center ${pokeType}" style="width: 18rem;" onclick="fetchPokemonCardData(${pokemon.id})">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" class="card-img-top" alt="${pokemon.name}"> 
                <div class="card-body">
                <h5 class="card-title">${capitalize(pokemon.name)}</h5> 
                <p class="card-text">ID: #${pokemon.id}</p> 
                <div>${allTypes}</div> 
               <div>HP: ${pokemon.stats.find(loopVariable => loopVariable.stat.name === 'hp').base_stat}</div>
               <div>AP: ${pokemon.stats.find(loopVariable => loopVariable.stat.name === 'attack').base_stat}</div>
            </div>
        </div>
    </div>`;
}

function showPokemonModal(clickedOnCard) { 
    const modalHTML = `<div class="modal fade" id="pokemonModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button id="leftBtn" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">back</span>
                        </button>
                        <h5 class="modal-title">${capitalize( clickedOnCard.name)}</h5>
                        <button id="rightBtn" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">next</span>
                        </button>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ clickedOnCard.id}.svg" class="card-img-top" alt="${clickedOnCard.name}"
                        class="img-fluid mb-3">
                    </div>
                      <div>HP: ${clickedOnCard.stats.find(loopVariable => loopVariable.stat.name === 'hp').base_stat}</div>
                         <div>AP: ${clickedOnCard.stats.find(loopVariable => loopVariable.stat.name === 'attack').base_stat}</div>
                          <div>KG: ${(clickedOnCard.weight*0.1).toFixed(1)}</div>
                         <div>Meter: ${(clickedOnCard.height*0.1).toFixed(1)}</div>  
                    </div>
                </div>
            </div>
        </div>`;

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
