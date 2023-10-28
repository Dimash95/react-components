import axios from "axios";

export const getAnime = async (searchedAnime: string) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?page=1&sfw&limit=6&q=${searchedAnime}`
  );
  return response.data;
};
