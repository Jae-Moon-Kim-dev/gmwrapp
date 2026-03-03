/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import PaginationTable from '@/components/admin/common/PaginationTable';
import { ColumnDef } from '@tanstack/react-table';
import { MemberApiData, MemberData, SearchQuery } from '@/app/types/admin/member';
import { deleteMember, fetchMemberListData, fetchRoleListData, updateMemberRole } from '@/app/api/admin/member';
import { useQueryResult } from '@/hooks/useQueryResult';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/app/types/common/table';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ISelectData } from '@/app/types/common/select';
import { memberSearchParam } from '@/app/types/common/common';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Member = () => {
  const { pagination, onPaginationChange } = usePagination();
  const queryClient = useQueryClient();

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
  
  const { control, getValues } = searchForm;
  
  const { data: item } = useQueryResult<MemberApiData>(['adminMemberListData', pagination, searchQuery], useCallback(async ({ queryKey }) => await fetchMemberListData(queryKey[1] as Pagination, queryKey[2] as SearchQuery), []));
  const { data: roleItems } = useQueryResult<ISelectData[]>(['roleListData'], useCallback(async () => await fetchRoleListData(), []));
  
  const updateMemberRoleMutation = useMutation({
    mutationFn: useCallback(({roleMembers}: {roleMembers: MemberData[]}) => updateMemberRole({roleMembers}), []),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMemberListData'] });
    }
  });

  const deleteMemberMutation = useMutation({
    mutationFn: useCallback(({deleteMembers}: {deleteMembers: MemberData[]}) => deleteMember({deleteMembers}), []),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMemberListData'] });
    }
  });

  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [selectedRole, setSelectedRole] = useState<ISelectData>();

  const handleUpdateMemberRoleData = () => {
    if ( selectedRole && memberList.filter(a => a.chkMember) ) {
      const updateMemberRole = memberList.filter(a => a.chkMember).map(a => {
        return {
          ...a,
          role_id: parseInt(selectedRole?.value),
        }
      });

      if ( updateMemberRole && !!updateMemberRole.length ) {
        updateMemberRoleMutation.mutate({
          roleMembers: updateMemberRole,
        });
      }
    }
  };

  const handleDeleteMemberData = () => {
    if ( memberList.filter(a => a.chkMember) && !!memberList.filter(a => a.chkMember).length ) {
      deleteMemberMutation.mutate({
        deleteMembers: memberList.filter(a => a.chkMember),
      });
    }
  };

  const columns: ColumnDef<MemberData>[] = [
      {
        accessorKey: 'chkMember',
        id: 'chkMember', 
        header: '선택',
        cell: ({ getValue, row }) => {
          const initialValue = (getValue() || false) as boolean;
          const [ chkValue, setChkValue ] = useState<boolean>(initialValue);

          return <>
            <div className='text-center'>
              <input type="checkbox" id='chkMember' className='form-check-input' checked={chkValue} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                setChkValue(e.target.checked);
                if ( item && item.member_list && (!!item.member_list.length) ) {
                  const member = item.member_list.find((_,idx) => idx === row.index);
                  if ( member ) {
                    setMemberList(memberList.map(a => {
                      if ( a.mem_id === member.mem_id ) {
                        return {
                          ...a,
                          chkMember: e.target.checked,
                        }
                      }

                      return a;
                    }));
                  }
                }
              }} />
            </div>
          </>;
        }
      },
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

  const getChangeMemberNode = () => {
    return <>
      <div className='d-flex' >
        <div className='pt-2 px-1' >
          선택한 회원을
        </div>
        <div className='px-1' >
          <Form.Select key='selectedRole' onChange={e => {
            setSelectedRole({
              label: e.target.options[e.target.selectedIndex].text,
              value: e.target.value,
            });
          }} >
            {roleItems && roleItems.filter(a => a.label !== '비회원').map((a) => {
              const maxRoleItem = roleItems.reduce((a, b) => {
                return a.value > b.value ? a: b;
              });
              if ( a.label === '운영자') {
                return {
                  ...a,
                  order: parseInt(maxRoleItem.value)+1,
                }
              }
              if ( a.label === '부운영자') {
                return {
                  ...a,
                  order: parseInt(maxRoleItem.value)+2,
                }
              } else {
                return {
                  ...a,
                  order: a.value
                }
              }

            }).sort((a, b) => {
              if ( a.order < b.order ) {
                return -1;
              } else if ( a.order > b.order ) {
                return 1;
              }
              return 0;
            }).map(a => {
              const { value, label } = a;
              return <option key={`selectedRole_${value}`} value={value}>{label}</option>;
            })}
          </Form.Select>
        </div>
        <div className='px-1' >
          <Button type="button" onClick={() => {handleUpdateMemberRoleData();}} >변경</Button>
        </div>
        <div className='px-1' >
          <Button type="button" onClick={() => {handleDeleteMemberData();}} >삭제</Button>
        </div>
      </div>
    </>;
  }

  useEffect(()=> {
    handleSelectedMenu('/admin/member');
  }, []);

  useEffect(() => {
    if (item && item['member_list'] && !!item['member_list'].length) {
      setMemberList(item['member_list']);
    }
  }, [item]);

  useEffect(() => {
    if ( roleItems && !!roleItems.length ) {
      setSelectedRole(roleItems.filter(a => a.label !== '비회원').map((a) => {
        const maxRoleItem = roleItems.reduce((a, b) => {
          return a.value > b.value ? a: b;
        });
        if ( a.label === '운영자') {
          return {
            ...a,
            order: parseInt(maxRoleItem.value)+1,
          }
        }
        if ( a.label === '부운영자') {
          return {
            ...a,
            order: parseInt(maxRoleItem.value)+2,
          }
        } else {
          return {
            ...a,
            order: a.value
          }
        }

      }).sort((a, b) => {
        if ( a.order < b.order ) {
          return -1;
        } else if ( a.order > b.order ) {
          return 1;
        }
        return 0;
      }).find(a => !!a));
    }

  }, [roleItems]);

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
                data={memberList as MemberData[] || []}
                onPaginationChange={onPaginationChange}
                pagination={pagination}
                total={item && item.total_cnt || 0}
                children={getChangeMemberNode()}
              /> 
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Member;
