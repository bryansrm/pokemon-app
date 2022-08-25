/* eslint-disable no-unused-vars */
import {createContext} from 'react';
import {AppState, Pokemon} from '../interfaces/interfaces';

export type AppContextProps = {
  appState: AppState;
  setSearchText: (query: string) => void;
  setPokemons: (pokemon: Pokemon[]) => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  deletePokemon: (id: number) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
