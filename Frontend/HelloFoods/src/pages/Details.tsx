import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { cn } from "../utils/cn";
import { Movie } from "./Home";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

export default function Details() {
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState<Movie | null>();
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    async function fetchDataFromDatabase() {
      const url = "http://127.0.0.1:8000/movies/";
      try {
        // Make a GET request to the database API endpoint
        const response = await fetch(`${url}${id}/`, {
          method: "GET",
        });

        // Check if the response status code is OK (200)
        if (!response.ok) {
          setErorr(true);
        }
        if (response.ok) {
          setErorr(false);
        }

        // Parse the JSON response data
        const data = await response.json();

        // Use the retrieved data
        console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    }

    // Usage
    fetchDataFromDatabase()
      .then((data) => {
        // Do something with the data
        setMovieDetails(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        if (error instanceof Response && error.status === 404) {
          console.log(error);
        } else {
          console.error("Error fetching data:", error);
        }
      });
  }, [id]);

  const genresArray = movieDetails?.genres
    .split(",")
    .map((genre) => genre.trim());

  const actorsArray = movieDetails?.actors
    .split(",")
    .map((genre) => genre.trim());

  return (
    <Layout>
      {loading && <Loader />}
      {movieDetails && (
        <>
          <div
            data-testid="movie-details"
            className="px-4 gap-5 flex flex-col items-center"
          >
            <div className=" mt-8  bg-100 w-full rounded-2xl flex flex-col md:flex-row max-w-5xl max-h-[512]">
              <div className="relative">
                <img
                  className={"object-cover"}
                  alt="movie logo"
                  src={movieDetails?.image}
                />
                <div
                  className={cn(
                    "h-8 w-16 justify-center items-center flex absolute top-12 text- left-0 bg-dark rounded-r-lg text-slate-200 text-xs"
                  )}
                >
                  {movieDetails?.year}
                </div>
              </div>

              <div className="p-3  text-slate-200 gap-1 md:p-4 lg:p-6">
                <div className="flex  flex-col gap-1 lg:gap-5">
                  <h1 className="text-2xl  items-center text-sky-300 font-bold lg:text-3xl">
                    {movieDetails?.title}
                  </h1>
                  <p className="text-xs text-left lg:text-base">
                    {movieDetails?.overview}
                  </p>
                  <div className="gap-4  flex flex-col lg:flex lg:justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {genresArray?.map((genre) => (
                        <div className="py-1 px-2 bg-dark text-xs rounded-lg">
                          {genre}
                        </div>
                      ))}

                      <div className="py-1 px-2 bg-dark text-xs rounded-lg text-amber-400">
                        {movieDetails?.duration} mins
                      </div>
                    </div>

                    <div className=" flex items-center gap-1">
                      <p className="flex gap-1 text-xs md:flex lg:flex md:text-base lg:text-base">
                        IMDb:
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M5.23247 0.582263C5.47405 -0.194088 6.52593 -0.194088 6.76747 0.582263L7.63065 3.35612C7.73871 3.70332 8.04852 3.93839 8.3982 3.93839H11.1914C11.9732 3.93839 12.2983 4.98296 11.6658 5.46277L9.406 7.17711C9.12314 7.39166 9.00476 7.77203 9.11281 8.11921L9.976 10.8931C10.2175 11.6694 9.36662 12.3151 8.73408 11.8353L6.47436 10.1209C6.1915 9.90632 5.80849 9.90632 5.52564 10.1209L3.26586 11.8353C2.6334 12.3151 1.78242 11.6694 2.024 10.8931L2.88715 8.11921C2.99519 7.77203 2.87683 7.39166 2.59399 7.17711L0.334213 5.46277C-0.29826 4.98296 0.0267889 3.93839 0.80856 3.93839H3.6018C3.95142 3.93839 4.26127 3.70332 4.36932 3.35612L5.23247 0.582263Z"
                          fill="#FBBF24"
                        />
                      </svg>
                      <p className="text-xs font-bold lg:text-base">
                        {movieDetails?.score}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className=" text-sm gap-2 flex flex-col lg:text-base">
                  <div className="flex gap-[10px]">
                    <p>Director:</p>

                    <p>{movieDetails?.director}</p>
                  </div>
                  <div className="flex gap-5">
                    <p>Actors:</p>
                    <div className="grid grid-cols-1  ">
                      {actorsArray?.map((actor) => (
                        <p>{actor}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="hover:text-amber-400 h-8 w-[162px] text-slate-200 bg-slate-900 rounded-xl flex justify-center items-center cursor-pointer text-xs"
            >
              <svg
                className="w-5 h-4  cursor-pointer "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fillRule="evenodd"
                  d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                ></path>
              </svg>
              <p>Back To Results</p>
            </button>
          </div>
        </>
      )}
      {error && <ErrorBox errorMessage="Pls try again later" />}
    </Layout>
  );
}
