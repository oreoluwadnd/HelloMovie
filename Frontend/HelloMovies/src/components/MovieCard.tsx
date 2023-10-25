import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

export type IMovie = {
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

export default function MovieCard({
  horizontalLayout,
  data,
}: {
  horizontalLayout: boolean;
  data: IMovie;
}) {
  return (
    <Link
      data-testid="movie-card"
      to={`/${data?.id}`}
      className={cn(
        "flex flex-col gap-[7px]  transition relative w-full vertical ",
        {
          "flex-row h-40 bg-100 rounded-r-2xl gap-0 horizontal":
            horizontalLayout,
        }
      )}
    >
      <div
        className={cn("w-full", {
          "h-[158px] w-32": horizontalLayout,
        })}
      >
        <img
          className={cn("rounded-2xl", {
            "object-cover w-full h-full rounded-none": horizontalLayout,
          })}
          alt="movie logo"
          src={data?.image}
        />
      </div>

      <div
        className={cn("flex flex-col gap-0  text-center items-center w-full ", {
          "flex-col-reverse justify-between p-2": horizontalLayout,
        })}
      >
        <div
          className={cn("flex gap-[3px] flex-col l", {
            "flex flex-col  justify-between text-left w-full": horizontalLayout,
          })}
        >
          <h1
            className={cn(
              "text-xs items-center md:text-base md:font-bold text-sky-300 font-bold",
              {
                "text-xl": horizontalLayout,
              }
            )}
          >
            {data?.title}
          </h1>
          <div className="gap-1 md:flex md:flex-row lg:flex lg:flex-row">
            <p
              className={cn("hidden text-xs  md:flex lg:flex", {
                flex: horizontalLayout,
              })}
            >
              {data?.genres}
            </p>
            <p className="hidden text-xs text-sky-300 md:flex lg:flex">.</p>
            <div
              className={cn(
                "hidden md:text-xs lg:text-xs gap-1 md:flex lg:flex",
                {
                  flex: horizontalLayout,
                }
              )}
            >
              <p> {data?.duration} </p>
              <p>min</p>
            </div>
          </div>
        </div>
        <div
          className={cn("", {
            "flex justify-between flex-row w-full": horizontalLayout,
          })}
        >
          <div
            className={cn(
              "h-[23.833px] w-[46px] justify-center items-center flex absolute top-[34.7px] left-0 bg-dark rounded-r-lg  text-xs",
              {
                "static rounded-xl  ": horizontalLayout,
              }
            )}
          >
            {data?.year}
          </div>
          <div className=" flex items-center gap-1">
            <p
              className={cn("hidden gap-1 md:text-xs md:flex lg:flex", {
                flex: horizontalLayout,
              })}
            >
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
            <p
              className={cn("text-xs lg:text-sm md:text-sm font-bold", {
                "text-base": horizontalLayout,
              })}
            >
              {data?.score}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
