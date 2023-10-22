
const modalContent =  document.getElementById("stats-modal");

function loadMoreInfo(pokemonId) {
    pokemonInfo = pokeApi.getPokemon(pokemonId).then((pokemon) => {
        const pokemonInfo = 
            `        
            <div class="stat-modal ${pokemon.type}">
                <button class="stat-close-btn" id="stat-close-btn">x</button>
                <span class="name">#${pokemon.id} - ${pokemon.name}</span>
                <div class="detail">
                    <ol class="stats">
                        ${pokemon.stats.map((stat) => 
                            `<li class="stat-bar ${stat}">${stat}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
                <div>
                    <ul>
                        <li>${pokemon.base_experience}</li>
                    </ul>
                </div>
            </div>
            `
            modalContent.innerHTML = pokemonInfo;
    })
}

loadMoreInfo(4);
