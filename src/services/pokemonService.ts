import {appConfig} from '../config/config';
import {Pokemon} from '../interfaces/interfaces';

const url = appConfig.POKEMON_URL_API;

interface FormPokemonProps {
  name: string;
  image: string;
  attack: number;
  defense: number;
}

export const getPokemonsService = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${url}/?idAuthor=1`, {
    method: 'GET'
  });
  const data: Pokemon[] = await response.json();

  const dataSort = data?.sort((a, b) => b.id - a.id) || [];

  return dataSort;
};

export const getPokemonByIdService = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET'
  });
  const data: Pokemon = await response.json();

  return data;
};

export const createPokemonService = async (props: FormPokemonProps): Promise<Pokemon> => {
  const {name, image, attack, defense} = props;
  const body = {
    name,
    image,
    attack,
    defense,
    hp: 100,
    type: 'Desconocido',
    idAuthor: 1
  };
  const response = await fetch(`${url}/?idAuthor=1`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  const data: Pokemon = await response.json();

  return data;
};

export const updatePokemonService = async (id: number, dataForm: FormPokemonProps): Promise<Pokemon> => {
  const {name, image, attack, defense} = dataForm;
  const body = {
    name,
    image,
    attack,
    defense,
    hp: 100,
    type: 'Desconocido',
    idAuthor: 1
  };
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  const data: Pokemon = await response.json();

  return data;
};

export const deletePokemonService = async (id: number): Promise<{success: boolean}> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE'
  });
  const data: {success: boolean} = await response.json();

  return data;
};
