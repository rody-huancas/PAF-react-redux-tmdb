import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
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
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

export const getImageUrl = (path) => {
    return `${IMAGE_BASE_URL}${path}`;
};

