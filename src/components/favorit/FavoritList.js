import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FavoritItems from './FavoritItems';
import './style.scss';
import loaderPokemon from '../../assets/image/loaderPokemon.gif';
import LogoComponent from '../../common/logoComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const FavoritList = observer(({ PokemonFavorit }) => {
  const [pokemon, setPokemon] = useState([]);
  const [checkLocal, setCheckLocal] = useState([])
  

  useEffect(() => {
    const checkdLocalStorage = localStorage.getItem('favoritId')
    setCheckLocal(checkdLocalStorage ? JSON.parse(checkdLocalStorage) : [] )
    const favIdActive = checkdLocalStorage ? JSON.parse(localStorage.getItem('favoritId')) : [];
    favIdActive.forEach((element) => {
      PokemonFavorit.getPokemonFavorit(element)
        .then((res) => {
          setPokemon((prevState) => [...prevState, res.data]);
        });
    });
  }, []);

  
  return (
    <>
      <div className="favoritHeaderLogo">
        {' '}
        <LogoComponent />
        {' '}
      </div>
      <div className="favoritTitle">My Favorit</div>
        {pokemon.length ? "":<div className="dontPokemon">you don't have any favorites yet</div> }
      <div className="pokemList">
        {
          
        pokemon.length === checkLocal.length ? pokemon.map((elem) => (
          <div key={nanoid()} className="pokemonItems">
            <FavoritItems pokemonName={elem.name} pokemonUrl={elem.sprites.front_default} types={elem.types} id={elem.id} />
          </div>

        )) : <img src={loaderPokemon} alt="pokemon" />}
      </div>
    </>
  );
});

FavoritList.propTypes = {
  PokemonFavorit: PropTypes.object
}

export default FavoritList;
