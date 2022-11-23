import { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  const [dataByName, setDataByName] = useState('');

  const seekByName = data.filter((el) => el
    .name.toLowerCase().includes(dataByName.toLowerCase()));// colocando ambas em toLowerCase torna a pesquisa case insensitive

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
      </form>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rotation Period
            </th>
            <th>
              Orbital Period
            </th>
            <th>
              Diameter
            </th>
            <th>
              Climate
            </th>
            <th>
              Gravity
            </th>
            <th>
              Terrain
            </th>
            <th>
              Surface Water
            </th>
            <th>
              Population
            </th>
            <th>
              Films
            </th>
            <th>
              Created
            </th>
            <th>
              Edited
            </th>
            <th>
              URL
            </th>
          </tr>
        </thead>

        <tbody>
          {
            seekByName.map((e) => (
              <tr key={ e.name }>
                <td>
                  { e.name }
                </td>
                <td>
                  { e.rotation_period }
                </td>
                <td>
                  { e.orbital_period }
                </td>
                <td>
                  { e.diameter }
                </td>
                <td>
                  { e.climate }
                </td>
                <td>
                  { e.gravity }
                </td>
                <td>
                  { e.terrain }
                </td>
                <td>
                  { e.surface_water }
                </td>
                <td>
                  { e.population }
                </td>
                <td>
                  {
                    e.films.map((film, index) => (
                      <p key={ index }>
                        { film }
                      </p>
                    ))
                  }
                </td>
                <td>
                  { e.created }
                </td>
                <td>
                  { e.edited }
                </td>
                <td>
                  { e.url }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
