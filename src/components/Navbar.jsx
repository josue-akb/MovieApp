import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">MovieApp</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Accueil
        </Link>

        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-blue-600">
              Favoris
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 ml-2"
            >
              Déconnexion
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Connexion
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
