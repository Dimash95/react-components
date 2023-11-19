import { Item } from '../../entities/item';
import styles from './modal-anime.module.css';

interface Props {
  selectedAnimeItem?: Item;
  isModalOpen: boolean;
  closeModal: () => void;
}

const ModalAnime = ({ selectedAnimeItem, isModalOpen, closeModal }: Props) => {
  return (
    <div
      className={styles.wrapper}
      style={{ display: isModalOpen ? 'flex' : 'none' }}
    >
      <button className={styles.closeButton} onClick={closeModal}>
        X
      </button>
      <div className={styles.card}>
        <div className={styles.imageAndTitle}>
          <img
            className={styles.image}
            src={selectedAnimeItem?.largeImage}
            alt="Anime"
          />
          <p className={styles.title}>{selectedAnimeItem?.title}</p>
        </div>
        <p className={styles.synopsis}>{selectedAnimeItem?.synopsis}</p>
      </div>
    </div>
  );
};

export default ModalAnime;
