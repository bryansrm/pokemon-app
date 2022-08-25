import React from 'react';
import {useGetDataPokemons} from '../../hooks/useGetDataPokemons';
import {ItemTablePokemon} from './ItemTablePokemon';

export const TablePokemon = () => {
  const {loading, dataPokemon} = useGetDataPokemons();

  if (loading && !dataPokemon.length) {
    return <div>Cargando ...</div>;
  }

  if (!loading && !dataPokemon.length) {
    return <div>No hay registros</div>;
  }

  return (
    <table className="table-pokemon" border={1}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Ataque</th>
          <th>Defensa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {dataPokemon.map((pokemon) => (
          <ItemTablePokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </tbody>
    </table>
  );
};
