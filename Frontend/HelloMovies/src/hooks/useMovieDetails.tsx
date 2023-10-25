import { useEffect, useState } from "react";
import { Movie } from "./useMovies";
import { CONSTANTS } from "../utils/contants";

const useMovieDetails = ({ id }: { id: string | undefined }) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchMoviesDetails() {
      const url = `${CONSTANTS.API_URL}/movies/`;
      setError("");
      setMovieDetails(null);
      setLoading(true);
      try {
        // Make a GET request to the database API endpoint
        const response = await fetch(`${url}${id}/`, {
          method: "GET",
        });

        // Check if the response status code is OK (200)
        if (!response.ok) {
          const data = await response.json();
          setError(data.error);

          setLoading(false);
          return;
        }
        if (response.ok) {
          // Parse the JSON response data
          const data = await response.json();
          setMovieDetails(data);
          setLoading(false);
          setError("");
        }
      } catch (error) {
        setLoading(false);
        setError(`Something went wrong`);
      }
    }
    // Usage
    fetchMoviesDetails();
  }, [id]);

  return {
    loading,
    error,
    movieDetails,
  };
};

export default useMovieDetails;
