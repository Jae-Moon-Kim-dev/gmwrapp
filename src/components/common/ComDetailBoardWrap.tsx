"use client";

import { fetchBoardData, fetchUserRole } from '@/app/api/common/common';
import { BoardUpdateData, ComPageProps, Role } from '@/app/types/common/board';
import { useQueryResult } from '@/hooks/useQueryResult';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ComEditBoard from './ComEditBoard';
import ComDetailBoard from './ComDetailBoard';
import { userStore } from '@/stores/userStore';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const ComDetailBoardWrap = ({
  menuId,
  roleId,
  boardId,
}:ComPageProps) => {
  const user = userStore((state) => state.user);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const mode = searchParams?.get("mode");
  const isDetailModify = mode === 'edit';
  const [ isAdminView, setAdminView] = useState<boolean>(false);
  
  const { data: userRole } = useQueryResult<Role>(
    ['fetchRoleByUser', menuId, roleId], 
    useCallback(async ({queryKey}) => 
      await fetchUserRole(queryKey[1] as string, queryKey[2] as string), []));
  const { data: boardItem } = useQueryResult<BoardUpdateData>(['fetchBoardData', boardId], useCallback(async ({queryKey}) => await fetchBoardData(queryKey[1] as string), []));

  const goEdit = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('mode', 'edit');
    router.push(`${pathName}?${params.toString()}`);
  };

  const handleChangeAdminYn = (event: ChangeEvent<HTMLInputElement>) => {
    setAdminView(event.target.checked);
  };

  return (
    <>
      <p>ComDetailBoardWrap</p>
      {
        isDetailModify ?
        <ComEditBoard
          menuId= {menuId}
          roleId= {roleId}
          boardData={boardItem}
        />
        : 
        <ComDetailBoard 
          menuId= {menuId}
          roleId= {roleId}
          boardId= {boardId}
          boardData={boardItem}
        /> 
      }
      {
        (userRole && (userRole.admin_yn === 'Y' || userRole.write_yn === 'Y') && !isDetailModify) &&
        <div className='d-flex flex-row-reverse my-3'>
          <Button variant="primary" className='mx-3' onClick={goEdit}>수정</Button>
        </div>
      }
      {
          !isDetailModify && (
          <Form className='mt-5' >
            { (user && user.mem_id) &&
            <Row>
              <Col xs={10} >
                <Form.Group>
                  <Form.Label className='d-flex' >
                    <p className='mx-2' >{ isAdminView ? '운영자' : user.name}</p>
                    { userRole?.admin_yn === 'Y' && <Form.Check type={'checkbox'} id={'admin_yn'} label={'운영자로 표시'} onChange={handleChangeAdminYn} />}
                  </Form.Label>
                  <Form.Control as="textarea" cols={50} rows={4} />
                </Form.Group>
              </Col>
              <Col xs={2} className='pt-3' >
                <Button variant="primary" className='mt-3' size='lg' onClick={()=> {}} >등록</Button>
              </Col> 
            </Row>
            }
          </Form>
          )
      }
    </>
  );
}

export default ComDetailBoardWrap;
