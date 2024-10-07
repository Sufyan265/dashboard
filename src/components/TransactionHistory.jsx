import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

// Global Filter component for searching
const GlobalFilter = ({ filterInput, setFilterInput }) => (
    <input
        value={filterInput}
        onChange={e => setFilterInput(e.target.value)}
        placeholder="Search transactions..."
        className="p-2 border border-gray-300 rounded mb-4"
    />
);

const TransactionPage = ({ transactionData = [] }) => {
    const [filterInput, setFilterInput] = useState('');

    // Define columns for the table
    const columns = useMemo(
        () => [
            { Header: 'Date', accessor: 'date' },
            { Header: 'Type', accessor: 'type' },
            { Header: 'Asset', accessor: 'asset' },
            { Header: 'Quantity', accessor: 'quantity' },
            { Header: 'Price', accessor: 'price' },
            { Header: 'Total', accessor: 'total' },
            { Header: 'Fees', accessor: 'fees' },
        ],
        []
    );

    // Use React Table hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        state,
    } = useTable(
        {
            columns,
            data: transactionData,
        },
        useGlobalFilter
    );

    // Set global filter from input
    useEffect(() => {
        setGlobalFilter(filterInput);
    }, [filterInput, setGlobalFilter]);

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

            {/* Global Search Filter */}
            <GlobalFilter filterInput={filterInput} setFilterInput={setFilterInput} />

            {/* Transaction Table */}
            <div className="bg-white p-4 shadow-md rounded">
                <table {...getTableProps()} className="min-w-full table-auto">
                    <thead>
                        {headerGroups.map((headerGroup) => {
                            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...restHeaderGroupProps} className="bg-gray-200">
                                    {headerGroup.headers.map(column => {
                                        const { key, ...restColumnProps } = column.getHeaderProps();
                                        return (
                                            <th
                                                key={key}
                                                {...restColumnProps}
                                                className="p-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700"
                                            >
                                                {column.render('Header')}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.length > 0 ? (
                            rows.map((row, index) => {
                                prepareRow(row);
                                const { key, ...rowProps } = row.getRowProps();
                                return (
                                    <tr key={key} {...rowProps} className="hover:bg-gray-100">
                                        {row.cells.map(cell => {
                                            const { key: cellKey, ...cellProps } = cell.getCellProps();
                                            return (
                                                <td
                                                    key={cellKey}
                                                    {...cellProps}
                                                    className="p-2 border-b border-gray-300 text-sm text-gray-700"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center p-4 text-gray-500">
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

export default TransactionPage;