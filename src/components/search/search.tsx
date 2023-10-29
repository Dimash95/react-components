import { Component } from 'react';
import styles from './search.module.css';

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
}

class Search extends Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.props.setSearchQuery(value);
  };

  render() {
    const { searchQuery, handleSearch } = this.props;

    return (
      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          value={searchQuery}
          onChange={this.handleChange}
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
