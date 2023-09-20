import { createBrowserRouter } from "react-router-dom";
import { About } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
  },
]);
