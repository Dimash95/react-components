import axios from "axios";

export async function fetchAllAnime(
  searchedAnime: string,
  pageNumber = "1",
  perPage = "10"
) {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?page=${pageNumber}&sfw&limit=${perPage}&q=${searchedAnime}`
  );
  return response.data.data;
}
