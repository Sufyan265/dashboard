import React from 'react';
import AccountOverview from '../components/AccountOverview';
import AssetAllocationChart from '../components/AssetAllocationChart';
import PerformanceMetrics from '../components/PerformanceMetrics';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

const Dashboard = () => {
    if (!localStorage.getItem('authToken')) {
        return <Navigate to='/login' />;
    }
    const navigate = useNavigate();

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

            {/* Performance Metrics */}
            <div className="my-8 p-6 rounded-sm card-shadow bg-white">
                <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 card-shadow cursor-pointer" onClick={()=> navigate("/transactions")}>
                        <h3 className="text-lg font-semibold mb-2">Initial Investment</h3>
                        <p className="text-3xl font-bold">£{data.investments[0].amount}</p>
                    </div>
                    <div className="bg-white p-4 card-shadow">
                        <h3 className="text-lg font-semibold mb-2">Current Value</h3>
                        <p className="text-3xl font-bold">£{data.portfolio.totalValue}</p>
                    </div>
                    <div className="bg-white p-4 card-shadow">
                        <h3 className="text-lg font-semibold mb-2">Gains/Losses</h3>
                        <p className="text-3xl font-bold">{data.investments[0].performanceMetrics.profit}%</p>
                    </div>
                </div>
            </div>

            {/* Portfolio Overview */}
            <AccountOverview totalValue={data.portfolio.totalValue} />

            <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
                <div className="lg:col-span-7">
                    {/* Investment Performance */}
                    <PerformanceMetrics monthlyData={data.portfolio.monthlyData} />
                </div>
                <div className="lg:col-span-4">
                    {/* Asset Allocation */}
                    <AssetAllocationChart assetAllocation={data.portfolio.assetAllocation} />
                </div>
            </div>


        </div>
    );
};

export default Dashboard;