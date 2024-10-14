import React from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login");
    };

    return (
        <nav className="bg-[#5b5991] text-white p-4 flex justify-between items-center">
            <h1 className="text-lg">Portfolio Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all flex items-center gap-1"
            >
                <MdOutlineLogout size={20} /> Logout
            </button>
        </nav>
    );
};

export default Navbar;