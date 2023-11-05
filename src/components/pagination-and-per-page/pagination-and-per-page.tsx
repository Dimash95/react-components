import { ChangeEvent, useState } from 'react';
import styles from './pagination-and-per-page.module.css';

interface Props {
  pageNumber: number;
  setToNextPageNumber: (nextPageNumber: number) => void;
  setNewPerPage: (newPerPage: number) => void;
}

function PaginationAndPerPage({
  pageNumber,
  setToNextPageNumber,
  setNewPerPage,
}: Props) {
  const changeToNextPageNumber = (nextPageNumber: number) => {
    if (nextPageNumber < 1) return;
    setToNextPageNumber(nextPageNumber);
  };
  const [perPageValue, setPerPageValue] = useState(10);

  const onChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+event.target.value)) {
      return;
    }
    setPerPageValue(+event.target.value);
  };

  const updatePerPage = () => {
    setNewPerPage(perPageValue);
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
          className={styles.perPage}
          type="text"
          value={perPageValue}
          onChange={onChangePerPage}
        />
        <button onClick={updatePerPage}>Update page size</button>
      </div>
    </div>
  );
}

export default PaginationAndPerPage;
