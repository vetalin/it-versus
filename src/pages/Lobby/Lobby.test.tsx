import React from "react";
import { render, screen } from "@testing-library/react";
import { Lobby } from "./Lobby";

test("Created editor", () => {
  render(<Lobby />);
  const editor = screen.getByTestId("editor");

  expect(editor).toBeInTheDocument();
});
