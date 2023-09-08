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
            <li onclick="openStatsModal()" class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type-content type-backgroud ${type}">${type}</li>`).join('')}
                    </ol>
                    <!---
                    <ol class="stats">
                        ${pokemon.stats.map((stat) => `<li class="stat ${stat}">${stat}</li>`).join('')}
                    </ol>
                    --->
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                    <div class="stats-btn">!<!div>
                </div>   
            </li>
        `
        ).join('');
        pokemonList.innerHTML += newHtml;
    })
}
// INICÍO - chama os primeiros 12 (limit) pokemons
loadPokemonItens(offset, limit);

// BOTAO (EVENTO) - ao clicar no botao chama mais 12 (offset = offset + limit) pokemons
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

// JANELA MODAL (EVENTO) - ao clicar em cada pokemon, deverá abrir uma janela no centro da tela com os status
function openStatsModal() {
    const statsModal = document.getElementById("stats-modal");
    statsModal.classList.add("open-modal");

    statsModal.addEventListener("click", (event) => {
        if (event.target.id =="stat-close-btn" || event.target.id == "stats-modal") {
            statsModal.classList.remove("open-modal");
        }
    });
}

