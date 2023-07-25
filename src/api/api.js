import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE;

export const fetchData = async (page, language) => {
    try {
        const response = await axios.get(BASE_URL + `&page=${page}&language=${language}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getImageUrl = (path) => {
    return `${IMAGE_BASE_URL}${path}`;
};
