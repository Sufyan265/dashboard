import React from 'react';
import PerformanceMetrics from '../components/PerformanceMetrics';
import useFetchData from '../hooks/useFetchData';

const Portfolio = () => {

  const { data, loading, error } = useFetchData("/portfolio");

  if (loading) {
    return <p className='text-lg'>Loading...</p>;
  }

  if (error) {
    return <p className='text-red-600'>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Portfolio Details</h2>
      <PerformanceMetrics monthlyData={data.monthlyData} />
    </div>
  );
};

export default Portfolio;
