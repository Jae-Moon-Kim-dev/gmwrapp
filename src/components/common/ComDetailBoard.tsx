"use client";

import { fetchUserRole } from '@/app/api/common/common';
import { ComPageProps, Role } from '@/app/types/common/board';
import { useQueryResult } from '@/hooks/useQueryResult';
import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import * as S from '@/styles/common/ViewerComponent.styled';
import { Button, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import ComBoard from './ComBoard';
import ComEditBoard from './ComEditBoard';
import { BoardContext } from '@/context/BoardProvider';
import dynamic from 'next/dynamic';
import { userStore } from '@/stores/userStore';

const ComDetailBoard = ({
  menuId,
  roleId,
  boardData,
}:ComPageProps) => {
  const Viewer = dynamic(
    () => import('@toast-ui/react-editor').then(mod => mod.Viewer),
    { ssr: false }
  );

  const board_title = '길...';
  const board_user_name = '송인철';
  const board_user_date = '2008-07-15';
  const like_count = '3';
  const comment_count = '1';
  const views_count = '4056'
  // const { pagination, onPaginationChange } = usePagination();
  const [ isDetailModify, setDetailModify ] = useState<boolean>(false);
  
  const { data: userRole } = useQueryResult<Role>(
    ['fetchRoleByUser', menuId, roleId], 
    useCallback(async ({queryKey}) => 
      await fetchUserRole(queryKey[1] as string, queryKey[2] as string), []));  

  return (
    <>
    <p>ComDetailBoard</p>
    <Row>
      <Col>
        <p className='fw-bold'>{board_title}</p>
      </Col>
    </Row>
    <ListGroup>
      <ListGroupItem active >{board_title}</ListGroupItem>
      <ListGroupItem className='text-muted' >
        {`${board_user_name} | ${board_user_date} | 추천 ${like_count} | 댓글 ${comment_count} | 조회 ${views_count}`}
      </ListGroupItem>
      <ListGroupItem>
        <S.ViewerWrapper><Viewer initialValue={boardData?.board_content} /></S.ViewerWrapper>
      </ListGroupItem>
    </ListGroup>
    
    </>
  );
}

export default ComDetailBoard;
