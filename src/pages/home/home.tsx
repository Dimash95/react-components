import { useState, useEffect } from 'react';
import { getAnime } from '../../api/get-anime';
import Search from '../../components/search';
import Card from '../../components/card';
import { Item } from '../../entities/item';
import { ItemResponse } from '../../entities/item-response';
import PaginationAndPerPage from '../../components/pagination-and-per-page';
import styles from './home.module.css';

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('Searched anime') || ''
  );
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const throwError = () => {
    setError(true);
  };
  if (error) {
    throw new Error('Test error!');
  }

  const displayItems = async (searchedAnime: string = '') => {
    const itemResponses = (await getAnime(
      searchedAnime,
      pageNumber,
      perPage
    )) as unknown as {
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
  }, [pageNumber]);

  const setToNextPageNumber = (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
  };

  const setNewPerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
  };
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
        <PaginationAndPerPage
          pageNumber={pageNumber}
          setToNextPageNumber={setToNextPageNumber}
          perPage={perPage}
          setNewPerPage={setNewPerPage}
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
