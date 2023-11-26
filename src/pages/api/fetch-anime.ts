import axios from "axios";

export async function fetchAnime(id: string) {
  const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
  return response.data.data;
}