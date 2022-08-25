import React, {useState} from 'react';
import {ButtonPrimary} from '../buttons/ButtonPrimary';
import {FormPokemon} from '../pokemon/FormPokemon';
import {SearchPokemon} from '../pokemon/SearchPokemon';
import {TablePokemon} from '../pokemon/TablePokemon';

export const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (value: boolean) => {
    setShowForm(value);
  };

  return (
    <>
      <h3>Listado de Pokemón</h3>
      <section className="section-search">
        <SearchPokemon />
        <ButtonPrimary image="icons/add.png" altImage="nuevo" text="Nuevo" onClick={() => handleShowForm(true)} />
      </section>
      <section className="section-table">
        <TablePokemon />
      </section>
      {showForm && (
        <section className="section-form">
          <FormPokemon callbackShowForm={handleShowForm} />
        </section>
      )}
    </>
  );
};
