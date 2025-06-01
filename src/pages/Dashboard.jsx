import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Charger les films favoris depuis le localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Supprimer un film des favoris
  const handleRemove = (movieId) => {
    const updated = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenue {user?.email} 👋</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">🎬 Vos films favoris</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600">Aucun film favori pour le moment.</p>
        ) : (
          <ul className="space-y-3">
            {favorites.map((movie) => (
              <li
                key={movie.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <span className="font-medium">{movie.title}</span>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
