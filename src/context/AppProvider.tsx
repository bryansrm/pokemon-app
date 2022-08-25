import React, {useReducer} from 'react';
import {AppState, Pokemon} from '../interfaces/interfaces';
import {AppContext} from './AppContext';
import {appReducer} from './AppReducer';

interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: AppState = {
  searchText: '',
  pokemons: [],
  selectedPokemon: null
};

export const AppProvider = ({children}: props) => {
  const [appState, dispatch] = useReducer(appReducer, INITIAL_STATE, undefined);

  const setSearchText = (query: string) => {
    dispatch({type: 'setSearchText', payload: query});
  };

  const setPokemons = (sellers: Pokemon[]) => {
    dispatch({type: 'setPokemos', payload: sellers});
  };

  const setSelectedPokemon = (id: number | null) => {
    dispatch({type: 'setSelectedPokemon', payload: id});
  };

  const deletePokemon = (id: number) => {
    dispatch({type: 'deletePokemon', payload: id});
  };

  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        appState,
        setSearchText,
        setPokemons,
        setSelectedPokemon,
        deletePokemon
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
