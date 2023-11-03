import { useState, useEffect } from 'react';
import { getAnime } from '../../api/get-anime';
import Search from '../../components/search';
import Card from '../../components/card';
import { Item } from '../../entities/item';
import { ItemResponse } from '../../entities/item-response';
import styles from './home.module.css';

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('Searched anime') || ''
  );
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const throwError = () => {
    setError(true);
  };

  const displayItems = async (searchedAnime: string = '') => {
    const itemResponses = (await getAnime(searchedAnime)) as unknown as {
      data: ItemResponse[];
    };
    if (itemResponses) {
      const fetchedItems = itemResponses.data.map(
        (itemResponse: ItemResponse) => mapItemResponseToItem(itemResponse)
      );
      setItems(fetchedItems);
      setIsLoading(false);
    }
  };

  const mapItemResponseToItem = (payload: ItemResponse): Item => ({
    title: payload.title,
    image: payload.images.webp.image_url,
    synopsis: payload.synopsis,
  });

  const handleSearch = () => {
    displayItems(searchQuery);
    localStorage.setItem('Searched anime', searchQuery);
  };

  useEffect(() => {
    const searchedAnime = localStorage.getItem('Searched anime');
    if (searchedAnime) {
      setSearchQuery(searchedAnime);
      displayItems(searchedAnime);
    } else {
      displayItems();
    }
  }, []);

  if (error) {
    throw new Error('Test error!');
  }
  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.errorButton} onClick={throwError}>
          Throw Error
        </button>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <Card items={items} />
        )}
      </div>
    </>
  );
}

export default Home;
