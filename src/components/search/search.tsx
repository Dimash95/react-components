import styles from './search.module.css';
import { setSearchValue, useAppDispatch, useAppSelector } from '../../store';

interface Props {
  handleSearch: () => void;
}

function Search({ handleSearch }: Props) {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.searchValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  const onButtonClick = () => {
    dispatch(setSearchValue(searchValue));
    handleSearch();
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={searchValue}
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
