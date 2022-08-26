/* eslint-disable no-undef */
import {fireEvent, render} from '@testing-library/react';
import {AppContext} from '../../context/AppContext';
import {FormPokemon} from '../../components/pokemon/FormPokemon';

describe('Purbeas en <FormPokemon />', () => {
  const setSelectedPokemonMock = jest.fn();
  const callbackShowFormMock = jest.fn();
  const initialContext = {
    appState: {
      selectedPokemon: null,
      pokemons: []
    },
    setSelectedPokemon: setSelectedPokemonMock
  };

  test('Debe mostrar título <Nuevo Pokemon> y campos vacios', () => {
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <FormPokemon callbackShowForm={callbackShowFormMock} />
      </AppContext.Provider>
    );

    const title = getByLabelText('title');
    const name = getByLabelText('input-name');
    const image = getByLabelText('input-image');
    const attack = getByLabelText('input-attack');
    const defense = getByLabelText('input-defense');

    expect(title.innerHTML).toBe('Nuevo Pokemon');
    expect(name.value).toBe('');
    expect(image.value).toBe('');
    expect(attack.value).toBe('0');
    expect(defense.value).toBe('0');
  });

  test('Debe mostrar título <Editar Pokemon> y campos con los valores del pokemon', () => {
    const pokemon = {
      id: 1,
      name: 'Zapdos',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png',
      attack: 90,
      defense: 70,
      hp: 90,
      type: 'tipo',
      id_author: 1
    };

    const {getByLabelText} = render(
      <AppContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          ...initialContext,
          appState: {
            selectedPokemon: pokemon,
            pokemons: []
          }
        }}
      >
        <FormPokemon dataPokemon={pokemon} callbackShowForm={callbackShowFormMock} />
      </AppContext.Provider>
    );

    const title = getByLabelText('title');
    const name = getByLabelText('input-name');
    const image = getByLabelText('input-image');
    const attack = getByLabelText('input-attack');
    const defense = getByLabelText('input-defense');

    expect(title.innerHTML).toBe('Editar Pokemon');
    expect(name.value).toBe(pokemon.name);
    expect(image.value).toBe(pokemon.image);
    expect(attack.value).toBe(pokemon.attack.toString());
    expect(defense.value).toBe(pokemon.defense.toString());
  });

  test('Debe mostrar mensaje de error <Debe ingresar todos los campos del formulario>, al dar click en el boton guardar sin datos', () => {
    const {getByLabelText} = render(
      <AppContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          ...initialContext,
          appState: {
            selectedPokemon: null,
            pokemons: []
          }
        }}
      >
        <FormPokemon callbackShowForm={callbackShowFormMock} />
      </AppContext.Provider>
    );

    const button = getByLabelText('button-save');
    fireEvent.click(button);
    const divError = getByLabelText('content-error');

    expect(divError).toBeInTheDocument();
    expect(divError.innerHTML).toBe('Debe ingresar todos los campos del formulario');
  });
});
