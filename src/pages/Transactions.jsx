import React from 'react';
import TransactionHistory from '../components/TransactionHistory';
import useFetchData from '../hooks/useFetchData';

const Transactions = () => {

  const { data, loading, error } = useFetchData("/transactions");

  if (loading) {
    return <p className='text-lg'>Loading...</p>;
  }

  if (error) {
    return <p className='text-red-600'>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <TransactionHistory transactionData={data} />
    </div>
  );
};

export default Transactions;
