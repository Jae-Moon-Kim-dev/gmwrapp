"use client"

import { TableProps } from '@/app/types/common/table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { ReactNode } from 'react';

const Table = <T extends object>( { data, columns }: TableProps<T> ):ReactNode => {
    const tanstackTable = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), });

    return <table className="table table-hover">
        <thead>
            {tanstackTable.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                <th key={header.id}>
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
        <tbody>
            {tanstackTable.getRowModel().rows.map(row => (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
    </table>;
};

export default Table;