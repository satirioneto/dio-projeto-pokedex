
const pokeApi = {}; //cria um objeto '{}' chamado de pokeApi

// convertPokeApiDetailToPokemon => converter as info da API em nossa classe Pokemon
function convertPokeApiDetailToPokemon (pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; // faz um destrutor da lista types, pegando cada item isolado
    
    pokemon.types = types;
    pokemon.type = type;

    const stats = pokemonDetail.stats.map((statsSlot) => {
        pokemon.stat = statsSlot.stat.name;
    })
    const [stat] = stats; 
    
    pokemon.stat = stat;// faz um destrutor da lista de stats, pegando cada item isolado

    
    pokemon.image = pokemonDetail.sprites.other["official-artwork"].front_default;

    pokemon.base_experience = pokemonDetail.base_experience;

    return pokemon;

}
// 
pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon);
}
// getPokemons => pega a lista de 50 pokemons e as informações para renderizar na tela
pokeApi.getPokemons = (offset = 0, limit = 50) => {
    
    let url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url) 
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetail) => pokemonsDetail);
}

// getPokemon => pega as informações de um pokemon específicado pelo ID
pokeApi.getPokemon = (pokemonId) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    
    return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon);
}