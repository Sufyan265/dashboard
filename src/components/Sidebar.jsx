import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const sidebarRef = useRef(null);

    const handleItemClick = (path) => {
        setActiveItem(path);
        onClose(); // Close sidebar on item click
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div ref={sidebarRef} className={`sidebar lg:w-64 w-52 bg-gray-800 text-white min-h-screen p-4 flex flex-col fixed md:relative transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50`}>
            <div className="mb-4">
                <h2 className="text-xl font-bold flex justify-center">
                    <img src={logo} alt="logo" className='logo'/>
                </h2>
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
                    {/* <li className={`${activeItem === '/settings' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition duration-300`}>
                        <Link to="/settings" className="block px-4 py-2" onClick={() => handleItemClick('/settings')}>Settings</Link>
                    </li> */}
                </ul>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">© 2024 EMERGING BONDS</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;