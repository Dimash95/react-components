import { useState, useEffect } from 'react';
import { getAnime } from '../../api/get-anime/get-anime';
import { getAnimeById } from '../../api/get-anime-by-id/get-anime-by-id';
import Search from '../../components/search';
import Card from '../../components/card';
import { Item } from '../../entities/item';
import { ItemResponse } from '../../entities/item-response';
import PaginationAndPerPage from '../../components/pagination-and-per-page';
import styles from './home.module.css';
import ModalAnime from '../../components/modal';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/context-anime-items';

function Home() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [urlPageNumber, setUrlPageNumber] = useState(`?page=${pageNumber}`);
  const [id, setId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedAnimeItem, setSelectedAnimeItem] = useState<Item>();

  const [searchedInputValue, setSearchedInputValue] = useState(
    localStorage.getItem('Searched anime') || ''
  );
  const [searchedAnimeItems, setSearchedAnimeItems] = useState<Item[]>([]);

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
      setSearchedAnimeItems(fetchedItems);
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
    displayItems(searchedInputValue);
    localStorage.setItem('Searched anime', searchedInputValue);
  };

  useEffect(() => {
    const searchedAnime = localStorage.getItem('Searched anime');
    if (searchedAnime) {
      setSearchedInputValue(searchedAnime);
      displayItems(searchedAnime);
    } else {
      displayItems();
    }
    navigate(`/${urlPageNumber}`);
  }, [pageNumber, perPage, urlPageNumber]);

  const setToNextPageNumber = (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
    setUrlPageNumber(`?page=${nextPageNumber}`);
  };

  const setNewPerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const showAnimeById = async (id: number) => {
    setIsModalLoading(true);
    setId(id);
    await setIsModalOpen(true);
    await displayAnimeById(id);
    navigate(`/${urlPageNumber}/${id}`);
  };

  const displayAnimeById = async (id: number) => {
    const itemResponses = (await getAnimeById(id)) as unknown as {
      data: ItemResponse;
    };
    if (itemResponses) {
      setSelectedAnimeItem(mapItemResponseToItem(itemResponses.data));
      setIsModalLoading(false);
    }
  };

  useEffect(() => {
    if (id && isModalOpen) {
      displayAnimeById(id);
      navigate(`/${urlPageNumber}/${id}`);
    }
  }, [id, isModalOpen, urlPageNumber]);

  const closeModal = async () => {
    if (isModalOpen) {
      await setIsModalOpen(false);
    } else {
      await setIsModalOpen(true);
    }
    setIsModalLoading(false);
    navigate(`/${urlPageNumber}`);
  };

  return (
    <Context.Provider
      value={{
        searchedInputValue,
        setSearchedInputValue,
        searchedAnimeItems,
        setSearchedAnimeItems,
      }}
    >
      <div
        className={styles.wrapper}
        style={{
          width: isModalOpen ? '50%' : '100%',
        }}
      >
        <div className={styles.content}>
          <button
            className={styles.errorButton}
            onClick={throwError}
            data-testid="error"
          >
            Throw Error
          </button>
          <Search handleSearch={handleSearch} />
          <PaginationAndPerPage
            pageNumber={pageNumber}
            setToNextPageNumber={setToNextPageNumber}
            setNewPerPage={setNewPerPage}
          />
          <div
            className={styles.content}
            style={{
              opacity: isModalOpen ? '0.4' : '1',
            }}
            onClick={closeModal}
            data-testid="close-modal"
          >
            {isLoading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <Card showAnimeById={showAnimeById} data-testid="anime-card" />
            )}
          </div>
        </div>
        {isModalLoading ? (
          <div className={styles.modaLoading} data-testid="modal-loading">
            Loading...
          </div>
        ) : (
          <ModalAnime
            selectedAnimeItem={selectedAnimeItem}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            data-testid="modal"
          />
        )}
      </div>
    </Context.Provider>
  );
}

export default Home;
