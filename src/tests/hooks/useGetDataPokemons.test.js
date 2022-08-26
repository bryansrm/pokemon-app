/* eslint-disable no-undef */
import {renderHook, waitFor} from '@testing-library/react';
import {AppContext} from '../../context/AppContext';
import {useGetDataPokemons} from '../../hooks/useGetDataPokemons';

describe('Pruebas en el hook useGetDataPokemons', () => {
  const setPokemonsMock = jest.fn();
  const initialContext = {
    appState: {
      searchText: '',
      pokemons: []
    },
    setPokemons: setPokemonsMock
  };
  const wrapper = ({children}) => <AppContext.Provider value={initialContext}>{children}</AppContext.Provider>;

  test('Debe regresar el estado inicial', () => {
    const {result} = renderHook(() => useGetDataPokemons(), {wrapper});
    const {loading, dataPokemon} = result.current;

    expect(loading).toBeTruthy();
    expect(dataPokemon.length).toBe(0);
  });

  test('Debe regresar loading en false, y data de pokemons', async () => {
    const {result} = renderHook(() => useGetDataPokemons(), {wrapper});

    await waitFor(() => expect(result.current.dataPokemon.length).toBeGreaterThan(0), {timeout: 2000});

    const {loading, dataPokemon} = result.current;
    expect(loading).toBeFalsy();
    expect(dataPokemon.length).toBeGreaterThan(0);
  });
});
