/* eslint-disable no-undef */
import {fireEvent, render} from '@testing-library/react';
import {SearchPokemon} from '../../components/pokemon/SearchPokemon';
import {AppContext} from '../../context/AppContext';

describe('Pruebas en el searchPokemon', () => {
  const setSearchTextMock = jest.fn();
  const initialContext = {
    appState: {
      searchText: ''
    },
    setSearchText: setSearchTextMock
  };

  test('Debe cambiar el texto del input al escribir', () => {
    const text = 'pikachu';
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <SearchPokemon />
      </AppContext.Provider>
    );
    const input = getByLabelText('input-search');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {target: {value: text}});
    expect(input.value).toBe(text);
  });

  test('Debe llamar el setSearchText al cambiar el texto del input', () => {
    const text = 'Charmander';
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <SearchPokemon />
      </AppContext.Provider>
    );
    const input = getByLabelText('input-search');
    fireEvent.change(input, {target: {value: text}});
    expect(setSearchTextMock).toHaveBeenCalledWith(text);
  });
});
