import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 10 },
  { value: 120 },
  { value: 60 },
  { value: 130 },
  { value: 125 },
  { value: 180 },
];

const AccountOverview = ({ totalValue }) => {
  return (
    <div className='container mx-auto'>
      <h3 className="text-xl font-semibold mb-2">Account Overview</h3>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

        {/* Card 1: Total Portfolio Value */}
        <div className="bg-white rounded-lg p-6 flex-1 relative card-shadow">
          <div className="absolute top-4 right-4 text-green-500">+4.7%</div>
          <h3 className="text-xl font-semibold mb-4">Total Portfolio Value</h3>
          <p className="text-3xl font-bold">£{totalValue.toLocaleString()}</p>
          <div className="h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Recent Performance */}
        <div className="bg-white rounded-lg p-6 flex-1 relative card-shadow">
          <div className="absolute top-4 right-4 text-green-500">+12.4%</div>
          <h3 className="text-xl font-semibold mb-4">Recent Performance</h3>
          <p className="text-3xl font-bold">+5%</p>
          <div className="h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
