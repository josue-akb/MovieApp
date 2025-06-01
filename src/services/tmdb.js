const API_KEY = '5ff5da450802629ad798343d453993fe';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query, page = 1) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur API TMDB :", error);
        return { results: [], total_pages: 0 };
    }
};
