import React from 'react'
import Dashboard from './Dashboard';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import Reports from './Reports';
// import Settings from './Settings';
import MainLayout from '../layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';

const Home = () => {
    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/reports" element={<Reports />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}

                    <Route path="*" element={<NotFound />} />

                </Routes>
            </MainLayout>
        </>
    )
}

export default Home
