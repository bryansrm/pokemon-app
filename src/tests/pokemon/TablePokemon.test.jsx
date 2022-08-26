/* eslint-disable no-undef */
import {render} from '@testing-library/react';
import {TablePokemon} from '../../components/pokemon/TablePokemon';
import {useGetDataPokemons} from '../../hooks/useGetDataPokemons';

jest.mock('../../hooks/useGetDataPokemons');

describe('Pruebas en <TablePokemon />', () => {
  test('Debe mostrar Cargando... al inicio ', () => {
    useGetDataPokemons.mockReturnValue({
      loading: true,
      dataPokemon: []
    });

    const {getByText} = render(<TablePokemon />);
    expect(getByText('Cargando ...'));
  });

  test('Debe mostrar <No hay registros> si terminó de cargar y no hay data', () => {
    useGetDataPokemons.mockReturnValue({
      loading: false,
      dataPokemon: []
    });

    const {getByText} = render(<TablePokemon />);
    expect(getByText('No hay registros'));
  });

  test('Debe mostrar datos al terminar de cargar', () => {
    const pokemons = [
      {
        id: 1,
        name: 'Zapdos',
        image: 'https://localhost/zapdos.png',
        attack: 90,
        defense: 70,
        hp: 90,
        type: 'tipo',
        id_author: 1
      },
      {
        id: 2,
        name: 'Pikachu',
        image: 'https://localhost/pikachu.png',
        attack: 90,
        defense: 70,
        hp: 90,
        type: 'tipo',
        id_author: 1
      }
    ];

    useGetDataPokemons.mockReturnValue({
      loading: false,
      dataPokemon: pokemons
    });

    const {getAllByLabelText} = render(<TablePokemon />);
    const names = getAllByLabelText('td-name');
    const images = getAllByLabelText('img-image');

    expect(names.length).toBe(pokemons.length);
    expect(images.length).toBe(pokemons.length);
  });
});
