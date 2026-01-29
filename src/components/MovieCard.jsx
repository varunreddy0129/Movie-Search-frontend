import { useState } from "react";
import "../css/MovieCard.css";
import { getMovieTrailer } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const [trailerKey, setTrailerKey] = useState(null);

  // ▶️ Play trailer in modal
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

  function onFavoriteClick(e) {
    e.stopPropagation();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  }

  return (
    <>
      <div className="movie-card">
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
      </div>

      {/* 🎬 TRAILER MODAL */}
      {trailerKey && (
        <div className="trailer-modal" onClick={closeModal}>
          <div
            className="trailer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>✖</button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieCard;
