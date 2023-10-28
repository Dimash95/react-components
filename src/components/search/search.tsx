import { Dispatch, SetStateAction } from 'react';
import styles from './search.module.css';

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
}

function Search({ searchQuery, setSearchQuery, handleSearch }: Props) {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;
