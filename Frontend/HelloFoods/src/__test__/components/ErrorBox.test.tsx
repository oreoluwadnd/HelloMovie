import { render } from "@testing-library/react";

import ErrorBox from "../../components/ErrorBox";

test("renders the error message", () => {
  const errorMessage = "An error occurred";
  const { getByText } = render(<ErrorBox errorMessage={errorMessage} />);

  expect(getByText(errorMessage)).toBeInTheDocument;
});
