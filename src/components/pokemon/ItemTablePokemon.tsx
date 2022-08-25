import React, {useContext} from 'react';

import {Pokemon} from '../../interfaces/interfaces';
import {AppContext} from '../../context/AppContext';
import {deletePokemonService, getPokemonByIdService} from '../../services/pokemonService';

type ItemTablePokemonProps = {
  pokemon: Pokemon;
};

export const ItemTablePokemon = ({pokemon}: ItemTablePokemonProps) => {
  const {setSelectedPokemon, deletePokemon} = useContext(AppContext);

  const handleDeletePokemon = async (id: number) => {
    const {success} = await deletePokemonService(id);
    if (success) {
      deletePokemon(id);
    }
  };

  const handleSelectedPokemon = async (id: number) => {
    const data = await getPokemonByIdService(id);
    setSelectedPokemon(data);
  };

  return (
    <tr>
      <td className="text-left">{pokemon.name}</td>
      <td>
        <img className="img-pokemon" src={pokemon.image} alt={pokemon.name} />
      </td>
      <td className="text-left">{pokemon.attack}</td>
      <td className="text-left">{pokemon.defense}</td>
      <td>
        <div className="content-icons-actions">
          <button type="button" className="button-icon" onClick={() => handleSelectedPokemon(pokemon.id)}>
            <img className="icon" src="icons/edit.png" alt="editar" />
          </button>
          <button type="button" className="button-icon" onClick={() => handleDeletePokemon(pokemon.id)}>
            <img className="icon" src="icons/delete.png" alt="eliminar" />
          </button>
        </div>
      </td>
    </tr>
  );
};
