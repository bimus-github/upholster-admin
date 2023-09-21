import React from "react";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App relative">
      <Navbar />
      <main id="main" className="pl-[60px] pt-[70px] z-0">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
