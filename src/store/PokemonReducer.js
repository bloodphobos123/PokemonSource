import { action, observable } from "mobx"
import request from '../constans/api'

const PokemonItems = observable.object({
    pokemon: [],
    get pokemonItems() {
        
      return `${this.age} ${this.name}`
    },
    
    getPokemon (pageNum,offset) {
      return  request(pageNum, offset).get()
    },

  }, {
    getPokemon: action
  })

  export default PokemonItems;
