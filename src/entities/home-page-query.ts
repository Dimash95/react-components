import { ParsedUrlQuery } from "querystring";

export interface HomePageQuery extends ParsedUrlQuery {
  id: string;
  searchedAnime: string;
  pageNumber: string;
  perPage: string;
}
