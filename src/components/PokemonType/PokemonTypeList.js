import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import request from '../../constans/api';
import SearchComponent from '../../common/inputComponent';
import { useLocation } from 'react-router-dom';
import PokemonItems from './PokemonTypeItems';
import LogoComponent from '../../common/logoComponent';
import PropTypes from 'prop-types';

import './style.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PokemonTypeList = observer((props) => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pocemonSearchName, setPocemonSearchName] = useState([]);
  const [offsetPage, setOffsetPage] = useState(1);
  const [favId, setFavId] = useState([]);
  const [quantityItems, setQuantityItems] = useState(10);
  const location = useLocation();

  const classes = useStyles();

  useEffect(() => {
    props.props.getPokemonType(location.state.type)
      .then((res) => {
        setPokemon(res.data.pokemon.slice(0, 10));
      })
      .catch(()=> setPokemon([]))
  }, [location.state.type]);
  
  useEffect(() => {
    if (localStorage.getItem('favoritId') !== null) {
      setFavId(localStorage.getItem('favoritId'));
    } else {
      localStorage.setItem('favoritId', []);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    console.log(page)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setQuantityItems(event.target.value);
    const nextPage = +`${page}0` + quantityItems;
    props.props.getPokemonType(location.state.type)
      .then((res) => {
        setPokemon(res.data.pokemon.slice(+`${page}0`, nextPage));
      });
  };

  const handlePagination = (e, page) => {
    const nextPage = +`${page}0` + quantityItems;
    if(page === 1){
      setOffsetPage(page);
      props.props.getPokemonType(location.state.type,rowsPerPage)
        .then((res) => {
          setPokemon(res.data.pokemon.slice(+`${page}0`, nextPage));
        });
    }else {
      setOffsetPage(`${page}0`)
      props.props.getPokemonType(location.state.type,rowsPerPage)
        .then((res) => {
          setPokemon(res.data.pokemon.slice(+`${page}0`, nextPage));
        });
    }
  };

  const handleClickGetSearchPocemonName = (value) => {
    request(100, 200).get().then((res) => {
      setPocemonSearchName(res.data.results.filter((elem) => elem.name === value));
    });
  };
  return (
    <>
      <div className="headerPaginationSearch">
        <SearchComponent foo={handleClickGetSearchPocemonName} />
        <LogoComponent />
      </div>
      <div className="CategoryName">
        <div className="CategoryNameTitle">
        type:
        {location.state.name}
        </div>
      </div>
      <div className="pokemList">
        {pokemon.length ? pokemon.map((elem) => {
          return(
          <div key={nanoid()} className="pokemonItems">
            <PokemonItems
              pokemonName={elem.pokemon.name}
              pokemonUrl={elem.pokemon.url}
            />
          </div>

        )}) : <div className="noPokemon">
          There are no Pokemon on this page
              </div>}
        <div className={classes.root}>
          <Pagination
            count={8}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </div>
      </div>
    </>
  );
});

PokemonTypeList.propTypes = {
  props: PropTypes.object
}

export default PokemonTypeList;
