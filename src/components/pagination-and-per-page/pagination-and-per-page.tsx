import { ChangeEvent, useState } from 'react';
import styles from './pagination-and-per-page.module.css';
import { setItemsPerPage } from '../../store';
import { useDispatch } from 'react-redux';

interface Props {
  pageNumber: number;
  setToNextPageNumber: (nextPageNumber: number) => void;
}

function PaginationAndPerPage({ pageNumber, setToNextPageNumber }: Props) {
  const changeToNextPageNumber = (nextPageNumber: number) => {
    if (nextPageNumber < 1) return;
    setToNextPageNumber(nextPageNumber);
  };
  const [perPageValue, setPerPageValue] = useState(10);
  const dispatch = useDispatch();

  const onChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+event.target.value)) {
      return;
    }
    setPerPageValue(+event.target.value);
  };

  const updatePerPage = () => {
    dispatch(setItemsPerPage(perPageValue));
    setToNextPageNumber(1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => changeToNextPageNumber(pageNumber - 1)}
          data-testid="page-number"
        >
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
          data-testid="per-page-value"
        />
        <button onClick={updatePerPage} data-testid="pagination-per-page">
          Update page size
        </button>
      </div>
    </div>
  );
}

export default PaginationAndPerPage;
