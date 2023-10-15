import { render, screen } from "@testing-library/react";
import MovieResult from "../../components/MovieResult";
import { MemoryRouter } from "react-router-dom";

test("MovieResult component renders correctly", () => {
  const movies = {
    total_movies: 10,
    content_per_page: 4,
    results: [
      {
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
      },
    ],
    page: "1",
  };

  const handlePageChange = jest.fn();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <MovieResult movies={movies} handlePageChange={handlePageChange} />{" "}
    </MemoryRouter>
  );
  const foundMoviesText = screen.getByText("Sample Movie");

  expect(foundMoviesText).toBeInTheDocument;
});
