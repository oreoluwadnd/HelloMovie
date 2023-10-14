import { useState } from "react";
import { cn } from "../utils/cn";

import { MoviesData } from "../pages/Home";
import MovieCard from "./MovieCard";

export type MovieResultProps = {
  movies: MoviesData;
  handlePageChange: (newPage: number) => void;
};

export default function MovieResult({
  movies,
  handlePageChange,
}: MovieResultProps) {
  const [horizontalLayout, setHorizontalLayout] = useState<boolean>(false);
  const { total_movies, content_per_page, results, page } = movies;
  const currentPage = parseInt(page);
  const startIndex = (currentPage - 1) * content_per_page + 1;
  const endIndex = Math.min(currentPage * content_per_page, total_movies);
  const totalPages = Math.ceil(total_movies / content_per_page);

  const handleHorizontaLayout = () => {
    setHorizontalLayout(true);
  };
  const handleVerticaLayout = () => {
    setHorizontalLayout(false);
  };

  return (
    <div className="lg:px-[72px] md:px-5 px-4 justify-center items-center w-full flex-col flex gap-4 md:max-w-[696px] lg:max-w-[1120px] text-white">
      <div className="flex w-full justify-between items-center">
        <p>
          Found <span className="text-amber-400">{movies.total_movies}</span>{" "}
          Movies
        </p>
        <div className="flex gap-2 items-center justify-center">
          <p className="text-xs">layout:</p>
          <div className="flex gap-3">
            <span
              onClick={handleVerticaLayout}
              className={cn(
                " py-2 px-2 bg-slate-900 rounded-md text-slate-600 cursor-pointer",
                {
                  "bg-100": !horizontalLayout,
                }
              )}
            >
              <svg
                className={cn("w-4 h-4 ", {
                  "text-amber-400": !horizontalLayout,
                })}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M2 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2Zm6-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2Zm0 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            <span
              onClick={handleHorizontaLayout}
              className={cn(
                " py-2 px-2 rounded-md bg-slate-900 text-slate-600  cursor-pointer",
                {
                  "bg-100": horizontalLayout,
                }
              )}
            >
              <svg
                className={cn("w-4 h-4", {
                  "text-amber-400": horizontalLayout,
                })}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M14.857 0C15.488 0 16 .448 16 1v2c0 .552-.512 1-1.143 1H1.143C.512 4 0 3.552 0 3V1c0-.552.512-1 1.143-1h13.714Zm0 6C15.488 6 16 6.448 16 7v2c0 .552-.512 1-1.143 1H1.143C.512 10 0 9.552 0 9V7c0-.552.512-1 1.143-1h13.714ZM16 13c0-.552-.512-1-1.143-1H1.143C.512 12 0 12.448 0 13v2c0 .552.512 1 1.143 1h13.714c.631 0 1.143-.448 1.143-1v-2Z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full grid grid-cols-2 gap-2 md:gap-4 lg:gap-4 text-white md:grid-cols-3 lg:grid-cols-4",
          {
            "grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2": horizontalLayout,
          }
        )}
      >
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            horizontalLayout={horizontalLayout}
            data={movie}
          />
        ))}
      </div>
      <div className="text-slate-200 text-center lg:px-[72px] md:px-5 px-4   w-full flex-col flex gap-3 md:max-w-[696px] lg:max-w-[776]">
        <p>
          Showing {startIndex} to {endIndex} of
          <span className="text-amber-400 ml-1">{total_movies}</span> results
        </p>
        <div className="flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={cn(
              "h-8 w-28 hover:text-amber-400 hover:border-sky-200 hover:border bg-slate-900 rounded-xl flex justify-center items-center cursor-pointer",
              {
                "opacity-50 hover:text-slate-200 hover:border-none":
                  currentPage === 1,
              }
            )}
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={cn(
              "h-8 w-28 hover:text-amber-400 hover:border-sky-200 hover:border bg-slate-900 rounded-xl flex justify-center items-center cursor-pointer",
              {
                "opacity-50 hover:text-slate-200 hover:border-none":
                  currentPage === totalPages,
              }
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
