const API_KEY = "227f59be9a9656431a4c4dedf9c26155";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
};

export const getMovieTrailer = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const trailer =
    data.results.find(v => v.type === "Trailer" && v.site === "YouTube") ||
    data.results.find(v => v.site === "YouTube");

  return trailer ? trailer.key : null;
};


