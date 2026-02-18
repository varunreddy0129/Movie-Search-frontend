const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Optional: warn if key is missing
if (!API_KEY) {
  console.error("TMDB API key is missing. Check your .env file.");
}

// 🔥 Generic fetch helper (clean & reusable)
const fetchFromTMDB = async (endpoint) => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      console.error("TMDB API Error:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
};

// 🎬 Get Popular Movies
export const getPopularMovies = async () => {
  const data = await fetchFromTMDB("/movie/popular");
  return data?.results || [];
};

// 🔎 Search Movies
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      console.error("Search Error:", response.status);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Search Failed:", error);
    return [];
  }
};

// ▶ Get Movie Trailer
export const getMovieTrailer = async (movieId) => {
  const data = await fetchFromTMDB(`/movie/${movieId}/videos`);

  if (!data?.results?.length) {
    return null;
  }

  const trailer =
    data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    ) ||
    data.results.find((video) => video.site === "YouTube");

  return trailer ? trailer.key : null;
};
