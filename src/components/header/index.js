import React from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  

  const handleClick = (value,name) => {
    history.push({ pathname: `/pokemonType/:${value}`, state: { type: value, name: name } });
  };

  const handleClickToFavorit = () => {
    history.push('/favorit');
  };
  return (
    <>
      <div className="pokemonTypes">
        <button
          type="button"
          value="1"
          className="typeNormal"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Normal"
        >
          Normal
        </button>
        <button
          type="button"
          value="2"
          className="type-fighting"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="fighting"
        >
          fighting
        </button>
        <button
          type="button"
          value="3"
          className="type-flying"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="flying"
        >
          flying
        </button>
        <button
          type="button"
          value="4"
          className="type-poison"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Poison"
        >
          poison
        </button>
        <button
          type="button"
          value="5"
          className="type-ground"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Ground"
        >
          Ground
        </button>
        <button
          type="button"
          value="6"
          className="type-rock"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Rock"
        >
          {' '}
          Rock
        </button>
        <button
          type="button"
          value="7"
          className="type-bug"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Bug"
        >
          Bug
        </button>
        <button
          type="button"
          value="8"
          className="type-ghost"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Ghost"
        >
          ghost
        </button>
        <button
          type="button"
          value="9"
          className="type-steel"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Steel"
        >
          Steel
        </button>
        <button
          type="button"
          value="10"
          className="type-fire"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Fire"
        >
          Fire
        </button>
        <button
          type="button"
          value="11"
          className="type-water"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="water"
        >
          water
        </button>
        <button
          type="button"
          value="12"
          className="type-grass"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="grass"
        >
          grass
        </button>
        <button
          type="button"
          value="13"
          className="type-electric"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="electric"
        >
          electric
        </button>
        <button
          type="button"
          value="14"
          className="type-psychic"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Psychic"
        >
          psychic
        </button>
        <button
          type="button"
          value="15"
          className="type-ice"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Ice"
        >
          ice
        </button>
        <button
          type="button"
          value="16"
          className="type-dragon"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Dragon"
        >
          dragon
        </button>
        <button
          type="button"
          value="17"
          className="type-dark"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Dark"
        >
          dark
        </button>
        <button
          type="button"
          value="18"
          className="type-fairy"
          onClick={(e) => handleClick(e.target.value,e.target.name)}
          name="Fairy"
        >
          Fairy
        </button>
        <button
          type="button"
          className="favoitBtn"
          onClick={handleClickToFavorit}
          name="Favorite"
        >
          Favorite
        </button>

      </div>
    </>
  );
};

export default Header;
