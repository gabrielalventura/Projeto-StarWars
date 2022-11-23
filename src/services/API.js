const getData = async () => {
  try {
    const endpoint = 'https://swapi.dev/api/planets';
    const response = await fetch(endpoint);
    const datas = await response.json();
    // console.log(datas);
    const data = datas.results;
    const info = data.map((el) => {
      delete el.residents;
      return el;
    });
    delete info.residents;
    // console.log(data);
    return info;
  } catch (error) {
    throw new Error(error);
  }
};

export default getData;
