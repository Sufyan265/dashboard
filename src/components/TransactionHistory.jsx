import React, { useState } from 'react';

// Global Filter component for searching
const GlobalFilter = ({ filterInput, setFilterInput }) => (
    <input
        value={filterInput}
        onChange={e => setFilterInput(e.target.value)}
        placeholder="Search transactions..."
        className="p-2 border border-gray-300 rounded mb-6 text-lg"
    />
);

const TransactionHistory = ({ transactionData = [] }) => {
    const [filterInput, setFilterInput] = useState('');

    // Filtered data based on search input
    const filteredData = transactionData.filter(transaction =>
        Object.values(transaction).some(value =>
            value.toString().toLowerCase().includes(filterInput.toLowerCase())
        )
    );

    return (
        <div className="py-8 px-4 bg-gray-100">
            <h1 className="text-xl md:text-3xl font-bold mb-8">Transaction History</h1>

            {/* Global Search Filter */}
            <GlobalFilter filterInput={filterInput} setFilterInput={setFilterInput} />

            {/* Transaction Table */}
            <div className="bg-white shadow-md rounded">
                <table className="min-w-full table-auto ">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="p-2 border-b border-gray-300 text-left text-lg font-semibold">No.</th>
                            <th className="p-2 border-b border-gray-300 text-left text-lg font-semibold">Date</th>
                            <th className="p-2 border-b border-gray-300 text-left text-lg font-semibold">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((transaction, index) => (
                                <tr key={index} className="hover:bg-indigo-50 ">
                                    <td className="p-2 border-b border-gray-300 text-lg text-gray-700">{index + 1}</td>
                                    <td className="p-2 border-b border-gray-300 text-lg text-gray-700">{transaction.date}</td>
                                    <td className="p-2 border-b border-gray-300 text-lg text-gray-700">{transaction.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center p-6 text-lg text-gray-500">
                                    No matching transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;