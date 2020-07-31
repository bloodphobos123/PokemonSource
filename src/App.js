import React from 'react';
import { observer } from 'mobx-react';
import PokemonList from './components/pokemon/PokemonList';
import { Route, Switch } from 'react-router-dom';
import AboutPokemon from './components/AboutPokemon';
import Header from './components/header';
import PokemonTypeList from './components/PokemonType/PokemonTypeList';
import FavoritList from './components/favorit/FavoritList';
import PokemonFavorit from './store/PokemonFavorit';
import './style.scss';


const App = observer(({store, storeType})=> {
       return (
         <>
         <div className="App">
         <Header />
         <Switch>
        <Route exact path="/" render={()=><PokemonList props = {store} />} />
        <Route path="/favorit" render={()=><FavoritList PokemonFavorit={PokemonFavorit} />} />
        <Route path="/pokemon/:pocemonName" component={AboutPokemon} />
        <Route path="/pokemonType/:pocemonType" render={()=><PokemonTypeList props = {storeType} />} />
         </Switch>
         </div>
         </>
       );
   })


   export default App;
