
function convertPokemonToLI(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>   
    </li>
    `
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLI).join('');
})