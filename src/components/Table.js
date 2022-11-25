import { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);

  const columnElements = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const [dataByName, setDataByName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    columnFilter: 'population',
    operatorFilter: 'maior que',
    valueFilter: '0',
  });
  const [numerics, setNumerics] = useState([]);

  const handleInput = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const filterClick = () => {
    setNumerics([...numerics, filters]);
  };
  // console.log(numerics);

  useEffect(() => {
    const filtered = () => {
      let planets = data;

      planets = data.filter((el) => el
        .name.toLowerCase().includes(dataByName.toLowerCase()));// colocando ambas em toLowerCase torna a pesquisa case insensitive

      numerics.forEach((el) => {
        if (el.operatorFilter === 'maior que') {
          planets = planets.filter(
            (planet) => (Number(planet[el.columnFilter] !== 'unknown')
            && Number(planet[el.columnFilter]) > Number(el.valueFilter)),
          );
        }
        if (el.operatorFilter === 'menor que') {
          planets = planets.filter(
            (planet) => (Number(planet[el.columnFilter] !== 'unknown'))
            && Number(planet[el.columnFilter]) < Number(el.valueFilter),
          );
        }
        if (el.operatorFilter === 'igual a') {
          planets = planets.filter(
            (planet) => (Number(planet[el.columnFilter] !== 'unknown')
            && Number(planet[el.columnFilter]) === Number(el.valueFilter)),
          );
        }
      });

      setFilteredData(planets);
    };
    filtered();
  }, [data, dataByName, numerics]); // trecho de código desenvolvido sob mentoria de Jaider Nunes

  return (
    <div>
      <form>
        <label
          htmlFor="seek"
        >
          <input
            name="name-filter"
            type="text"
            placeholder="enter key words"
            data-testid="name-filter"
            onChange={ (event) => setDataByName(event.target.value) }
          />
        </label>
        <label
          htmlFor="columnFilter"
        >
          Coluna
          <select
            data-testid="column-filter"
            name="columnFilter"
            value={ filters.columnFilter }
            onChange={ handleInput }
          >
            {
              columnElements.map((el) => (
                <option key={ el }>{el}</option>
              ))
            }
          </select>
        </label>
        <label
          htmlFor="operatorFilter"
        >
          Operador
          <select
            data-testid="comparison-filter"
            name="operatorFilter"
            value={ filters.operatorFilter }
            onChange={ handleInput }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label
          htmlFor="valueFilter"
        >
          <input
            id="valueFilter"
            name="valueFilter"
            type="number"
            data-testid="value-filter"
            placeholder="0"
            value={ filters.valueFilter }
            onChange={ handleInput }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterClick }
        >
          Filtrar
        </button>
        <div>
          {
            numerics.map((el, index) => (
              <p key={ `${el.columnFilter}-${index}` }>
                {`${el.columnFilter} 
                ${el.operatorFilter} ${el.valueFilter}`}
              </p>
            ))
          }
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((e) => (
              <tr key={ e.name }>
                <td>{ e.name }</td>
                <td>{ e.rotation_period }</td>
                <td>{ e.orbital_period }</td>
                <td>{ e.diameter }</td>
                <td>{ e.climate }</td>
                <td>{ e.gravity }</td>
                <td>{ e.terrain }</td>
                <td>{ e.surface_water }</td>
                <td>{ e.population }</td>
                <td>
                  {
                    e.films.map((film, index) => (
                      <p key={ index }>
                        { film }
                      </p>
                    ))
                  }
                </td>
                <td>{ e.created }</td>
                <td>{ e.edited }</td>
                <td>{ e.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
