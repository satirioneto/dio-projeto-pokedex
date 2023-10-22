const pokemonList = document.getElementById("pokemonList");
const loadsMoreButton = document.getElementById("loadMoreButton");

const limit = 12;
let offset = 0;

const maxRecords = 151;


// ESTRUTURA HTML - cria a estrutura HTML com as informações obtidas da PokeAPI
function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
        `
            <li class="pokemon ${pokemon.type}" id="${pokemon.id}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type-content type-backgroud ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div> 
                <div>
                    <button 
                        onclick="openStatsModal()" 
                        class="pokemonInfo"
                        id=${pokemon.id}
                    >
                    Info
                    </button>
                </div>  
            </li>
        `
        ).join('');
        pokemonList.innerHTML += newHtml;

    })

}

loadPokemonItens(offset, limit);

loadsMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordInNextPage = offset + limit;
    // LIMITE DE EXIBICOES - condicional para limitar o número maximo de exibições
    if (qtdRecordInNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadsMoreButton.parentElement.removeChild(loadsMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

function openStatsModal() {
    const statsModal = document.getElementById("stats-modal");
    statsModal.classList.add("open-modal");



    statsModal.addEventListener("click", (event) => {
        if (event.target.id =="stat-close-btn") {
            statsModal.classList.remove("open-modal");
        }
    });
}

