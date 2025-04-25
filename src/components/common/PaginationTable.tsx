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
        const currPageSize = tanstackTable.getState().pagination.pageIndex +1;
        const endPage = tanstackTable.getPageCount();
        const startPageSize = (currPageSize > endPage-4) ? (endPage-6) : (currPageSize < 6) ? 1 : (currPageSize -2);
        const endPageSize = currPageSize === endPage ? endPage : currPageSize +2;

        const paginationNode:ReactNode[] = [];

        paginationNode.push(<Pagination.First key={'first'} disabled={ currPageSize === 1 } onClick={() => {tanstackTable.firstPage()}} />);
        paginationNode.push(<Pagination.Prev key={'prev'} disabled={ currPageSize === 1 } onClick={() => {tanstackTable.previousPage()}} />);
        paginationNode.push(<Pagination.Item key={`page-1`} active={1 === currPageSize} onClick={() => {tanstackTable.setPageIndex(0)}} >{1}</Pagination.Item>);
        if ( currPageSize > 5 ) paginationNode.push(<Pagination.Ellipsis key={"ellipsis-start"} disabled={ currPageSize < 6 } onClick={() =>tanstackTable.setPageIndex(currPageSize-4)} />);

        for ( let i=(startPageSize-1); i < endPageSize; i++ ) {
            if ( (i+1) > 1 && (i+1) < endPage ) paginationNode.push(<Pagination.Item key={`page-${i+1}`} active={(i+1) === currPageSize} onClick={() => {tanstackTable.setPageIndex(i)}} >{i+1}</Pagination.Item>); 
        }
    
        if ( currPageSize < (endPage-3)) paginationNode.push(<Pagination.Ellipsis key={"ellipsis-end"} disabled={ currPageSize > endPage-4 } onClick={() =>tanstackTable.setPageIndex(currPageSize+2)} />);
        if ( endPage > 1 ) paginationNode.push(<Pagination.Item key={`page-${endPage}`} active={endPage === currPageSize} onClick={() => {tanstackTable.setPageIndex(endPage-1)}} >{endPage}</Pagination.Item>);
        paginationNode.push(<Pagination.Next key={'next'} disabled={ currPageSize === endPage } onClick={() => {tanstackTable.nextPage()}} />);
        paginationNode.push(<Pagination.Last key={'last'} disabled={ currPageSize === endPage } onClick={() => {tanstackTable.setPageIndex(endPage-1)}} />);
        
        return paginationNode;
    }

    return <>
    <Table hover bordered striped >
        <thead>
            {tanstackTable.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                <th key={header.id} className='text-center' >
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
    <Pagination key={'pagination'} className='d-flex justify-content-center'>
        {getPaginationNode()}
    </Pagination>
    </>;
};

export default PaginationTable;