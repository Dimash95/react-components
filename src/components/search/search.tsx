import { Dispatch, SetStateAction } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
}

function Search({ searchQuery, setSearchQuery, handleSearch }: Props) {
  return (
    <div className="search">
      <input
        className="input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;
