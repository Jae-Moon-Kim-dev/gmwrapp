"use client";
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { RoleData } from '@/app/types/admin/role/role';
import { fetchRoleListData } from '@/app/api/admin/role';
import { useQueryResult } from '@/hooks/useQueryResult';

const Role = () => {
  
  const { data: items } = useQueryResult<RoleData[]>(['adminRoleListData'], fetchRoleListData); 

  useEffect(()=> {
    handleSelectedMenu('/admin/role');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-2 px-5" >
        <ol className="breadcrumb mt-4">
          <li className="breadcrumb-item"><Link href="/" >Home</Link></li>
          <li className="breadcrumb-item"><Link href="/admin/menu/">회원 관리</Link></li>
          <li className="breadcrumb-item active">회원 구분/등급</li>
        </ol>
        <hr/>
        <div className='d-flex flex-row-reverse'>
          <div className='my-3 mx-1' >
            <button type="button" onClick={() => {}} className="btn btn-primary px-3">등급추가</button>
          </div>
        </div>
        <div>
          <Table striped hover bordered >
            <thead>
              <tr>
                <th className='text-center' >등급</th>
                <th className='text-center'>설명</th>
                <th className='text-center'></th>
              </tr>
            </thead>
            <tbody>
              {(items && !!items.length) && items.map(a => {
                const { role_id, role_name, description, edit_yn } = a;
                return <tr key={role_id} >
                  <td>{role_name}</td>
                  <td>{description}</td>
                  <td>{edit_yn === 'Y' ? <><Button size='sm' variant='link' >수정</Button>|<Button size='sm' variant='link' >삭제</Button></>: <></>}</td>
                </tr>;
              })}
              
            </tbody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}

export default Role;
