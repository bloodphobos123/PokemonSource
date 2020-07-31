import { action, observable } from "mobx"
import request from '../constans/apiTypePokemon'

const PokemonItemsType = observable.object({
    pokemon: [],
    get pokemonItems() {
        
      return `${this.age} ${this.name}`
    },
    
    getPokemonType (type) {
      return  request(type).get()
    },

  }, {
    getPokemonType: action
  })

  export default PokemonItemsType;
