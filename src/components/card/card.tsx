import { Component } from 'react';
import styles from './card.module.css';

interface Item {
  title: string;
  image: string;
  synopsis: string;
}

interface Props {
  items: Item[];
}
let i;
class Card extends Component<Props> {
  render() {
    const { items } = this.props;
    return (
      <>
        <div className={styles.allCards}>
          {items?.map((item: Item) => (
            <div className={styles.card} key={item.title}>
              <div className={styles.imageAndTitle}>
                <img className={styles.image} src={item.image} alt="Image" />
                <p className={styles.title}>{item.title}</p>
              </div>
              <p className={styles.synopsis}>{item.synopsis}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Card;
