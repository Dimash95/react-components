import { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  name: string;
  url: string;
}

interface ItemResponse {
  results: [{ name: string; url: string }];
}

function App() {
  const getPokemon = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    console.log(response.data);
    return response.data;
  };

  const [items, setItems] = useState<Item[]>([]);

  // async function displayItems() {
  //   const itemResponses = (await getPokemon()) as unknown as ItemResponse;
  //   if (itemResponses) {
  //     const fetchedItems = itemResponses.results.map((itemResponse: ItemResponse) =>
  //       mapItemResponseToItem(itemResponse)
  //     );
  //     setItems(fetchedItems);
  //   }
  // }

  // const mapItemResponseToItem = (payload: ItemResponse): Item => ({
  //   name: payload.results,
  //   url: payload.results[0].url,
  // });

  useEffect(() => {
    async function displayItems() {
      try {
        const response = await getPokemon();
        if (response && response.data.results) {
          const fetchedItems = response.data.results.map((result: { name: string; url: string }) => ({
            name: result.name,
            url: result.url,
          }));
          setItems(fetchedItems);
        }
      } catch (error) {
        // Обработка возможных ошибок здесь
        console.error('Ошибка при получении данных:', error);
      }
    }
    displayItems();
  }, []);

  return (
    <>
      <ul>{items?.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
    </>
  );
}

export default App;
