import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import './style.scss';
import { useHistory } from 'react-router-dom';
import favorit from '../../assets/image/favorit.svg';
import favoritActive from '../../assets/image/favoritActive.svg';
import loader from '../../assets/image/loader.gif';
import PropTypes from 'prop-types';

const PokemonTypeItems = ({ pokemonName, pokemonUrl }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [togFav, setTogFav] = useState(false);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonId, setPokemonId] = useState();
  const history = useHistory();
  useEffect(() => {
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((json) => {
        setPokemonId(json.id);
        setPokemonType(json.types);
        setImgUrl(json.sprites.front_default);
      });
  }, []);
  const favIdActive = localStorage.getItem('favoritId');
  const handleClick = () => {
    axios.create({ baseURL: `https://pokeapi.co/api/v2/pokemon/${pokemonName}` }).get()
      .then((res) => {
        history.push(
          {
            pathname: `/pokemon/:${pokemonName}`,
            state: {
              personName: res.data.name,
              personImg: res.data.sprites.front_default,
              type: res.data.types,
              weight: res.data.weight,
              height: res.data.height,
            },
          },
        );
      });
  };

  const handleTogFav = () => {
    setTogFav(!togFav);
    if (favIdActive.includes(pokemonId)) {
      const jsonUsers = localStorage.getItem('favoritId');
      const users = jsonUsers ? JSON.parse(jsonUsers) : [];
      const newUser = users.filter((elem) => elem !== pokemonId);
      localStorage.setItem('favoritId', JSON.stringify(newUser));
    } else {
      const jsonUsers = localStorage.getItem('favoritId');
      const users = jsonUsers ? JSON.parse(jsonUsers) : [];
      users.push(pokemonId);
      localStorage.setItem('favoritId', JSON.stringify(users));
    }
  };
  return (
    <div>
      <button
        type="button"
        className="favorit"
        style={{ backgroundImage: `url(${favIdActive.includes(pokemonId) ? favoritActive : favorit})` }}
        onClick={handleTogFav}
      />
      {imgUrl ? <img src={imgUrl} alt="pokemon" onClick={handleClick} className="heroesImg" /> : <img src={loader} alt="loader" className="heroesImg" /> }

      <div className="pokemonName">{pokemonName}</div>
      <div className="pokemontype">
        {
             pokemonType.map((elem) => (
               <div
                 key={nanoid()}
                 className={elem.type.name === 'grass' ? 'pokemontype_items_grass' : elem.type.name === 'poison' ? 'pokemontype_items_poision' : elem.type.name === 'fire' ? 'pokemontype_items_fire' : elem.type.name === 'water' ? 'pokemontype_items_water' : elem.type.name === 'flying' ? 'pokemontype_items_flying' : 'pokemontype_items_bug'}
               >
                 {elem.type.name}
               </div>
             ))
         }
      </div>

    </div>
  );
};

PokemonTypeItems.propTypes = {
  pokemonName: PropTypes.string,
  pokemonUrl: PropTypes.string
}

export default PokemonTypeItems;
