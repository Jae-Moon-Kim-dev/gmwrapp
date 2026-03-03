"use client"

import { PagenationTableProps } from '@/app/types/common/table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { ReactNode, useCallback } from 'react';
import { Pagination, Table } from 'react-bootstrap';

const PaginationTable = <T extends object>( { 
    data, 
    columns, 
    total,
    onPaginationChange,
    pagination,
    children,
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



    const getPaginationNode = useCallback(():ReactNode => {
        if ( !!data.length && tanstackTable ) {
            const currPage = tanstackTable.getState().pagination.pageIndex +1;
            const pageIndex = tanstackTable.getState().pagination.pageIndex;
            const pageSize = tanstackTable.getState().pagination.pageSize;
            const currPageSize = (Math.floor(pageIndex / pageSize) +1) * pageSize;
            const endPage = tanstackTable.getPageCount();
            // console.log('currPage: ', currPage, ', endPage: ', endPage);
            // console.log('total: ', (total));
            // console.log('pageIndex: ', pageIndex);
            // console.log('pageSize: ', pageSize);
            // console.log('startPageSize: ', (total % tanstackTable.getState().pagination.pageSize));
            const startPageSize = (Math.floor(pageIndex / pageSize) * pageSize) + 1;
            const endPageSize = currPageSize > endPage ? endPage : currPageSize;
    
            const paginationNode:ReactNode[] = [];
    
            paginationNode.push(<Pagination.First key={'first'} disabled={ currPage <= pageSize } onClick={() => {tanstackTable.setPageIndex(currPageSize > endPage ? Math.floor(pageIndex / pageSize) * pageSize -1 : endPageSize - pageSize -1)}} />);
            paginationNode.push(<Pagination.Prev key={'prev'} disabled={ currPage === 1 } onClick={() => {tanstackTable.previousPage()}} />);
            
            for ( let i=(startPageSize-1); i < endPageSize; i++ ) {
                paginationNode.push(<Pagination.Item key={`page-${i+1}`} active={(i+1) === currPage} onClick={() => {tanstackTable.setPageIndex(i)}} >{i+1}</Pagination.Item>); 
            }
        
            paginationNode.push(<Pagination.Next key={'next'} disabled={ currPage === endPage } onClick={() => {tanstackTable.nextPage()}} />);
            paginationNode.push(<Pagination.Last key={'last'} disabled={ currPageSize >= endPage } onClick={() => {tanstackTable.setPageIndex(endPageSize)}} />);
        
            return paginationNode;
        }
    }, [data.length, tanstackTable]);

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
                <td 
                    key={cell.id}
                    style={{
                        width: cell.column.getSize() !== Number.MAX_SAFE_INTEGER ? `${cell.column.getSize()}px` : undefined,
                    }}
                    className={cell.column.columnDef.meta?.cellClassName}
                >
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
    { children && children }
    </>;
};

export default PaginationTable;