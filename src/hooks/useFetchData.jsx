import { useState, useEffect } from 'react';
import axios from 'axios';
import { useApiContext } from '../context/ApiContext';

const useFetchData = (url) => {
    const { host, token } = useApiContext(); // Assuming token is provided by ApiContext

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host}/api${url}`, {
                    headers: {
                        Authorization: localStorage.getItem('authToken')
                    }
                });

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error.response.data.message);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url, host, token]);

    return { data, loading, error };
};

export default useFetchData;