import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { About, Designs, Services } from "../pages";
import { Car, Navbar } from "../components";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="designs" element={<Designs />}>
        <Route path=":id" element={<Car />} />
      </Route>
    </Route>
  )
);
