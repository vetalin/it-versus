import React from "react";
import { appRouter } from "./AppRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
