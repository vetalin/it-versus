import React from "react";
import { render } from "@testing-library/react";
import { Editor } from "./Editor";

test("I can edit text in editor", () => {
  const { getByTestId } = render(<Editor />);

  const editor = getByTestId("editor");
  expect(editor).toBeInTheDocument();
});
