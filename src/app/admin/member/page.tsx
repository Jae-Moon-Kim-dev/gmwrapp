"use client";
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import PaginationTable from '@/components/common/PaginationTable';
import { ColumnDef } from '@tanstack/react-table';
import { MemberApiData, MemberData, SearchQuery } from '@/app/types/admin/member';
import { fetchMemberListData, fetchRoleListData } from '@/app/api/admin/member';
import { useQueryResult } from '@/hooks/useQueryResult';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/app/types/common/table';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ISelectData } from '@/app/types/common/select';
import { memberSearchParam } from '@/app/types/common/common';
import { Controller, useForm, useWatch } from 'react-hook-form';

const Member = () => {

  
  const { pagination, onPaginationChange, onPageSizeChange } = usePagination();
  const [ searchQuery, setSearchQuery ] = useState<SearchQuery>({
    role_id: '',
    searchParam: '',
    searchText: '',
  });
  
  const searchForm = useForm({
    defaultValues: {
      role_id: '',
      searchParam: '',
      searchText: '',
    }
  });
  
  const { control, getValues, setValue } = searchForm;

  const { data: item, refetch } = useQueryResult<MemberApiData>(['adminMemberListData', pagination, searchQuery], useCallback(async ({ queryKey }) => await fetchMemberListData(queryKey[1] as Pagination, queryKey[2] as SearchQuery), []));
  const { data: roleItems } = useQueryResult<ISelectData[]>(['roleListData'], useCallback(async () => await fetchRoleListData(), []));

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

  const handleSearch = () => {
    setSearchQuery(getValues());
  }

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
            <Row className='mb-3 mx-1 px-1 py-3 bg-light rounded-2' >
              <Col xs={3} >
                <Row>
                  <Col xs={5} className='ps-4 pe-2 pt-2 text-dark fs-6' >회원 검색</Col>
                  <Col xs={7}>
                  <Controller
                    name='role_id'
                    control={control}
                    render={({
                        field, 
                        field: {onChange},
                    }) => (
                      <Form.Select {...field} onChange={onChange} >
                        <option value={''} >전체</option>
                        {roleItems && roleItems.map(a => {
                          const { value, label } = a;
                          return <option key={`role-${value}`} value={value}>{label}</option>;
                        })}
                      </Form.Select>
                    )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={3} >
                <Controller
                  name='searchParam'
                  control={control}
                  render={({
                      field, 
                      field: {onChange},
                  }) => (
                    <Form.Select {...field}>
                    {
                      memberSearchParam && memberSearchParam.map(a => {
                        const { value, label } = a;
                        return <option key={`search-${value}`} value={value}>{label}</option>;
                      })
                    }
                  </Form.Select>
                  )}
                />
              </Col>
              <Col xs={6} >
              <Row>
                <Col xs="10">
                  <Controller
                    name='searchText'
                    control={control}
                    render={({
                        field, 
                        field: {onChange},
                    }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        onChange={onChange}
                        placeholder="Search"
                        className="mr-sm-2"
                      />
                    )}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="button" onClick={handleSearch} >검색</Button>
                </Col>
              </Row>
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
