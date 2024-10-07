import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Company Name</h2>
            </div>
            <div className="text-white py-4 flex flex-col justify-between h-full">
                <ul className="space-y-4">
                    <li className={`${activeItem === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition duration-300`}>
                        <Link to="/" className="block px-4 py-2" onClick={() => handleItemClick('/')}>Dashboard</Link>
                    </li>
                    <li className={`${activeItem === '/portfolio' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition duration-300`}>
                        <Link to="/portfolio" className="block px-4 py-2" onClick={() => handleItemClick('/portfolio')}>Portfolio</Link>
                    </li>
                    <li className={`${activeItem === '/transactions' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition duration-300`}>
                        <Link to="/transactions" className="block px-4 py-2" onClick={() => handleItemClick('/transactions')}>Transactions</Link>
                    </li>
                    <li className={`${activeItem === '/reports' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition duration-300`}>
                        <Link to="/reports" className="block px-4 py-2" onClick={() => handleItemClick('/reports')}>Reports</Link>
                    </li>
                    <li className={`${activeItem === '/settings' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition duration-300`}>
                        <Link to="/settings" className="block px-4 py-2" onClick={() => handleItemClick('/settings')}>Settings</Link>
                    </li>
                </ul>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">© 2024 Your Company</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;