/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useContext, useEffect} from 'react';

import {AppContext} from '../../context/AppContext';
import {useForm} from '../../hooks/useForm';
import {useGetDataPokemons} from '../../hooks/useGetDataPokemons';
import {Pokemon} from '../../interfaces/interfaces';
import {createPokemonService, updatePokemonService} from '../../services/pokemonService';

import {ButtonPrimary} from '../buttons/ButtonPrimary';

type FormPokemonProps = {
  // eslint-disable-next-line react/require-default-props
  dataPokemon?: Pokemon | null;
  // eslint-disable-next-line no-unused-vars
  callbackShowForm: (value: boolean) => void;
};

export const FormPokemon = ({dataPokemon, callbackShowForm}: FormPokemonProps) => {
  const {appState, setSelectedPokemon} = useContext(AppContext);
  const {selectedPokemon} = appState;
  const {getPokemons} = useGetDataPokemons();
  const initialState = {
    name: '',
    image: '',
    attack: 0,
    defense: 0
  };
  const {valuesForm, handleInputChange, updateState, reset} = useForm(initialState);

  useEffect(() => {
    updateState(dataPokemon || initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPokemon]);

  const handleCancel = () => {
    callbackShowForm(false);
    setSelectedPokemon(null);
    reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    if (dataPokemon) {
      data = await updatePokemonService(dataPokemon.id, valuesForm);
    } else {
      data = await createPokemonService(valuesForm);
    }

    if (data) {
      getPokemons();
      handleCancel();
    }
  };

  return (
    <div className="content-form">
      <h4>{`${selectedPokemon ? 'Editar Pokemon' : 'Nuevo Pokemon'}`}</h4>
      <form aria-label="form-pokemon" onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="123">Nombre:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nombre"
              name="name"
              id="name"
              value={valuesForm.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="123">Ataque:</label>
            <input
              type="range"
              max={100}
              name="attack"
              id="attack"
              value={valuesForm.attack}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="123">Imagen:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Url"
              name="image"
              id="image"
              value={valuesForm.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="123">Defensa:</label>
            <input
              type="range"
              max={100}
              name="defense"
              id="defense"
              value={valuesForm.defense}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <ButtonPrimary isSubmit image="icons/save.png" text="Guardar" />
          <ButtonPrimary image="icons/close.png" text="Cancelar" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};
