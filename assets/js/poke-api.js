
const pokeApi = {}; //cria um objeto '{}' chamado de pokeApi

function convertPokeApiDetailToPokemon (pokemonDetail) { // cria uma funcao para converter as info da API em nossa classe Pokemon
    const pokemon = new Pokemon(); // instancia a classe 'Pokemon' através do construtor 'new ClassName()' e salvo numa constante 
    pokemon.id = pokemonDetail.id; // salva nos parametros da classe 'Pokemon', as informacoes da PokeAPI
    pokemon.name = pokemonDetail.name;
    
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; // faz um destrutor da lista types, pegando cada item isolado
    
    pokemon.types = types;
    pokemon.type = type;

    pokemon.image = pokemonDetail.sprites.other["official-artwork"].front_default;

    return pokemon;

}

pokeApi.getPokemonsDetail = (pokemon) => { // salva uma chave nova dentro do objeto pokeApi (atraves de uma arrow function) as informacoes da pokeAPI
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 6) => { // outra chave adicionada ao objeto pokeApi
    
    const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`; // chama a PokeApi

    return fetch(url) // o fetch tem processamento assincrono, ou seja, não é processado em tempo real, ele "promete" uma entrega de resultado
        .then((response) => response.json()) // faz um 'promise' para transformar o 'response' em json
        .then((jsonBody) => jsonBody.results) // faz um 'primise' para pegar o jsonBody e obter seus results 
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetail) => pokemonsDetail); // com as informacoes de detalhes obtidas, retorna essas informacoes
}