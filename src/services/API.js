const getData = async () => {
  try {
    const endpoint = 'https://swapi.dev/api/planets';
    const response = await fetch(endpoint);
    const datas = await response.json();
    // console.log(datas);
    const data = datas.results;
    delete data.residents;
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getData;
