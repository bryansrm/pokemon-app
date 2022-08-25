import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {Pokemon} from '../interfaces/interfaces';
import {getPokemonsService} from '../services/pokemonService';

export const useGetDataPokemons = () => {
  const {appState, setPokemons} = useContext(AppContext);
  const {searchText, pokemons} = appState;
  const [loading, setLoading] = useState(false);
  const [dataPokemon, setDataPokemon] = useState<Pokemon[]>([]);

  const getPokemons = async () => {
    // console.log('entro');
    setLoading(true);
    const data = await getPokemonsService();
    if (data) {
      setDataPokemon(data);
      setPokemons(data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pokemons.length) {
      getPokemons();
    }
  }, [pokemons]);

  useEffect(() => {
    const pokemonsFilter = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText));
    setDataPokemon(pokemonsFilter);
  }, [searchText]);

  return {
    loading,
    dataPokemon
  };
};
