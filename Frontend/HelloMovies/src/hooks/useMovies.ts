import { useEffect, useState } from "react";
import { CONSTANTS } from "../utils/contants";

export type Movie = {
  title: string;
  image: string;
  director: string;
  genres: string;
  duration: number;
  score: string;
  rating: string;
  overview: string;
  year: number;
  actors: string;
  id: number;
};

export type MoviesData = {
  total_movies: number;
  page: string;
  content_per_page: number;
  results: Movie[];
};

const useMovies = ({ page, query }: { page: number; query: string }) => {
  const [movies, setMovies] = useState<MoviesData | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setMovies(null);
      setError("");
      return;
    }
    setLoading(true);
    console.log(query, page);
    async function fetchDataFromDatabase() {
      const url = `${CONSTANTS.API_URL}movies/search/`;
      setError("");
      setMovies(null);
      setLoading(true);
      try {
        // Make a GET request to the database API endpoint
        const response = await fetch(`${url}?q=${query}&page=${page}`, {
          method: "GET",
        });

        // Check if the response status code is OK (200)
        if (!response.ok) {
          setError(`No results found for "${query}"`);
          setLoading(false);
          return;
        }
        if (response.ok) {
          // Parse the JSON response data
          const data = await response.json();
          // Use the retrieved data
          console.log(data);
          setMovies(data);

          setLoading(false);
          setError("");
        }
      } catch (error) {
        setLoading(false);
        setError(`Something went wrong`);
      }
    }
    // Usage
    fetchDataFromDatabase();
  }, [query, page]);

  return {
    loading,
    error,
    movies,
  };
};

export default useMovies;
