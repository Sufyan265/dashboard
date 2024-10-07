import React from 'react';
import AccountOverview from '../components/AccountOverview';
import AssetAllocationChart from '../components/AssetAllocationChart';
import PerformanceMetrics from '../components/PerformanceMetrics';
import { Navigate } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

const Dashboard = () => {
    if (!localStorage.getItem('authToken')) {
        return <Navigate to='/login' />;
    }

    const { data, loading, error } = useFetchData("/dashboard");
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className='text-red-600'>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Dashboard</h2>
            <AccountOverview totalValue={data.portfolio.totalValue} />
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
                <div className="lg:col-span-7 ">
                    <PerformanceMetrics monthlyData={data.portfolio.monthlyData} />
                </div>
                <div className="lg:col-span-4 ">
                    <AssetAllocationChart assetAllocation={data.portfolio.assetAllocation} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;