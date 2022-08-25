export interface Pokemon {
  id: number;
  name: string;
  image: string;
  attack: number;
  defense: number;
  hp: number;
  type: string;
  id_author: number;
}

export interface AppState {
  searchText: string;
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
}
