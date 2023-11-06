import styles from './card.module.css';

interface Item {
  title: string;
  image: string;
  synopsis: string;
  id: number;
}

interface Props {
  items: Item[];
  showAnimeById(id: number): void;
}

function Card({ items, showAnimeById }: Props) {
  return (
    <div className={styles.wrapper}>
      {items?.map((item: Item) => (
        <div
          className={styles.card}
          key={item.title}
          onClick={() => showAnimeById(item.id)}
        >
          <div className={styles.imageAndTitle}>
            <img className={styles.image} src={item.image} alt="Image" />
            <p className={styles.title}>{item.title}</p>
          </div>
          <p className={styles.synopsis}>{item.synopsis}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
