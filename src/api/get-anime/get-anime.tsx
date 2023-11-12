import axios from 'axios';

export const getAnime = async (
  searchedAnime: string,
  pageNumber: number,
  perPage: number
) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?page=${pageNumber}&sfw&limit=${perPage}&q=${searchedAnime}`
  );
  return response.data;
  //asdsa
};
