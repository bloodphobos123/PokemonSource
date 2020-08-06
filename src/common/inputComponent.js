import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { useHistory } from 'react-router-dom';

const SearchComponent = () => {
  const [pocemonName, setPocemonName] = useState('');
  const [errTog, setErrTog] = useState(false);
  const history = useHistory();

  const handleClickGetSearchPocemonName = () => {
    setErrTog(false);
    if (pocemonName.length > 1) {
      axios.create({ baseURL: `https://pokeapi.co/api/v2/pokemon/${pocemonName.toLowerCase()}` }).get()
        .then((res) => {
          history.push(
            {
              pathname: `/pokemon/:${pocemonName}`,
              state: {
                personName: res.data.name,
                personImg: res.data.sprites.front_default,
                type: res.data.types,
                weight: res.data.weight,
                height: res.data.height,
                id: res.data.id
              },
            },
          );
        })
        .catch(() => setErrTog(true));
    } else {
      setErrTog(true);
    }
    setPocemonName('');
  };

  return (
    <>
      <div className="searchSection">
        <div className="searchSectionMain">
          <input type="text" className="searchInp" onChange={(e) => setPocemonName(e.target.value)} value={pocemonName} />
          <button type="button" className="searcButton" onClick={handleClickGetSearchPocemonName}>search pokemon </button>
        </div>
        <div className="errorMesage" style={{ display: errTog ? 'block' : 'none' }}>such a pokemon does not exist</div>
      </div>
    </>
  );
};

export default SearchComponent;
