import axios from 'axios';

export default (type = 1) => {
  return axios.create({baseURL: `https://pokeapi.co/api/v2/type/${type}`});
};
