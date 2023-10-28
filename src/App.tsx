import { useState, useEffect } from "react";
import { getAnime } from "./api/get-anime";
import Card from "./components/card";
import { Item } from "./entities/item";
import { ItemResponse } from "./entities/item-response";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  async function displayItems() {
    const itemResponses = (await getAnime()) as unknown as {
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

  return (
    <>
      <Card items={items} />
    </>
  );
}

export default App;
