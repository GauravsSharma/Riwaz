"use client";
import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper
} from '@tanstack/react-table';
const columnHelper = createColumnHelper();
const ordersData = [
    { id: '#8567', customer: 'Rahul Mohamed', status: 'Delivered', amount: '$64.65' },
    { id: '#8563', customer: 'Saleb Mehmet', status: 'Processing', amount: '$64.65' },
    { id: '#8549', customer: 'Julie Jewels', status: 'Shipped', amount: '$64.65' },
    { id: '#8505', customer: 'Rayhan Kabir', status: 'Delivered', amount: '$64.65' },
    { id: '#8571', customer: 'Shagor Rahman', status: 'Processing', amount: '$64.65' },
];

const page = () => {
    // Define columns for the orders table
    const columns = useMemo(
        () => [
            columnHelper.accessor('id', {
                header: 'Order ID',
                cell: info => (
                    <span className="font-medium text-gray-900">{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor('customer', {
                header: 'Customer',
                cell: info => (
                    <span className="text-gray-900">{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: info => {
                    const status = info.getValue();
                    const getStatusColor = (status) => {
                        switch (status) {
                            case 'Delivered':
                                return 'bg-green-100 text-green-800';
                            case 'Processing':
                                return 'bg-yellow-100 text-yellow-800';
                            case 'Shipped':
                                return 'bg-blue-100 text-blue-800';
                            default:
                                return 'bg-gray-100 text-gray-800';
                        }
                    };
                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    );
                },
            }),
            columnHelper.accessor('amount', {
                header: 'Amount',
                cell: info => (
                    <span className="font-medium text-gray-900">{info.getValue()}</span>
                ),
            }),
        ],
        []
    );

    const table = useReactTable({
        data: ordersData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className='p-6 bg-gray-50 min-h-screen w-full'>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <div className="overflow-hidden mt-10">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
