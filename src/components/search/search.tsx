import { useContext } from 'react';
import styles from './search.module.css';
import { Context } from '../../context/context-anime-items';

interface Props {
  handleSearch: () => void;
}

function Search({ handleSearch }: Props) {
  const { searchedInputValue, setSearchedInputValue } = useContext(Context);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedInputValue(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={searchedInputValue}
        onChange={handleChange}
        data-testid="search-input"
      />
      <button
        className={styles.button}
        onClick={handleSearch}
        data-testid="search"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
