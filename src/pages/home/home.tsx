import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search';
import Card from '../../components/card';
import PaginationAndPerPage from '../../components/pagination-and-per-page';
import ModalAnime from '../../components/modal';
import { Item } from '../../entities/item';
import { ItemResponse } from '../../entities/item-response';
import { useAppSelector } from '../../store';
import { useGetAnimeQuery } from '../../services/anime-api';
import { useGetAnimeByIdQuery } from '../../services/detailed-anime-api';
import styles from './home.module.css';

function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const [urlPageNumber, setUrlPageNumber] = useState(`?page=${pageNumber}`);
  const [id, setId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedAnimeItem, setSelectedAnimeItem] = useState<Item>();

  const searchValue = useAppSelector((state) => state.searchValue);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage);
  const [forceError, setForceError] = useState(false);
  const [anime, setAnime] = useState<Item[]>();
  const { data, error, isLoading } = useGetAnimeQuery({
    pageNumber,
    itemsPerPage,
    searchValue,
    refetchOnMountOrArgChange: true,
    forceError: forceError,
  });

  const {
    data: detailedData,
    error: detailedError,
    isLoading: detailedIsLoading,
  } = useGetAnimeByIdQuery({
    id,
    refetchOnMountOrArgChange: true,
    forceError: forceError,
  });

  const throwError = () => {
    setForceError(true);
  };

  if (error) {
    throw new Error('Test error!');
  }

  const mapItemResponseToItem = (payload: ItemResponse): Item => ({
    title: payload.title,
    image: payload.images.webp.image_url,
    largeImage: payload.images.webp.large_image_url,
    synopsis: payload.synopsis,
    id: payload.mal_id,
  });

  useEffect(() => {
    if (data) {
      const fetchedAnimeItems = data.data.map((itemResponse: ItemResponse) =>
        mapItemResponseToItem(itemResponse)
      );
      setAnime(fetchedAnimeItems);
    }
  }, [data]);

  useEffect(() => {
    if (detailedData) {
      setSelectedAnimeItem(mapItemResponseToItem(detailedData.data));

      if (id) {
        navigate(`/${urlPageNumber}/${id}`);
      }
    }
  }, [detailedData]);

  const setToNextPageNumber = (nextPageNumber: number) => {
    setPageNumber(nextPageNumber);
    setUrlPageNumber(`?page=${nextPageNumber}`);
  };

  const showAnimeById = async (id: number) => {
    setId(id);
    await setIsModalOpen(true);
    navigate(`/${urlPageNumber}/${id}`);
  };

  const closeModal = async () => {
    if (isModalOpen) {
      await setIsModalOpen(false);
    } else {
      await setIsModalOpen(true);
    }
    navigate(`/${urlPageNumber}`);
  };

  return (
    <>
      {isLoading && (
        <h1 className={styles.loading} data-testid="error">
          Loading...
        </h1>
      )}
      {forceError && <h1 className={styles.error}>Error</h1>}
      {!forceError && data && (
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
            <Search />
            <PaginationAndPerPage
              pageNumber={pageNumber}
              setToNextPageNumber={setToNextPageNumber}
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
                <Card
                  searchedAnimeItems={anime}
                  showAnimeById={showAnimeById}
                  data-testid="anime-card"
                />
              )}
            </div>
          </div>
          {detailedError && <h1 className={styles.modalError}>Error</h1>}
          {detailedIsLoading ? (
            <h1 className={styles.modalLoading} data-testid="modal-loading">
              Loading...
            </h1>
          ) : (
            <ModalAnime
              selectedAnimeItem={selectedAnimeItem}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              data-testid="close-modal"
            />
          )}
        </div>
      )}
    </>
  );
}

export default Home;
