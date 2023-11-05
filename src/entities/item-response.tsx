export interface ItemResponse {
  title: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };

  synopsis: string;
  mal_id: number;
}
