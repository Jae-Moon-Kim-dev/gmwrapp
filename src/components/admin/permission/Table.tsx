"use client"

import { TableProps } from '@/app/types/common/table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { ReactNode } from 'react';
import { Table as BootTable } from 'react-bootstrap';

const Table = <T extends object>( { data, columns }: TableProps<T> ):ReactNode => {
    const tanstackTable = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), });

    return <BootTable  hover bordered >
        <thead>
            {tanstackTable.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                    const rowSpan = (header.column.columnDef.meta as any)?.rowSpan;

                    if ( !header.isPlaceholder && rowSpan !== undefined 
                            && header.id === header.column.id ) {
                        return null;
                    }

                    return (
                        <th key={header.id} colSpan={header.colSpan} rowSpan={rowSpan}  className='text-center align-middle' >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </th>
                    );
                })}
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
    </BootTable>;
};

export default Table;