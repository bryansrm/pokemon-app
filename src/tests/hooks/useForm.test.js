/* eslint-disable no-undef */
import {act} from 'react-dom/test-utils';
import {renderHook} from '@testing-library/react';
import {useForm} from '../../hooks/useForm';

describe('Pruebas en el hook useForm', () => {
  const initialValues = {
    name: 'Charmander',
    image: 'https://localhost/charmander.png',
    attack: 10,
    defense: 10
  };

  test('Debe retornar los valores por defecto', () => {
    const {result} = renderHook(() => useForm(initialValues));
    expect(result.current).toEqual({
      valuesForm: {
        name: initialValues.name,
        image: initialValues.image,
        attack: initialValues.attack,
        defense: initialValues.defense
      },
      handleInputChange: expect.any(Function),
      updateState: expect.any(Function),
      reset: expect.any(Function)
    });
  });

  test('Debe cambiar el nombre del formulario', () => {
    const newName = 'Charmeleon';
    const {result} = renderHook(() => useForm(initialValues));
    const {handleInputChange} = result.current;

    act(() => {
      handleInputChange({target: {name: 'name', value: newName}});
    });

    const {valuesForm} = result.current;
    expect(valuesForm.name).toBe(newName);
  });

  test('Debe resetear los valores del formulario', () => {
    const {result} = renderHook(() => useForm(initialValues));
    const {reset} = result.current;

    act(() => {
      reset();
    });

    const {valuesForm} = result.current;
    expect(valuesForm).toEqual(initialValues);
  });
});
