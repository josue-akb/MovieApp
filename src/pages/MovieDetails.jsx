import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";  // Import de useAuth

const MovieDetails = () => {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();  // Récupération de l'état de l'authentification
  const [movie, setMovie] = useState(null);
  const API_KEY = "5ff5da450802629ad798343d453993fe";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Erreur de chargement du film :", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Chargement...</p>;

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-100 to-yellow-100 p-6">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">{movie.title}</h1>
      <div className="flex flex-col items-center lg:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-48 h-72 object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
        <div className="text-center lg:text-left">
          <p className="text-xl text-gray-700 mb-4">{movie.overview}</p>
          <p className="text-lg text-gray-800"><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
          <p className="text-lg text-gray-800"><strong>Sortie:</strong> {movie.release_date}</p>
        </div>

        {/* Affichage du bouton seulement si l'utilisateur est connecté */}
        {isAuthenticated && (
          <button
            onClick={() =>
              isFavorite ? removeFavorite(movie.id) : addFavorite(movie)
            }
            className={`mb-4 px-6 py-3 text-lg text-white rounded-full transition-all duration-300 ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>
        )}

        <Link
          to="/"
          className="px-6 py-3 text-lg text-white bg-gray-700 rounded-full hover:bg-gray-800 transition-all duration-300"
        >
          Retour
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
