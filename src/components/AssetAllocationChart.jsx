import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// const data = [
//   { name: 'Stocks', value: 60 },
//   { name: 'Bonds', value: 25 },
//   { name: 'Real Estate', value: 15 },
// ];

const COLORS = ['#8884d8', '#00C49F', '#FFBB28'];

const AssetAllocationChart = ({ assetAllocation }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-white p-6 rounded-lg mt-4 card-shadow ">
      <h3 className="text-xl font-semibold mb-2 w-full">Asset Allocation</h3>
      <PieChart width={200} height={220}>
        <Pie
          data={assetAllocation}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
        >
          {assetAllocation.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Custom Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        {assetAllocation.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            {/* Color box */}
            <div
              className="w-4 h-4"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            {/* Label */}
            <span className="text-gray-500">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAllocationChart;