import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const URL_SEARCH = import.meta.env.VITE_URL_SEARCH;
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE;

export const fetchData = async (page, language) => {
    try {
        const response = await axios.get(BASE_URL + `/popular?api_key=${API_KEY}&page=${page}&language=${language}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchMovieDetails = async (movieId, language) => {
    try {
        const response = await axios.get(`${BASE_URL}/${movieId}?api_key=${API_KEY}&language=${language}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

export const getImageUrl = (path) => {
    return `${IMAGE_BASE_URL}${path}`;
};

export const searchMovies = async (query, language) => {
    try {
        const response = await axios.get(
            `${URL_SEARCH}`, {
            params: {
                api_key: API_KEY,
                query,
                language
            }
        }
        );

        const filteredResults = response.data.results.filter(
            (movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                movie.original_title.toLowerCase().includes(query.toLowerCase())
        );

        return { results: filteredResults };
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};
