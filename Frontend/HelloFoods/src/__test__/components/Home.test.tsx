import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/Home";

describe("Home component", () => {
  it("renders the component with a search input", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument;
  });
});
