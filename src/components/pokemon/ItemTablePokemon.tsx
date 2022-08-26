import React, {useContext} from 'react';

import {Pokemon} from '../../interfaces/interfaces';
import {AppContext} from '../../context/AppContext';
import {deletePokemonService, getPokemonByIdService} from '../../services/pokemonService';

type ItemTablePokemonProps = {
  pokemon: Pokemon;
};

export const ItemTablePokemon = ({pokemon}: ItemTablePokemonProps) => {
  const defaultImage = 'http://atrilco.com/wp-content/uploads/2017/11/ef3-placeholder-image.jpg';
  const {setSelectedPokemon, deletePokemon} = useContext(AppContext);

  const handleDeletePokemon = async (id: number) => {
    try {
      const {success} = await deletePokemonService(id);
      if (success) {
        deletePokemon(id);
      }
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      null;
    }
  };

  const handleSelectedPokemon = async (id: number) => {
    const data = await getPokemonByIdService(id);
    setSelectedPokemon(data);
  };

  return (
    <tr>
      <td aria-label="td-name" className="text-left">
        {pokemon.name}
      </td>
      <td>
        <img
          aria-label="img-image"
          className="img-pokemon"
          src={pokemon.image || defaultImage}
          alt={pokemon.name}
          onError={({currentTarget}) => {
            // eslint-disable-next-line no-param-reassign
            currentTarget.onerror = null; // prevents looping
            // eslint-disable-next-line no-param-reassign
            currentTarget.src = defaultImage;
          }}
        />
      </td>
      <td aria-label="td-attack" className="text-left">
        {pokemon.attack}
      </td>
      <td aria-label="td-defense" className="text-left">
        {pokemon.defense}
      </td>
      <td>
        <div className="content-icons-actions">
          <button
            type="button"
            aria-label="button-edit"
            className="button-icon"
            onClick={() => handleSelectedPokemon(pokemon.id)}
          >
            <img className="icon" src="icons/edit.png" alt="editar" />
          </button>
          <button
            type="button"
            aria-label="button-delete"
            className="button-icon"
            onClick={() => handleDeletePokemon(pokemon.id)}
          >
            <img className="icon" src="icons/delete.png" alt="eliminar" />
          </button>
        </div>
      </td>
    </tr>
  );
};
