import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com', // Replace with actual base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchData = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(`API fetch failed: ${error.message}`);
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error(`API post failed: ${error.message}`);
    }
};

export const updateData = async (endpoint, data) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error(`API update failed: ${error.message}`);
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(`API delete failed: ${error.message}`);
    }
};
