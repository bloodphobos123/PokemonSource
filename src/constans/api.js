import axios from 'axios';

export default (offset = 1, limit = 10) => {
  return axios.create({baseURL: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`});
};
