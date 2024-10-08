import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import illustrationImage from '../assets/Rectangle 5.png';
import { MdLock } from 'react-icons/md';
import { useApiContext } from '../context/ApiContext';

const LoginPage = () => {
    const { host } = useApiContext();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, } = useForm();

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

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/');
            }

        } catch (error) {
            console.error(error);
            alert('Server error. Please try again later.');
        }
    };

    return (
        <div className="min-h-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
                    <div className="bg-white shadow-sm w-full rounded-md">
                        {/* Top Section */}
                        <div className="flex justify-between items-center mb-8 bg-secondary rounded-t-md">
                            <div className='md:p-5 p-3'>
                                <h2 className="text-2xl font-semibold text-primary font-heading">Welcome Back!</h2>
                                <p className="text-gray-400 text-sm">Sign in to continue to The Dashboard.</p>
                            </div>
                            <div>
                                <img src={illustrationImage} alt="Loading..." className="max-h-28 object-contain" />
                            </div>
                        </div>

                        <div className="md:p-8 p-4">
                            {/* Form Section */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                                        autoComplete='email'
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className={`w-full px-4 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'focus:ring-primary'}`}
                                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                        autoComplete='current-password'
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className='flex items-center'>
                                        <input type="checkbox" id="remember-me" className="mr-2 w-4 h-4" />
                                        <label htmlFor="remember-me" className="text-gray-600 text-sm">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                {errors.apiError && <p className="text-red-500 text-sm my-1 text-center">{errors.apiError.message}</p>}

                                <button type="submit" className="w-full bg-primary text-white py-2 rounded-sm hover:bg-purple-950 transition-colors" disabled={isSubmitting}>
                                    {/* {isSubmitting ? <Loading size={25} /> : 'Log In'} */}
                                    {isSubmitting ? 'Loading...' : 'Log In'}
                                </button>
                            </form>

                            {/* Forgot Password Section */}
                            <div className="w-full text-center my-7">
                                <a href="#" className="text-gray-500 flex justify-center items-center text-base">
                                    <MdLock className='mr-2 text-2xl' /> Forgot your password?
                                </a>
                            </div>

                            {/* Footer Section */}
                            <div className="mt-20 text-center text-gray-600 font-heading text-base">
                                Don’t have an account?{' '}
                                <Link to="/signup" className="text-primary font-semibold hover:underline">
                                    Sign up now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;