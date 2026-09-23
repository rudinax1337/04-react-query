import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const { data } = await api.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });

  return data;
};
