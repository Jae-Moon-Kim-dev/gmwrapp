"use client"

import { PagenationTableProps, TableProps } from '@/app/types/common/table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { ReactNode } from 'react';
import { Pagination, Table } from 'react-bootstrap';

const PaginationTable = <T extends object>( { 
    data, 
    columns, 
    total,
    onPaginationChange,
    pagination,
} : PagenationTableProps<T> ):ReactNode => {
    const tanstackTable = useReactTable({ 
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(), 
        manualPagination: true,
        rowCount: total,
        onPaginationChange,
        state: { pagination },
    });



    const getPaginationNode = ():ReactNode => {
        const { pageIndex, pageSize } = pagination;
        const currPageSize = tanstackTable.getState().pagination.pageIndex +1;
        let currStartPage = (currPageSize % pageSize === 0) ? Math.floor((currPageSize-1) / pageSize + 1) : Math.floor(currPageSize / pageSize + 1);
        let currEndPag = (currPageSize % pageSize === 0) ? currPageSize : 
        
        console.log('currPageSize', currPageSize);
        console.log('currStartPage', currStartPage);

        const paginationNode:ReactNode[] = [];

        paginationNode.push(<Pagination.First onClick={() => {tanstackTable.setPageIndex(0)}} />);
        paginationNode.push(<Pagination.Prev onClick={() => {tanstackTable.previousPage()}} />);
        // <Pagination.Ellipsis />
        for ( currStartPage; currStartPage < currPageSize; currStartPage++ ) {
            console.log(currStartPage);
        }

        // for ( let i=0; i < currPageSize; i++ ) {
        //     paginationNode = <>
        //         <Pagination.First />
        //         <Pagination.Prev />
        //         <Pagination.Item>{startPage}</Pagination.Item>
        //         if ()

        //     </>;
        // }

        return <></>;
    }

    return <>
    <Table hover bordered striped >
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
    </Table>
    <Pagination  >
        {getPaginationNode()}
        <Pagination.First onClick={() => {tanstackTable.setPageIndex(0)}} />
        <Pagination.Prev onClick={() => {tanstackTable.previousPage()}} />
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(0)}} >{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(4)}} >{5}</Pagination.Item>
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(5)}}>{6}</Pagination.Item>
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(6)}} active>{7}</Pagination.Item>
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(7)}} >{8}</Pagination.Item>
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(8)}} >{9}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => {tanstackTable.setPageIndex(9)}}>{10}</Pagination.Item>
        <Pagination.Next onClick={() => {tanstackTable.nextPage()}} />
        <Pagination.Last />        
    </Pagination>
    </>;
};

export default PaginationTable;