import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useApiContext } from '../../context/ApiContext';
import { MdOutlineLogout } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const AdminPanel = () => {
    const { host, getAllInvestments, investments, addInvestment, editInvestment, loading } = useApiContext();
    const [activeSection, setActiveSection] = useState('view');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentInvestment, setCurrentInvestment] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/admin/login');
    }

    useEffect(() => {
        getAllInvestments();
    }, [host]);

    const onSubmit = async (data) => {
        if (currentInvestment) {
            await editInvestment(data, currentInvestment._id);
        } else {
            await addInvestment(data);
        }
        reset();
        setCurrentInvestment(null);
        setActiveSection('view');
    };

    const handleEditInvestment = (investment) => {
        setCurrentInvestment(investment);
        setValue('date', investment.date);
        setValue('type', investment.type);
        setValue('amount', investment.amount);
        setActiveSection('add');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!localStorage.getItem('adminToken')) {
        return <Navigate to="/admin/login" />
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`sidebar lg:w-64 w-52 bg-gray-800 text-white min-h-screen p-4 flex flex-col fixed md:relative transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50`}>
                <div className="mb-4">
                    <h2 className="text-xl font-bold flex justify-center">
                        <img src={logo} alt="logo" className='logo' />
                    </h2>
                </div>
                <ul className='flex flex-col justify-between h-full'>
                    <div>
                        <li
                            className={`p-2 cursor-pointer rounded ${activeSection === 'view' ? 'bg-gray-700' : ''}`}
                            onClick={() => setActiveSection('view')}
                        >
                            View/Edit Investments
                        </li>
                        <li
                            className={`p-2 cursor-pointer rounded ${activeSection === 'add' ? 'bg-gray-700' : ''}`}
                            onClick={() => {
                                setCurrentInvestment(null);
                                reset();
                                setActiveSection('add');
                            }}
                        >
                            Add Investment
                        </li>
                    </div>

                    <li
                        className={`p-2 cursor-pointer bg-red-500 rounded hover:bg-red-600 flex items-center gap-2`}
                        onClick={handleLogout}
                    >
                        <MdOutlineLogout size={20} /> Logout
                    </li>
                </ul>
            </div>

            {/* Navbar */}
            <div className="flex-grow">
                <nav className="bg-darkPriamry text-white p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                    <button className="md:hidden bg-blue-500 text-white p-2 rounded" onClick={toggleSidebar}>
                        {isSidebarOpen ? 'Close' : 'Open'} Sidebar
                    </button>
                </nav>

                {/* Main Content */}
                <div className="container mx-auto p-4 w-full">
                    {activeSection === 'add' && (
                        <div className="my-8 p-6 rounded-sm card-shadow bg-white">
                            <h2 className="text-xl font-semibold mb-4">{currentInvestment ? 'Edit Investment' : 'Add New Investment'}</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        {...register('date', { required: 'Date is required' })}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Type</label>
                                    <input
                                        type="text"
                                        {...register('type', { required: 'Type is required' })}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                    {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Amount</label>
                                    <input
                                        type="number"
                                        {...register('amount', { required: 'Amount is required' })}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                    {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                                </div>
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : currentInvestment ? "Update Investment" : "Add Investment"}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeSection === 'view' && (
                        <div className="my-8 p-6 rounded-sm card-shadow bg-white">
                            <h2 className="text-xl font-semibold mb-4">View/Edit Investments</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left">Date</th>
                                            <th className="px-4 py-2 text-left">Type</th>
                                            <th className="px-4 py-2 text-left">Amount</th>
                                            <th className="px-4 py-2 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && <td className="text-center font-semibold text-xl py-5" colSpan={4}>Loading...</td>}
                                        {Array.isArray(investments) && investments.length > 0 ? (
                                            investments.map(investment => (
                                                <tr key={investment._id}>
                                                    <td className="border px-4 py-2">{investment.date}</td>
                                                    <td className="border px-4 py-2">{investment.type}</td>
                                                    <td className="border px-4 py-2">{investment.amount}</td>
                                                    <td className="border px-4 py-2">
                                                        <button
                                                            onClick={() => handleEditInvestment(investment)}
                                                            className="bg-yellow-500 text-white p-2 rounded mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">No investments found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;