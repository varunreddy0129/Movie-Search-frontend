import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <MovieProvider>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
