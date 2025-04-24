"use client";
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import PaginationTable from '@/components/common/PaginationTable';
import { ColumnDef } from '@tanstack/react-table';
import { MemberApiData, MemberData } from '@/app/types/admin/member';
import { fetchMemberListData } from '@/app/api/admin/member';
import { useQueryResult } from '@/hooks/useQueryResult';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/app/types/common/table';
import { Col, Form, Row } from 'react-bootstrap';

const Member = () => {

  const { pagination, onPaginationChange, onPageSizeChange } = usePagination();
  const { data: item } = useQueryResult<MemberApiData>(['adminMemberListData', pagination], ({ queryKey }) => fetchMemberListData(queryKey[1] as Pagination));
  
  const columns: ColumnDef<MemberData>[] = [
      {
        accessorKey: 'rownum',
        id: 'rownum', 
        header: '번호',
      },
      {
        accessorKey: 'name',
        id: 'name',
        header: '이름',
      },
      {
        accessorKey: 'mem_id',
        id: 'mem_id',
        header: '아이디',
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: '이메일',
      },
      {
        accessorKey: 'cel_num',
        id: 'cel_num',
        header: '연락처',
      },
      {
        accessorKey: 'role_name',
        id: 'role_name',
        header: '회원구분',
      },
      {
        accessorKey: 'created_at',
        id: 'created_at',
        header: '가입일',
      },
  ];

  useEffect(()=> {
    handleSelectedMenu('/admin/member');
  }, []);

  useEffect(() => {
    if (item && item['member_list'] && !!item['member_list'].length) {
      console.log(item);
    }
  }, [(item && item['member_list'] && !!item['member_list'].length)]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container" >
        <ol className="breadcrumb mt-4">
          <li className="breadcrumb-item"><Link href="/" >Home</Link></li>
          <li className="breadcrumb-item"><Link href="/admin/menu/">회원 관리</Link></li>
          <li className="breadcrumb-item active">회원 관리</li>
        </ol>
        <hr/>
        <div className='row' >
          <div className='col p-3'>
            <Row>
              <Col xs={2} >
                <Form.Select></Form.Select>
              </Col>
              <Col xs={3} >
                <Form.Select></Form.Select>
              </Col>
              <Col xs={3} >
                <Form.Select></Form.Select>
              </Col>
              <Col xs={4} >
                <Form.Select></Form.Select>
              </Col>
            </Row>
            
            <PaginationTable<MemberData>
                columns={columns}
                data={item && item.member_list as MemberData[] || []}
                onPaginationChange={onPaginationChange}
                pagination={pagination}
                total={item && item.total_cnt || 0}
              /> 
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Member;
