import axios from 'axios';

export default (id = 1) => {
  return axios.create({baseURL: `https://pokeapi.co/api/v2/pokemon/${id}`});
};
