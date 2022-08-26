import React, {ChangeEvent, useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';

export const SearchPokemon = () => {
  const {setSearchText} = useContext(AppContext);
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(target.value);
    setSearchText(target.value);
  };

  return (
    <div className="content-form-input">
      <img src="icons/search.png" alt="buscar" />
      <input
        aria-label="input-search"
        className="form-input-icon"
        placeholder="Buscar"
        value={searchInput}
        onChange={handleInputChange}
      />
    </div>
  );
};
