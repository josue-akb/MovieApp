import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-100 to-yellow-100 p-6">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">Mes Films Favoris</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-700">Aucun film ajouté aux favoris</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md hover:scale-105 transition-all duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="mt-2 text-red-500 hover:text-red-700 transition-all duration-300"
                >
                  Retirer des favoris
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
