import { useState, useEffect } from 'react';
import { getAnime } from '../../api/get-anime';
import { getAnimeById } from '../../api/get-anime-by-id';
import Search from '../../components/search';
import Card from '../../components/card';
import { Item } from '../../entities/item';
import { ItemResponse } from '../../entities/item-response';
import PaginationAndPerPage from '../../components/pagination-and-per-page';
import styles from './home.module.css';
import ModalAnime from '../../components/modal';
import { Link, useNavigate } from 'react-router-dom';

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
    largeImage: payload.images.webp.large_image_url,
    synopsis: payload.synopsis,
    id: payload.mal_id,
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
  }, [pageNumber, perPage]);

  const setToNextPageNumber = (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
  };

  const setNewPerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  ////////////// * MODAL

  const [id, setId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showAnimeById = (id: number) => {
    setId(id);
    displayAnimeById(id);
    setIsModalOpen(true);
  };

  const [selectedAnimeItem, setSelectedAnimeItem] = useState<Item>();

  const displayAnimeById = async (id: number) => {
    const itemResponses = (await getAnimeById(id)) as unknown as {
      data: ItemResponse;
    };
    if (itemResponses) {
      console.log(itemResponses.data);

      setSelectedAnimeItem(mapItemResponseToItem(itemResponses.data));
    }
  };

  const closeModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    displayAnimeById(id);
  }, []);

  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          width: isModalOpen ? '50%' : '100%',
        }}
      >
        <Link
          to={`/${id}`}
          className={styles.content}
          style={{
            opacity: isModalOpen ? '0.4' : '1',
          }}
          onClick={closeModal}
        >
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
            setNewPerPage={setNewPerPage}
          />
          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <Card items={items} showAnimeById={showAnimeById} />
          )}
        </Link>
        <ModalAnime
          selectedAnimeItem={selectedAnimeItem}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      </div>
    </>
  );
}

export default Home;
