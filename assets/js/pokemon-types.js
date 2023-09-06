fetch('https://pokeapi.co/api/v2/type/')

  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(types => {
    const typesList = [];
    for (let i = 0; i < types.count; i++) {
        let type = types.results[i].name;
        // console.log(type);
        typesList.push(types.results[i].name);
    }

  })
  .catch(error => {
    console.error('Erro:', error);
  });