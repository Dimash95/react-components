import styles from './card.module.css';

interface Item {
  title: string;
  image: string;
  largeImage: string;
  synopsis: string;
  id: number;
}

interface Props {
  searchedAnimeItems?: Item[];
  showAnimeById(id: number): void;
}

function Card({ searchedAnimeItems, showAnimeById }: Props) {
  return (
    <div className={styles.wrapper}>
      {searchedAnimeItems?.map((item: Item) => (
        <div
          className={styles.card}
          key={item.title}
          onClick={() => showAnimeById(item.id)}
          data-testid="card-click"
        >
          <div className={styles.imageAndTitle}>
            <img className={styles.image} src={item.image} alt="Image" />
            <p className={styles.title} data-testid="card-title">
              {item.title}
            </p>
          </div>
          <p className={styles.synopsis}>{item.synopsis}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
