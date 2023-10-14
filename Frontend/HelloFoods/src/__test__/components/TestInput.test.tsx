import { render, screen } from "@testing-library/react";
import { Input } from "../../components/TextInput";

it("should render the correct placeholder text", () => {
  render(<Input placeholder="Search..." />);

  const input = screen.getByPlaceholderText("Search...");

  expect(input).toBeInTheDocument;
});
