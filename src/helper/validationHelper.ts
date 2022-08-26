type FormPokemonProps = {
  name: string;
  image: string;
  attack: number;
  defense: number;
};

export const validateFormPokemon = (data: FormPokemonProps): boolean => {
  const values = Object.values(data);
  let resp = true;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const value of values) {
    if (!value) {
      resp = false;
      break;
    }
  }

  return resp;
};
