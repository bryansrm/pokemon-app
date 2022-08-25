import React from 'react';
import {Pokemon} from '../../interfaces/interfaces';

type ItemTablePokemonProps = {
  pokemon: Pokemon;
};

export const ItemTablePokemon = ({pokemon}: ItemTablePokemonProps) => {
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
          <img className="icon" src="icons/edit.png" alt="editar" />
          <img className="icon" src="icons/delete.png" alt="eliminar" />
        </div>
      </td>
    </tr>
  );
};
