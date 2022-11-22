import { useEffect, useState, useMemo } from 'react';
import getData from '../services/API';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((result) => setData(result));
  }, []);

  const info = useMemo(() => ({
    data,
  }), [data]);

  return (
    <StarWarsContext.Provider value={ info }>
      {children}
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;
