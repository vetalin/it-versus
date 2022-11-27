import React from "react";
import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

test("Create lobby button on page", () => {
  render(<Main />);
  const createLobbyButton = screen.getByText(/Создать лобби/i);

  expect(createLobbyButton).toBeInTheDocument();
});

test("Create lobby button link to lobby page", () => {
  render(<Main />);
  const createLobbyButton = screen.getByTestId("create-lobby-button");
  const buttonHref = createLobbyButton.getAttribute("href");

  expect(buttonHref).toBe("/lobby");
});
