import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../../context/ApiContext';
import Login from '../../components/Login';

const AdminLogin = () => {
    const { host } = useApiContext();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const response = await axios.post(`${host}/api/users/login`, {
                email,
                password
            });

            if (response.status !== 200) {
                console.log(response.data);
                throw new Error(response.data);
            }

            if (response.data.isAdmin) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin');
            } else {
                alert('You are not an admin.');
            }

        } catch (error) {
            console.error(error);
            alert('Server error. Please try again later.');
        }
    };

    return (
        <>
            <Login onSubmit={onSubmit} heading="Login as Admin!" />
        </>
    );
};

export default AdminLogin;