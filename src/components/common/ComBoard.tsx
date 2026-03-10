"use client";

import { fetchBoardList } from '@/app/api/common/common';
import { BoardApiData, BoardData } from '@/app/types/common/board';
import { Pagination } from '@/app/types/common/table';
import { usePagination } from '@/hooks/usePagination';
import { useQueryResult } from '@/hooks/useQueryResult';
import { ColumnDef } from '@tanstack/react-table';
import React, { ReactNode, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import PaginationTable from './PaginationTable';

const ComBoard = ({
  menuId,
}:{
  menuId: string | null | undefined
}) => {
  const { pagination, onPaginationChange } = usePagination();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  // const [isModify, setModify] = useState<boolean>(false);
  
  // const { data: userRole } = useQueryResult<Role>(
  //   ['fetchRoleByUser', menuId, roleId], 
  //   useCallback(async ({queryKey}) => 
  //     await fetchUserRole(queryKey[1] as string, queryKey[2] as string), []));
  const { data: item } = useQueryResult<BoardApiData>(
    ['boardListData', menuId , pagination], 
    useCallback(async ({ queryKey }) => 
      await fetchBoardList(queryKey[1] as string, queryKey[2] as Pagination), [])
  );

  const goDetail = useCallback((boardId: string) => {
    if ( searchParams ) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('boardId', boardId);
      params.delete('mode');
      router.push(`${pathName}?${params.toString()}`);
    }
  }, [searchParams]);

  const columns: ColumnDef<BoardData>[] = [
    {
      accessorKey: 'rownum',
      id: 'rownum', 
      header: '번호',
      maxSize: 30,
      meta: {
        cellClassName: 'text-center align-middle **cursor-pointer**',
      },
    },
    {
      accessorKey: 'board_title',
      id: 'board_title',
      header: '제목',
      meta: {
        cellClassName: 'text-left align-middle',
      },
      cell: ({ getValue, row }) => {
        const rowData = row.original;
        return <a href="#" onClick={() => goDetail((rowData.board_id).toString())} >{getValue() as ReactNode}</a>;
      }
    },
    {
      accessorKey: 'created_name',
      id: 'created_name',
      header: '작성자',
      maxSize: 50,
      meta: {
        cellClassName: 'text-center align-middle',
      },
    },
    {
      accessorKey: 'create_date',
      id: 'create_date',
      header: '등록일',
      maxSize: 50,
      meta: {
        cellClassName: 'text-center align-middle',
      },
    },
    {
      accessorKey: 'like_count',
      id: 'like_count',
      header: '추천',
      maxSize: 30,
      meta: {
        cellClassName: 'text-center align-middle',
      },
    },
    {
      accessorKey: 'views_count',
      id: 'views_count',
      header: '조회',
      maxSize: 30,
      meta: {
        cellClassName: 'text-center align-middle',
      },
    },
  ];

  return (
    <>
    <PaginationTable<BoardData>
      columns={columns}
      data={item && item.board_list as BoardData[] || []}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      total={item && item.total_cnt || 0}
    /> 
    </>
  );
}

export default ComBoard;
