import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { BsLayoutSidebarInset } from 'react-icons/bs';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="flex-grow">
                <Navbar />
                <button className="lg:hidden p-2" onClick={toggleSidebar}>
                    <BsLayoutSidebarInset size={24} />
                </button>
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;