import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ApiContext = createContext();

export const ApiProvider = (props) => {
    // const host = 'http://localhost:5000';
    const host = 'https://dashboard-backend-mauve.vercel.app';

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [investments, setInvestments] = useState([]);

    const addInvestment = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.post(`${host}/api/investments/add`, userData, {
                headers: {
                    "Authorization": localStorage.getItem('authToken'),
                }
            });
            if (response.status !== 201) {
                throw new Error(response);
            }
            if (response.data.success) {
                alert("Investment added successfully");
                setInvestments([...investments, response.data.investment]);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.response.data.message);
            if (error.response.data.message) {
                alert(error.response.data.message);
            }
        }
    };

    const editInvestment = async (userData, id) => {
        try {
            setLoading(true);
            const response = await axios.put(`${host}/api/investments/edit/${id}`, userData, {
                headers: {
                    "Authorization": localStorage.getItem('authToken'),
                }
            });
            if (response.status !== 200) {
                throw new Error(response);
            }
            if (response.data.success) {
                alert("Investment updated successfully");
                setInvestments(investments.map(inv => inv._id === id ? response.data.investment : inv));
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.response.data.message);
            if (error.response.data.message) {
                alert(error.response.data.message);
            }
        }
    };

    const getAllInvestments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${host}/api/investments/get`, {
                headers: {
                    "Authorization": localStorage.getItem('authToken'),
                }
            });
            if (response.status !== 200) {
                throw new Error(response);
            }
            if (response.data.success) {
                setInvestments(response.data.investments);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
            if (error.status === 401) {
                localStorage.removeItem('authToken');
                navigate('/admin/login');
            }
            else if (error.response.data.message) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <ApiContext.Provider value={{
            host,
            loading,
            investments,
            addInvestment,
            editInvestment,
            getAllInvestments,
        }}>
            {props.children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => useContext(ApiContext);