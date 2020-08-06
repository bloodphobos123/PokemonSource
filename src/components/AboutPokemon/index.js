import React from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import LogoComponent from '../../common/logoComponent';

const AboutPokemon = () => {
  const location = useLocation();
  const ucFirst = (str) => {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }
  return (
    <>
    
      <div className="aboutPokemonMainSection">
        <div className="aboutPokemonHeader"><LogoComponent /></div>
        <div className="aboutHeroes">
        <div className="heroesName">    
                {' '}
                {ucFirst(location.state.personName)}
                {' '}
              {' '}
            </div>      
          <div className="imgSection">
            {' '}
            <img className="aboutPersonage" src={location.state.personImg} alt="pokemon" />
            {' '}
          </div>
          <div className="infoSection">
           
            <div className="pokemonInfoAbout"><div className="aboutInfoTitle">National №</div> {` ${location.state.id ? location.state.id : '' }`}</div>
            <div className="pokemonInfoAbout"><div className="aboutInfoTitle">Type</div> {` ${location.state.type.map((elem) => elem.type.name)}`} </div>
            <div className="pokemonInfoAbout"><div className="aboutInfoTitle">Height</div>{`  ${location.state.height}`}</div>
            <div className="pokemonInfoAbout"><div className="aboutInfoTitle">Weight</div> {` ${location.state.weight}`} </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPokemon;
