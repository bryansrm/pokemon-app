/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useContext, useEffect, useState} from 'react';

import {AppContext} from '../../context/AppContext';
import {validateFormPokemon} from '../../helper/validationHelper';
import {useForm} from '../../hooks/useForm';
import {useGetDataPokemons} from '../../hooks/useGetDataPokemons';
import {Pokemon} from '../../interfaces/interfaces';
import {createPokemonService, updatePokemonService} from '../../services/pokemonService';
import {Alert} from '../alerts/Alert';

import {ButtonPrimary} from '../buttons/ButtonPrimary';

type FormPokemonProps = {
  // eslint-disable-next-line react/require-default-props
  dataPokemon?: Pokemon | null;
  // eslint-disable-next-line no-unused-vars
  callbackShowForm: (value: boolean) => void;
};

type AlertProps = {
  show: boolean;
  type: 'success' | 'error';
  message: string;
};

export const FormPokemon = ({dataPokemon, callbackShowForm}: FormPokemonProps) => {
  const initialDataAlert: AlertProps = {show: false, type: 'success', message: ''};
  const {appState, setSelectedPokemon} = useContext(AppContext);
  const {selectedPokemon} = appState;
  const [dataAlert, setDataAlert] = useState<AlertProps>(initialDataAlert);
  const [requiredData, setRequiredData] = useState(false);
  const {getPokemons} = useGetDataPokemons();
  const initialState = {
    name: '',
    image: '',
    attack: 0,
    defense: 0
  };
  const {valuesForm, handleInputChange, updateState, reset} = useForm(initialState);

  const handleCancel = () => {
    callbackShowForm(false);
    setSelectedPokemon(null);
    reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequiredData(false);
    const validate = validateFormPokemon(valuesForm);
    if (!validate) {
      setRequiredData(true);
      return;
    }

    let data;
    if (dataPokemon) {
      data = await updatePokemonService(dataPokemon.id, valuesForm);
    } else {
      data = await createPokemonService(valuesForm);
    }

    if (data) {
      getPokemons();
      setDataAlert({
        show: true,
        type: 'success',
        message: dataPokemon ? 'El pokemon se actualizó con éxito' : 'El pokemon se agregó con éxito'
      });
    } else {
      setDataAlert({
        show: true,
        type: 'error',
        message: dataPokemon ? 'Ocurrió un error al actualizar el pokemon' : 'Ocurrio un error al agregar el pokemon'
      });
    }
  };

  useEffect(() => {
    updateState(dataPokemon || initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPokemon]);

  useEffect(() => {
    if (dataAlert.show) {
      setTimeout(() => {
        handleCancel();
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAlert.show]);

  if (dataAlert.show) {
    return <Alert type={dataAlert.type} message={dataAlert.message} />;
  }

  return (
    <div className="content-form">
      <h4 aria-label="title">{`${selectedPokemon ? 'Editar Pokemon' : 'Nuevo Pokemon'}`}</h4>
      <form aria-label="form-pokemon" onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="123">Nombre:</label>
            <input
              aria-label="input-name"
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
            <div className="content-input-range">
              <span>{valuesForm.attack}</span>
              <input
                aria-label="input-attack"
                type="range"
                max={100}
                name="attack"
                id="attack"
                value={valuesForm.attack}
                onChange={handleInputChange}
              />
              <span>100</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="123">Imagen:</label>
            <input
              aria-label="input-image"
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
            <div className="content-input-range">
              <span>{valuesForm.defense}</span>
              <input
                aria-label="input-defense"
                type="range"
                max={100}
                name="defense"
                id="defense"
                value={valuesForm.defense}
                onChange={handleInputChange}
              />
              <span>100</span>
            </div>
          </div>
        </div>
        {requiredData && (
          <div className="content-error" aria-label="content-error">
            Debe ingresar todos los campos del formulario
          </div>
        )}
        <div>
          <ButtonPrimary aria-label="button-save" isSubmit image="icons/save.png" text="Guardar" />
          <ButtonPrimary aria-label="button-cancel" image="icons/close.png" text="Cancelar" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};
