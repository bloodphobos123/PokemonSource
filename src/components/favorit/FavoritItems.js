import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import axios from 'axios';
import './style.scss';
import { useHistory } from 'react-router-dom';
import favorit from '../../assets/image/favorit.svg';
import favoritActive from '../../assets/image/favoritActive.svg';
import loader from '../../assets/image/loader.gif';

const FavoritItems = ({
  pokemonName, pokemonUrl, types, id,
}) => {
  const [imgUrl, setImgUrl] = useState('');
  const [togFav, setTogFav] = useState(false);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonId] = useState(id);
  const history = useHistory();
  useEffect(() => {
    setImgUrl(pokemonUrl);
    setPokemonType(types);
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
              id: res.data.id
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

  const ucFirst = (str) => {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }
  return (
    <div>
      <button
        type="button"
        className="favorit"
        style={{ backgroundImage: `url(${favIdActive.includes(pokemonId) ? favoritActive : favorit})` }}
        onClick={handleTogFav}
      />

      {imgUrl ? <img src={pokemonUrl} alt="pokemon" onClick={handleClick} className="heroesImg" /> : <img src={loader} alt="loader" className="heroesImg" /> }
      <div className="pokemonName">{ucFirst(pokemonName)}</div>
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

FavoritItems.propTypes = {
    pokemonName: PropTypes.string,
     pokemonUrl: PropTypes.string,
     types: PropTypes.array,
     id: PropTypes.number
}

export default FavoritItems;
