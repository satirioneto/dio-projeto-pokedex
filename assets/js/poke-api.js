
const pokeApi = {};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    // o fetch tem processamento assincrono, ou seja, não é processado em tempo real, ele "promete" uma entrega de resultado
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.error(error))
}
