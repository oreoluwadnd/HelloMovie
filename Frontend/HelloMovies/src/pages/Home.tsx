import { useState, useEffect } from "react";
import { Input } from "../components/TextInput";
import Layout from "../components/Layout";
import MovieResult from "../components/MovieResult";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

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

const API_URL = "http://0.0.0.0:8000/";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const page = parseInt(queryParams.get("page") || "1", 10);
  const [keyword, setKeyword] = useState<string>("");
  const [movies, setMovies] = useState<MoviesData | null>();
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState("");

  console.log(query);
  console.log(page);

  useEffect(() => {
    if (!query) {
      setMovies(null);
      setErorr("");
      return;
    }
    setLoading(true);
    console.log(query, page);
    async function fetchDataFromDatabase() {
      const url = `${API_URL}movies/search/`;
      try {
        // Make a GET request to the database API endpoint
        const response = await fetch(`${url}?q=${query}&page=${page}`, {
          method: "GET",
        });

        // Check if the response status code is OK (200)
        if (!response.ok) {
          setErorr(`No results found for "${query}"`);
        }
        if (response.ok) {
          setErorr("");
        }

        // Parse the JSON response data
        const data = await response.json();

        // Use the retrieved data
        console.log(data);
        return data;
      } catch (error) {
        // setErorr(`Something went wrong`);
      }
    }

    // Usage
    fetchDataFromDatabase()
      .then((data) => {
        // Do something with the data
        setMovies(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        if (error instanceof Response && error.status === 404) {
          setErorr(`No results found for ${query}`);
        } else {
          console.error("Error fetching data:", error);
          // Handle other errors, e.g., display a generic error message
        }
      });
  }, [query, page]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && keyword !== "") {
      const path = location.pathname;
      navigate(`${path}?q=${keyword}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`${location.pathname}?q=${query}&page=${newPage}`);
  };
  return (
    <Layout>
      {loading && <Loader />}
      <div className="md:px-5 px-4 text-center lg:px-[72px] flex-col flex gap-3 md:max-w-[696px] lg:max-w-[776] items-center">
        <div className="gap-3 flex flex-col">
          <h1 className="text-3xl font-bold text-slate-100 md:text-5xl lg:text-[64px]">
            Need help finding the next movie?
          </h1>
          <p className="text-sky-200 md:text-lg md:max-w-lg  lg:max-w-lg mx-auto">
            Search for your next movie through HelloMovie’s huge movie library
          </p>
        </div>
        <div className="flex  md:max-w-lg gap-3 flex-col items-center">
          <Input
            data-testid="search-bar"
            placeholder="Search for your next movie"
            value={keyword}
            type="text"
            onChange={handleInput}
            onKeyDown={handleKeypress}
          />
          <div className="flex  gap-4">
            <div className="flex cursor-pointer gap-1">
              <svg
                className="w-5 h-4 text-amber-400 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M.302.061a.671.671 0 0 0-.213.178L0 .357v15.279l.082.107a.964.964 0 0 0 .216.182C.428 16 .503 16 10 16s9.571 0 9.702-.075a.964.964 0 0 0 .216-.182l.082-.107V.357l-.09-.118C19.718-.02 20.59 0 9.994 0 1.263 0 .42.008.302.061Zm2.851 1.547v.488H1.155v-.973h1.998v.485Zm3.131 0v.488H4.327v-.973H6.284v.485Zm3.168 0v.488H7.496v-.973h1.956v.485Zm3.13 0v.488h-1.956v-.973H12.583v.485Zm3.132 0v.488H13.757v-.973H15.714v.485Zm3.13 0v.488H16.93v-.973h1.916v.485ZM8.715 5.504c.295.142 3.455 1.913 3.53 1.978.29.242.29.762 0 1.019-.1.09-3.172 1.821-3.563 2.01-.362.175-.81.068-1.025-.246l-.12-.174V8.02c0-1.996 0-2.078.075-2.217.201-.378.678-.506 1.103-.3Zm-5.56 8.867v.485H1.154v-.973h1.998v.488Zm3.13 0v.485H4.327v-.46c0-.253.011-.474.026-.488.012-.01.451-.025.977-.025h.954v.488Zm3.168 0v.485H7.496v-.973h1.956v.488Zm3.13 0v.485h-1.956v-.973H12.583v.488Zm3.132 0v.485H13.757v-.46c0-.253.011-.474.026-.488.015-.01.455-.025.977-.025h.954v.488Zm3.13 0v.485H16.93v-.973h1.916v.488Z"
                  fillRule="evenodd"
                />
              </svg>
              <p className="text-slate-200 text-sm">TV Shows</p>
            </div>
            <div className="flex cursor-pointer gap-1">
              <svg
                className="w-5 h-4 text-amber-400 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M.36.086A.662.662 0 0 0 .094.34L0 .508v6.426c0 6.032.004 6.434.074 6.573.04.082.13.189.196.238.119.086.192.09 1.6.11l1.477.02-.372.648c-.335.574-.376.668-.372.849.004.36.27.614.638.614.356 0 .442-.094 1.072-1.18l.553-.95h12.227l.545.934c.298.516.585.98.634 1.037.119.127.372.2.565.163.323-.061.589-.446.523-.75-.016-.065-.188-.397-.388-.741l-.364-.623 1.501-.02c1.429-.021 1.502-.025 1.62-.111a.803.803 0 0 0 .197-.238c.07-.14.074-.54.074-6.569 0-6.303 0-6.43-.086-6.59a.553.553 0 0 0-.27-.258L21.456 0h-10.46C.593 0 .536 0 .36.086Zm9.22 3.905c.205.103.311.27.331.513.025.278-.081.48-.331.606-.156.078-.258.094-.585.094h-.401v2.123c0 1.414-.017 2.176-.05 2.291a.693.693 0 0 1-.51.471c-.136.025-.214.009-.373-.07-.369-.188-.356-.085-.356-2.606V5.204h-.377c-.47 0-.663-.049-.802-.217-.29-.344-.188-.832.213-1.012.098-.04.47-.057 1.612-.057 1.326 0 1.494.004 1.629.073Zm2.509-.028c.266.14.302.213.912 1.975.327.947.61 1.705.626 1.688.017-.016.274-.782.573-1.696.299-.918.581-1.713.626-1.77.115-.148.43-.263.614-.226a.637.637 0 0 1 .508.64c0 .094-.348 1.2-.827 2.643-.72 2.172-.843 2.495-.97 2.639-.389.43-1.035.266-1.256-.324-.045-.119-.442-1.254-.88-2.524-.516-1.488-.798-2.369-.798-2.48 0-.418.511-.75.872-.565Z"
                  fillRule="evenodd"
                />
              </svg>
              <p className="text-slate-200 text-sm">TV Shows</p>
            </div>
          </div>
          {error && <ErrorBox errorMessage={error} />}
        </div>
      </div>
      {movies?.results && (
        <MovieResult movies={movies} handlePageChange={handlePageChange} />
      )}
    </Layout>
  );
}
