import React, {useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';

import {FormPokemon} from '../pokemon/FormPokemon';
import {SearchPokemon} from '../pokemon/SearchPokemon';
import {TablePokemon} from '../pokemon/TablePokemon';
import {ButtonPrimary} from '../buttons/ButtonPrimary';

export const Home = () => {
  const {appState, setSelectedPokemon} = useContext(AppContext);
  const {selectedPokemon} = appState;
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (value: boolean) => {
    setSelectedPokemon(null);
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
      {(showForm || !!selectedPokemon) && (
        <section className="section-form">
          <FormPokemon callbackShowForm={handleShowForm} dataPokemon={selectedPokemon} />
        </section>
      )}
    </>
  );
};
