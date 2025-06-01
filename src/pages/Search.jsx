import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "5ff5da450802629ad798343d453993fe"; // Remplace avec ta clé API

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${query}&page=1`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setError("Une erreur est survenue lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Si la requête est vide, on vide aussi les résultats
    if (!query) {
      setMovies([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-100 to-yellow-100 p-6 flex flex-col items-center">
      <div className="text-center mb-6 w-full max-w-screen-md">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Recherche de films
        </h1>
        <div className="flex justify-center items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un film..."
            className="w-2/3 p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-6 py-3 bg-yellow-400 text-white text-lg rounded-full hover:bg-yellow-500 transition-all duration-300"
          >
            Rechercher
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-xl">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Affichage des résultats de recherche */}
      {movies.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-6 w-full max-w-screen-xl">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="max-w-xs text-center bg-white rounded-lg shadow-md hover:scale-105 transition-all duration-300"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h4 className="text-xl font-semibold text-gray-800 p-4">
                  {movie.title}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        query && !loading && <p className="text-center text-lg">Aucun film trouvé.</p>
      )}
    </div>
  );
};

export default Search;
