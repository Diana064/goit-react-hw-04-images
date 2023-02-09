import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export default function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');
  const handleNameChange = event => {
    setPictureName(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (pictureName.trim() === '') {
      toast.error('🖼️ Введіть будь ласка назву картинки!');
      return;
    }
    onSubmit(pictureName);
    reset();
  };
  const reset = () => {
    setPictureName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <SearchIcon width="30px" />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          placeholder="Search images and photos"
          value={pictureName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
