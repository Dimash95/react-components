import axios from 'axios';

export const getAnimeById = async (id: number) => {
  const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
  return response.data;
};
