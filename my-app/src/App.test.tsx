import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("unsplash", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/unaplash/i);
  expect(linkElement).toBeInTheDocument();
});
