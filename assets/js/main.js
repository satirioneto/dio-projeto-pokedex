const pokemonList = document.getElementById("pokemonList");
const loadsMoreButton = document.getElementById("loadMoreButton");
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
        `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type-content type-backgroud ${type}">${type}</li>`).join('')}

                    </ol>
                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>   
            </li>
        `
        ).join('');
        pokemonList.innerHTML += newHtml;
    })
}
// INICÍO - chama os primeiros 12 (limit) pokemons
loadPokemonItens(offset, limit);

// EVENTO - ao clicar no botao chama mais 12 (offset = offset + limit) pokemons
loadsMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemonItens(offset, limit);
})

