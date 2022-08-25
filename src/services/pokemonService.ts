import {appConfig} from '../config/config';
import {Pokemon} from '../interfaces/interfaces';

const url = appConfig.POKEMON_URL_API;

export const getPokemonsService = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${url}/?idAuthor=1`, {
    method: 'GET'
  });
  const data: Pokemon[] = await response.json();

  return data;
};
