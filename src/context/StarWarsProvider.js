import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
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

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
