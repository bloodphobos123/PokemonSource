import { action, observable } from "mobx"
import request from '../constans/apiFavorit'

const PokemonFavorit = observable.object({
    pokemon: [],
    
    getPokemonFavorit (id) {
      return  request(id).get()
    },

  }, {
    getPokemonFavorit: action
  })

  export default PokemonFavorit;
