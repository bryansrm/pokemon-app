/* eslint-disable no-undef */
import {fireEvent, render} from '@testing-library/react';
import {Home} from '../../components/home/Home';
import {AppContext} from '../../context/AppContext';

describe('Pruebas en <Home />', () => {
  const setSelectedPokemonMock = jest.fn();
  const initialContext = {
    appState: {
      selectedPokemon: null,
      pokemons: []
    },
    setSelectedPokemon: setSelectedPokemonMock
  };

  test('Debe mostrar el formulario al dar click en el boton Nuevo', () => {
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <Home />
      </AppContext.Provider>
    );
    const button = getByLabelText('button-new');
    fireEvent.click(button);
    const form = getByLabelText('form-pokemon');
    expect(form).toBeInTheDocument();
  });
});
