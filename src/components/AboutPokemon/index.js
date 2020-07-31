import React from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import LogoComponent from '../../common/logoComponent';

const AboutPokemon = () => {
  const location = useLocation();
  return (
    <>
      <div className="aboutPokemonMainSection">
        <div className="aboutPokemonHeader"><LogoComponent /></div>
        <div className="aboutHeroes">
          <div className="imgSection">
            {' '}
            <img className="aboutPersonage" src={location.state.personImg} alt="pokemon" />
            {' '}
          </div>
          <div className="infoSection">
            <div className="heroesName">
              <h1>
                {' '}
                {location.state.personName}
                {' '}
              </h1>
              {' '}
            </div>
            <div>National №</div>
            <div>
              Type
              {location.state.type.map((elem) => elem.type.name)}
            </div>
            <div>Species</div>
            <div>
              Height
              {location.state.height}
            </div>
            <div>
              Weight
              {location.state.weight}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPokemon;
