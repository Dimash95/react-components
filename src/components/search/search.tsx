import { cache, useEffect, useState } from "react";
import styles from "./search.module.css";

interface Props {
  searchedAnime: string;
  showAnimeBySearchedAnime: (searchedAnime: string) => void;
}

function Search({ searchedAnime, showAnimeBySearchedAnime }: Props) {
  const cache = new Map();
  const [searchQuery, setSearchQuery] = useState(cache.get("anime") || "");

  const handleSearch = async () => {
    showAnimeBySearchedAnime(searchQuery);
    cache.set("anime", searchQuery);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
