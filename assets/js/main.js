// constantes para limitar os path params da url 

function convertPokemonImageToLI(pokemonImage) {
    return pokemonImage.map((imageSlot) => `<img src="${imageSlot.sprites.front_default}" alt="${pokemon.name}">`)
}

function convertPokemonTypesToLI(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToLI(pokemon) {
    return `
    <li class="pokemon">
        <span class="number">#${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${convertPokemonTypesToLI(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </div>   
    </li>
    `
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLI).join('');
    

    // const listItems = [];
    // faz uma iteracao com o arquivo json da pokeAPI e converte cada elemento em formato determinado na funcao 
    // for (let i = 0; i < pokemons.length; i++) {
    //     const pokemon = pokemons[i];
    //     listItems.push(convertPokemonToListItem(pokemon))
    // }
    // console.log(listItems);
})