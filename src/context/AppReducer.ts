import {AppState, Pokemon} from '../interfaces/interfaces';

type AppAction =
  | {type: 'setSearchText'; payload: string}
  | {type: 'setPokemos'; payload: Pokemon[]}
  | {type: 'setSelectedPokemon'; payload: number | null}
  | {type: 'deletePokemon'; payload: number};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'setSearchText':
      return {
        ...state,
        searchText: action.payload
      };
    case 'setPokemos':
      return {
        ...state,
        pokemons: action.payload
      };
    case 'setSelectedPokemon':
      return {
        ...state,
        selectedPokemon: action.payload
      };
    case 'deletePokemon':
      return {
        ...state,
        pokemons: state.pokemons.filter((pokemon) => pokemon.id !== action.payload)
      };
    default:
      return state;
  }
};
