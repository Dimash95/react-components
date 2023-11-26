import { AnimeResponse } from "../../entities/anime-response";
import styles from "./modal.module.css";

interface Props {
  selectedAnime?: AnimeResponse;
  closeModal: () => void;
}

const ModalAnime = ({ selectedAnime, closeModal }: Props) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.closeButton} onClick={closeModal}>
        X
      </button>
      <div className={styles.card}>
        <div className={styles.imageAndTitle}>
          <img
            className={styles.image}
            src={selectedAnime?.images.webp.large_image_url}
            alt="Anime"
          />
          <p className={styles.title}>{selectedAnime?.title}</p>
        </div>
        <p className={styles.synopsis}>{selectedAnime?.synopsis}</p>
      </div>
    </div>
  );
};

export default ModalAnime;
