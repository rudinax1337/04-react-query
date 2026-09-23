import { useState } from 'react';
import type { FormEvent } from 'react';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}