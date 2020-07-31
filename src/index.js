import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import PokemonItems from './store/PokemonReducer';
import PokemonItemsType from './store/PokemonTypes.js';
import {BrowserRouter } from "react-router-dom";





ReactDOM.render(
<BrowserRouter>
<App store={PokemonItems} storeType={PokemonItemsType} />
</BrowserRouter>
, document.getElementById('root'));

