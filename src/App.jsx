import "./css/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/Navbar";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/favorites"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Favorites />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </MovieProvider>
  );
}

export default App;
