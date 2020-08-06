import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import  PropTypes  from 'prop-types';
import PokemonItems from './PokemonItems';
import request from '../../constans/api';
import './style.scss';
import SearchComponent from '../../common/inputComponent';
import loaderPokemon from '../../assets/image/loaderPokemon.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PokemonList = observer((props) => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [offsetPage, setOffsetPage] = useState(1);
  const [pocemonSearchName, setPocemonSearchName] = useState([]);
  const [favId, setFavId] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    props.props.getPokemon()
      .then((res) => {
        setPokemon(res.data.results);
      });
  }, [page]);

  useEffect(() => {
    if (localStorage.getItem('favoritId') !== null) {
      setFavId(localStorage.getItem('favoritId', []));
    } else {
      localStorage.setItem('favoritId', []);
    }
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.props.getPokemon(offsetPage, event.target.value)
      .then((res) => setPokemon(res.data.results));
  };

  const handlePagination = (e, page) => {
    if (page === 1) {
      setOffsetPage(page);
      props.props.getPokemon(1,rowsPerPage)
        .then((res) => {
          setPokemon(res.data.results);
        });
    } else {
      setOffsetPage(`${page}0`);
      props.props.getPokemon(`${page}0`,rowsPerPage)
        .then((res) => {
          setPokemon(res.data.results);
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
        <TablePagination
          component="div"
          count={100}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <div className="pokemList">
        {pokemon ? pokemon.map((elem) => (
          <div key={nanoid()} className="pokemonItems">
            <PokemonItems pokemonName={elem.name} pokemonUrl={elem.url} />
          </div>

        )) : <img src={loaderPokemon} alt="pokemon" />}
        <div className={classes.root}>
          <Pagination count={95} variant="outlined" shape="rounded" onChange={handlePagination} />
        </div>
      </div>
    </>
  );
});

PokemonList.propTypes  = {
  props: PropTypes.object
}

export default PokemonList;
