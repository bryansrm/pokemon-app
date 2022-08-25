import React, {useEffect, useState} from 'react';
import {Pokemon} from '../../interfaces/interfaces';
import {getPokemonsService} from '../../services/pokemonService';
import {ItemTablePokemon} from './ItemTablePokemon';

export const TablePokemon = () => {
  const [loading, setLoading] = useState(false);
  const [dataPokemon, setDataPokemon] = useState<Pokemon[]>([]);

  const getPokemons = async () => {
    console.log('entro');
    setLoading(true);
    const data = await getPokemonsService();
    if (data) {
      setDataPokemon(data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!dataPokemon.length) {
      getPokemons();
    }
  }, [dataPokemon]);

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
