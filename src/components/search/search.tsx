import styles from './search.module.css';
import { setSearchValue, useAppDispatch } from '../../store';
import { useState } from 'react';

function Search() {
  const dispatch = useAppDispatch();
  const [currentSearchValue, setCurrentSearchValue] = useState(
    localStorage.getItem('Searched anime') || ''
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchValue(event.target.value);
  };

  const onButtonClick = () => {
    dispatch(setSearchValue(currentSearchValue));
    localStorage.setItem('Searched anime', currentSearchValue);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={currentSearchValue}
        onChange={handleChange}
        data-testid="search-input"
      />
      <button
        className={styles.button}
        onClick={onButtonClick}
        data-testid="search"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
