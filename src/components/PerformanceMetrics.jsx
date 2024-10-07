import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Jan', value: 400 },
//   { name: 'Feb', value: 300 },
//   { name: 'Mar', value: 200 },
//   { name: 'Apr', value: 278 },
//   { name: 'May', value: 189 },
// ];

const PerformanceMetrics = ({ monthlyData }) => {
  return (
    <div className="bg-white p-6 rounded-lg mt-4 card-shadow ">
      <h3 className="text-xl font-semibold mb-2">Portfolio Performance Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: 'none' }} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceMetrics;