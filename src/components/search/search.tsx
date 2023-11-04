import styles from './search.module.css';

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
}

function Search({ searchQuery, setSearchQuery, handleSearch }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={searchQuery}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;
