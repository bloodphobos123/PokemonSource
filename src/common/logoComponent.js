import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/image/logo.png';

const LogoComponent = () => {
  const history = useHistory();
  const handleHomePage = () => {
    history.push('/');
  };
  return (

    <button type="button" className="allPokemonBtn" onClick={handleHomePage}>
      <img src={logo} alt="logo" />
      All Pokemon
    </button>
  );
};

export default LogoComponent;
