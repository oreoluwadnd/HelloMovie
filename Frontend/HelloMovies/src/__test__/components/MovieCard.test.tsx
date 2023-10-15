import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../../components/MovieCard";

const sampleMovieData = {
  title: "Sample Movie",
  image: "sample-movie-image.jpg",
  director: "Sample Director",
  genres: "Action, Adventure",
  duration: 120,
  score: "7.5",
  rating: "PG-13",
  overview: "A sample movie overview.",
  year: 2022,
  actors: "Actor 1, Actor 2",
  id: 1,
};

test("renders MovieCard component", () => {
  render(
    <MemoryRouter>
      <MovieCard horizontalLayout={false} data={sampleMovieData} />
    </MemoryRouter>
  );

  expect(screen.getByText("Sample Movie")).toBeInTheDocument;
  expect(screen.getByAltText("movie logo")).toBeInTheDocument;
  expect(screen.getByText("Action, Adventure")).toBeInTheDocument;
  expect(screen.getByText("120")).toBeInTheDocument;
});

test("renders MovieCard component in horizontal layout", () => {
  render(
    <MemoryRouter>
      <MovieCard horizontalLayout={true} data={sampleMovieData} />
    </MemoryRouter>
  );
  expect(screen.getByText("Sample Movie")).toBeInTheDocument;
  expect(screen.getByAltText("movie logo")).toBeInTheDocument;
  expect(screen.getByText("2022")).toBeInTheDocument;
  expect(screen.getByText("IMDb:")).toBeInTheDocument;
  expect(screen.getByText("7.5")).toBeInTheDocument;
});
