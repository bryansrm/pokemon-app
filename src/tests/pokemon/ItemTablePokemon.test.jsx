/* eslint-disable no-undef */
import {fireEvent, render} from '@testing-library/react';
import {wait} from '@testing-library/user-event/dist/utils';

import {AppContext} from '../../context/AppContext';
import {ItemTablePokemon} from '../../components/pokemon/ItemTablePokemon';

describe('Pruebas en <ItemTablePokemon />', () => {
  const deletePokemonMock = jest.fn();
  const setSelectedPokemonMock = jest.fn();
  const initialContext = {
    deletePokemon: deletePokemonMock,
    setSelectedPokemon: setSelectedPokemonMock
  };

  const pokemon = {
    id: 3780,
    name: 'Zapdos',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png',
    attack: 90,
    defense: 70,
    hp: 90,
    type: 'tipo',
    id_author: 1
  };

  test('Debe mostrar la información de un pokemon', () => {
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <ItemTablePokemon pokemon={pokemon} />
      </AppContext.Provider>
    );

    const name = getByLabelText('td-name');
    const image = getByLabelText('img-image');
    const attack = getByLabelText('td-attack');
    const defense = getByLabelText('td-defense');

    expect(name.innerHTML).toBe(pokemon.name);
    expect(image.src).toBe(pokemon.image);
    expect(attack.innerHTML).toBe(pokemon.attack.toString());
    expect(defense.innerHTML).toBe(pokemon.defense.toString());
  });

  test('Debe llamar al deletePokemon al dar click en el boton de borrar', async () => {
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <table>
          <tbody>
            <ItemTablePokemon pokemon={pokemon} />
          </tbody>
        </table>
      </AppContext.Provider>
    );
    const button = getByLabelText('button-delete');
    fireEvent.click(button);
    await wait(() => expect(deletePokemonMock).toHaveBeenCalledWith(pokemon.id));
  });

  test('Debe llamar al setSelectedPokemon al dar click en el icon de borrar', async () => {
    const {getByLabelText} = render(
      <AppContext.Provider value={initialContext}>
        <table>
          <tbody>
            <ItemTablePokemon pokemon={pokemon} />
          </tbody>
        </table>
      </AppContext.Provider>
    );
    const button = getByLabelText('button-edit');
    fireEvent.click(button);
    // expect(setSelectedPokemonMock).toHaveBeenCalled();
    await wait(() => expect(setSelectedPokemonMock).toHaveBeenCalled());
  });
});
