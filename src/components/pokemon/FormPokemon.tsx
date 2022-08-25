/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {ButtonPrimary} from '../buttons/ButtonPrimary';

type FormPokemonProps = {
  // eslint-disable-next-line no-unused-vars
  callbackShowForm: (value: boolean) => void;
};

export const FormPokemon = ({callbackShowForm}: FormPokemonProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form');
  };

  return (
    <div className="content-form">
      <h4>Nuevo Pokemon</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="123">Nombre:</label>
            <input type="text" className="form-input" name="123" id="123" placeholder="Nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="123">Ataque:</label>
            <input type="range" value={30} max={100} />
          </div>
          <div className="form-group">
            <label htmlFor="123">Imagen:</label>
            <input type="text" className="form-input" name="123" id="123" placeholder="Url" />
          </div>
          <div className="form-group">
            <label htmlFor="123">Defensa:</label>
            <input type="range" value={50} max={100} />
          </div>
        </div>
        <div>
          <ButtonPrimary isSubmit image="icons/save.png" text="Guardar" />
          <ButtonPrimary image="icons/close.png" text="Cancelar" onClick={() => callbackShowForm(false)} />
        </div>
      </form>
    </div>
  );
};
