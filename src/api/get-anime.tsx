import axios from "axios";

export const getAnime = async () => {
  const response = await axios.get("https://api.jikan.moe/v4/anime?sfw");
  return response.data;
};
