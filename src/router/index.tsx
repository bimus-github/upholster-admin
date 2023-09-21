import { createBrowserRouter } from "react-router-dom";
import { About, Designs, Services } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/designs",
    element: <Designs />,
  },
]);
