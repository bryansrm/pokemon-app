/* eslint-disable no-unused-vars */
import {ChangeEvent, useState} from 'react';

export const useForm = <Type extends {}>(
  initialState: Type
): {
  valuesForm: Type;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateState: (newState: Type) => void;
  reset: () => void;
} => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [target.name]: target.value
    });
  };

  const updateState = (newState: Type) => {
    setValues({
      ...newState
    });
  };

  return {valuesForm: values, handleInputChange, updateState, reset};
};
