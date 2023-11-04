import styles from './pagination-and-per-page.module.css';

interface Props {
  pageNumber: number;
  perPage: number;
  setToNextPageNumber: (nextPageNumber: number) => void;
  setNewPerPage: (newPerPage: number) => void;
}

function PaginationAndPerPage({
  pageNumber,
  setToNextPageNumber,
  perPage,
  setNewPerPage,
}: Props) {
  const changeToNextPageNumber = (nextPageNumber: number) => {
    if (nextPageNumber < 1) return;
    setToNextPageNumber(nextPageNumber);
  };

  const changePerPage = (newPerPage: number) => {
    if (newPerPage < 1) return;
    setNewPerPage(newPerPage);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.paginationWrapper}>
        <button onClick={() => changeToNextPageNumber(pageNumber - 1)}>
          Previous
        </button>
        <p className={styles.page}>{pageNumber}</p>
        <button onClick={() => changeToNextPageNumber(pageNumber + 1)}>
          Next
        </button>
      </div>
      <div className={styles.perPageWrapper}>
        <p>Items on page:</p>
        <input
          type="text"
          className={styles.perPage}
          value={perPage}
          onChange={() => changePerPage(perPage)}
        />
        <button onClick={() => changePerPage(perPage)}>Update page size</button>
      </div>
    </div>
  );
}

export default PaginationAndPerPage;
