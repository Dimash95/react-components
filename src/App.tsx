import { useState, useEffect } from "react";
import { getAnime } from "./api/get-anime";
import Search from "./components/search";
import Card from "./components/card";
import { Item } from "./entities/item";
import { ItemResponse } from "./entities/item-response";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function displayItems(searchedAnime: string = "") {
    const itemResponses = (await getAnime(searchedAnime)) as unknown as {
      data: ItemResponse[];
    };
    if (itemResponses) {
      const fetchedItems = itemResponses.data.map(
        (itemResponse: ItemResponse) => mapItemResponseToItem(itemResponse)
      );
      setItems(fetchedItems);
    }
  }

  const mapItemResponseToItem = (payload: ItemResponse): Item => ({
    title: payload.title,
    image: payload.images.webp.image_url,
    synopsis: payload.synopsis,
  });

  useEffect(() => {
    displayItems();
  }, []);

  function handleSearch() {
    displayItems(searchQuery);
    localStorage.setItem("Searched anime", searchQuery);

    const searchedAnime = localStorage.getItem("Searched anime");
    setSearchQuery(searchedAnime != null ? searchedAnime : "");
  }

  return (
    <div className="wrapper">
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Card items={items} />
    </div>
  );
}

export default App;
