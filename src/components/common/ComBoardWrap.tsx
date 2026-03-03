"use client";

import { fetchUserRole } from '@/app/api/common/common';
import { ComPageProps, Role } from '@/app/types/common/board';
import { useQueryResult } from '@/hooks/useQueryResult';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ComBoard from './ComBoard';
import ComEditBoard from './ComEditBoard';
import { BoardContext } from '@/context/BoardProvider';
import ComDetailBoardWrap from './ComDetailBoardWrap';
import { useRouter, useSearchParams } from 'next/navigation';

const ComBoardWrap = ({
  menuId,
  roleId,
}:ComPageProps) => {
  // const { pagination, onPaginationChange } = usePagination();
  const searchParams = useSearchParams();
  const boardId = searchParams?.get("boardId");
  const { isModify, setModify } = useContext(BoardContext);
  
  const { data: userRole } = useQueryResult<Role>(
    ['fetchRoleByUser', menuId, roleId], 
    useCallback(async ({queryKey}) => 
      await fetchUserRole(queryKey[1] as string, queryKey[2] as string), []));
  // const { data: item } = useQueryResult<BoardApiData>(
  //   ['boardListData',menuId , pagination], 
  //   useCallback(async ({ queryKey }) => 
  //     await fetchBoardList(queryKey[1] as Pagination), []));

  useEffect(() => {
    return ()=> {
      setModify(false);
    }
  }, []);

  return (
    <>
      {
        isModify ?
        ( boardId ? 
          <ComDetailBoardWrap 
            menuId= {menuId}
            roleId= {roleId}
            boardId= {boardId}
          /> 
        : 
        <ComEditBoard
          menuId= {menuId}
          roleId= {roleId}
        />)
        :
        <ComBoard
          menuId= {menuId}
        />
      }
      {
        (userRole && ((userRole.admin_yn === 'Y' || userRole.write_yn === 'Y') && !isModify)) && 
        <div className='d-flex flex-row-reverse my-3'>
          { 
          <Button variant="primary" className='mx-3' onClick={()=> {setModify(true);}} >글쓰기</Button>
          }
        </div>
      }
    </>
  );
}

export default ComBoardWrap;
