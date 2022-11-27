import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { Lobby } from "./pages/Lobby/Lobby";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
]);
