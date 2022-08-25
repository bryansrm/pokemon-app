import React from 'react';
import {ButtonPrimary} from '../buttons/ButtonPrimary';
import {SearchPokemon} from '../pokemon/SearchPokemon';
import {TablePokemon} from '../pokemon/TablePokemon';

export const Home = () => {
  return (
    <>
      <h3>Listado de Pokemón</h3>
      <section className="section-search">
        <SearchPokemon />
        <ButtonPrimary image="icons/add.png" altImage="nuevo" text="Nuevo" />
      </section>
      <section className="section-table">
        <TablePokemon />
      </section>
    </>
  );
};
