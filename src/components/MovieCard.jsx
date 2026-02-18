import { useState } from "react";
import "../css/MovieCard.css";
import { getMovieTrailer } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import { motion, AnimatePresence } from "framer-motion";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const [trailerKey, setTrailerKey] = useState(null);

  // ▶️ Play trailer
  const handlePlayTrailer = async () => {
    const key = await getMovieTrailer(movie.id);

    if (!key) {
      alert("Trailer not available");
      return;
    }

    setTrailerKey(key);
  };

  // ❌ Close modal
  const closeModal = () => {
    setTrailerKey(null);
  };

  // ❤️ Favorite click
  function onFavoriteClick(e) {
    e.stopPropagation();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  }

  return (
    <>
      {/* 🎬 MOVIE CARD */}
      <motion.div
        className="movie-card"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="movie-poster" onClick={handlePlayTrailer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              {favorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </motion.div>

      {/* 🎥 TRAILER MODAL */}
      <AnimatePresence>
        {trailerKey && (
          <motion.div
            className="trailer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="trailer-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeModal}>
                ✖
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MovieCard;
