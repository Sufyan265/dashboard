import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <Navbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
