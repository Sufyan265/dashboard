import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import useFetchData from '../hooks/useFetchData';
import TransactionPage from '../components/TransactionHistory';
import Transactions from './Transactions';

const ReportPage = () => {

    const { data, loading, error } = useFetchData("/dashboard");
    console.log(data)

    if (loading) {
        return <p className='text-lg'>Loading...</p>;
    }

    if (error) {
        return <p className='text-red-600'>Error: {error.message}</p>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const performanceData = [
        { name: 'Jan', performance: 5 },
        { name: 'Feb', performance: 7 },
        { name: 'Mar', performance: 10 },
        { name: 'Apr', performance: 9 },
        { name: 'May', performance: 12 }
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Annual Reports</h1>

            {/* Account Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="bg-white p-4 card-shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Portfolio Value: ${data.portfolio.totalValue}</h2>
                    {data.portfolio.monthlyData && (
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={data.portfolio.monthlyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#ccc" />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="bg-white p-4 card-shadow">
                    <h2 className="text-lg font-semibold mb-2">Asset Allocation</h2>
                    <div className="flex justify-center">
                        {data.portfolio.assetAllocation && (
                            <PieChart width={200} height={250}>
                                <Pie data={data.portfolio.assetAllocation} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                                    {data.portfolio.assetAllocation.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                <div className="bg-white p-4 card-shadow flex gap-4">
                    <a href="/transactions" className="text-primary">Transaction History</a>
                    <a href="/statements" className="text-primary">Statements</a>
                    <a href="/portfolio" className="text-primary">Portfolio</a>
                </div>
            </div>

            {/* Performance Section */}
            <div className="mt-8 p-6 rounded-sm card-shadow bg-white">
                <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
                {performanceData && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" />
                            <Line type="monotone" dataKey="performance" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Transaction History Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                <div className="bg-white p-4 card-shadow">
                    <Transactions />
                </div>
            </div>

            {/* Advisory Notes Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Advisory Notes</h2>
                <div className="bg-white p-4 card-shadow">
                    <p className="text-gray-700">Here you can explain the current investment strategy and recent changes.</p>
                </div>
            </div>

        </div>
    );
};

export default ReportPage;