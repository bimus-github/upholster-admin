import React from "react";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main id="main" className="pl-[60px] pt-[70px] z-0">
        <About />
      </main>
    </div>
  );
}

export default App;
