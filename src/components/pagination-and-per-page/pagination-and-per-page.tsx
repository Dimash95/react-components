import { ChangeEvent, use, useEffect, useState } from "react";
import styles from "./pagination-and-per-page.module.css";

interface Props {
  pageNumber: string;
  perPage: string;
  setPaginationAndPageNumber: (pageNumber: string, perPage: string) => void;
}

function PaginationAndPerPage({
  pageNumber,
  perPage,
  setPaginationAndPageNumber,
}: Props) {
  const [newPageNumber, setNewPageNumber] = useState(pageNumber);
  const [newPerPage, setNewPerPage] = useState(perPage);

  const changeToNextPageNumber = (nextPageNumber: number) => {
    if (nextPageNumber < 1) return;
    setNewPageNumber(nextPageNumber.toString());
    setPaginationAndPageNumber(nextPageNumber.toString(), newPerPage);
  };

  const onChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+event.target.value)) {
      return;
    }
    setNewPerPage(event.target.value);
  };

  const updatePerPage = () => {
    setNewPageNumber("1");
    setPaginationAndPageNumber("1", newPerPage);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => changeToNextPageNumber(+newPageNumber - 1)}
          data-testid="page-number"
        >
          Previous
        </button>
        <p className={styles.page}>{newPageNumber}</p>
        <button onClick={() => changeToNextPageNumber(+newPageNumber + 1)}>
          Next
        </button>
      </div>
      <div className={styles.perPageWrapper}>
        <p>Items on page:</p>
        <input
          className={styles.perPage}
          type="text"
          value={newPerPage}
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
