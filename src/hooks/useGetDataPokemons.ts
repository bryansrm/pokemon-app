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
    setLoading(true);
    const data = await getPokemonsService();
    if (data) {
      setDataPokemon(data);
      setPokemons(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDataPokemon(pokemons);
    if (!pokemons.length) {
      getPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  useEffect(() => {
    const pokemonsFilter = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText));
    setDataPokemon(pokemonsFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return {
    loading,
    dataPokemon,
    getPokemons
  };
};
