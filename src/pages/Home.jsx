import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = "5ff5da450802629ad798343d453993fe"; // Remplace avec ta clé API

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error("Erreur de chargement des films :", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-200 to-yellow-200 p-6">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Bienvenue sur <span className="text-yellow-400">MovieApp</span>
        </h1>
        <p className="text-lg text-white mb-6">
          Découvrez les meilleurs films et séries du moment !
        </p>
        <Link 
          to="/search"
          className="mt-4 px-6 py-3 text-xl text-white bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300"
        >
          Recherche un film
        </Link>
      </div>

      {/* Affichage des films populaires */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {movies.map((movie) => (
          <div key={movie.id} className="max-w-xs text-center bg-white rounded-lg shadow-md hover:scale-105 transition-all duration-300">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h4 className="text-xl font-semibold text-gray-800 p-4">{movie.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
