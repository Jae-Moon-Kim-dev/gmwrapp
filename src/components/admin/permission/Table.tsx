/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { TableProps } from '@/app/types/common/table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { ReactNode } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const Table = <T extends object>( { data, columns }: TableProps<T> ):ReactNode => {
    const tanstackTable = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), });

    return <BootstrapTable  hover bordered >
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
            {tanstackTable.getRowModel().rows.map((row, rowIndex, allRows) => {
                const getValue = (key: keyof T) => row.getValue(key as any);
                const prevRow = allRows[rowIndex-1];

                return (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => {
                            const { className, style, isRowSpan } = (cell.column.columnDef.meta as any) || {};
                            const currentValue = getValue(cell.column.id as keyof T);
                            const prevValue = prevRow?.getValue(cell.column.id);
                            const showRowSpan = currentValue !== prevValue;
                            const rowSpan = allRows.filter(a => a.getValue(cell.column.id) === currentValue ).length;
                            
                            if ( isRowSpan ) {
                                if (showRowSpan) {
                                    return (<td key={cell.id} rowSpan={rowSpan} className={className} style={style} >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>);
                                } else {
                                    return null;
                                }
                            } else {
                                return (<td key={cell.id} className={className} style={style}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>);
                            }
                        })}
                    </tr>);
            })}
        </tbody>
    </BootstrapTable>;
};

export default Table;