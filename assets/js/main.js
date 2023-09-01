// constantes para limitar os path params da url 
function convertPokemonToListItem(pokemon) {
    return `
    <li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                <li class="type">grass</li>
                <li class="type">poison</li>
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="${pokemon.name}">
        </div>   
    </li>
    `
}

const pokemonList = document.getElementById("pokemonList");

pokeApi.getPokemons().then((pokemons) => {
    const listItems = [];
    // faz uma iteracao com o arquivo json da pokeAPI e converte cada elemento em formato determinado na funcao 
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonToListItem(pokemon))
        // .innerHTML é uma propriedade que retorna um objeto na forma de html
        listItems.push(convertPokemonToListItem(pokemon))      
    }
    console.log(listItems);
})