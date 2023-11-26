import React from "react";
import styles from "./card.module.css";
import { AnimeResponse } from "../../entities/anime-response";

interface Props {
  allAnime: AnimeResponse[];
  showAnimeById: (id: number) => void;
}

const Card = ({ allAnime, showAnimeById }: Props) => {
  return (
    <div className={styles.wrapper}>
      {allAnime?.map((anime) => (
        <div
          className={styles.card}
          key={anime.title}
          onClick={() => showAnimeById(anime.mal_id)}
          data-testid="card-click"
        >
          <div className={styles.imageAndTitle}>
            <img
              className={styles.image}
              src={anime.images.webp.image_url}
              alt="Image"
            />
            <p className={styles.title} data-testid="card-title">
              {anime.title}
            </p>
          </div>
          <p className={styles.synopsis}>{anime.synopsis}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
