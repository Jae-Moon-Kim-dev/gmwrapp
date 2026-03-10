"use client";

import { fetchUserRole } from '@/app/api/common/common';
import { ComPageProps, Role } from '@/app/types/common/board';
import { useQueryResult } from '@/hooks/useQueryResult';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import ComBoard from './ComBoard';
import ComEditBoard from './ComEditBoard';
import ComDetailBoardWrap from './ComDetailBoardWrap';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const ComBoardWrap = ({
  menuId,
  roleId,
}:ComPageProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const boardId = searchParams?.get("boardId");
  const mode = searchParams?.get("mode");

  const { data: userRole } = useQueryResult<Role>(
    ['fetchRoleByUser', menuId, roleId],
    useCallback(async ({queryKey}) =>
      await fetchUserRole(queryKey[1] as string, queryKey[2] as string), []));

  const goWrite = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('boardId');
    params.set('mode', 'new');
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      {
        boardId
          ? <ComDetailBoardWrap menuId={menuId} roleId={roleId} boardId={boardId} />
          : mode === 'new'
            ? <ComEditBoard menuId={menuId} roleId={roleId} />
            : <ComBoard menuId={menuId} />
      }
      {
        (userRole && (userRole.admin_yn === 'Y' || userRole.write_yn === 'Y') && !boardId && mode !== 'new') &&
        <div className='d-flex flex-row-reverse my-3'>
          <Button variant="primary" className='mx-3' onClick={goWrite}>글쓰기</Button>
        </div>
      }
    </>
  );
}

export default ComBoardWrap;
