"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import { MenuRoleItem, RolesByMenu } from '@/app/types/admin/permission';
import { useQueryResult } from '@/hooks/useQueryResult';
import { fetchMenuRoleList } from '@/app/api/admin/permission';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Table from '@/components/admin/permission/Table';
import { Button, Form } from 'react-bootstrap';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';

const MenuPermission = () => {
  const { data: items } = useQueryResult<MenuRoleItem[]>(['adminMenuRoleListData'], fetchMenuRoleList);
  const [ menuRoles, setMenuRoles ] = useState<MenuRoleItem[]>([]);
  const columnHelper = createColumnHelper<MenuRoleItem>();

  const menuRoleForm = useForm<RolesByMenu>({
    defaultValues: {
      menuRoles: [],
    }
  });
  
  const { control, setValue, getValues } = menuRoleForm;

  const rolesByMenu = useWatch({
      control,
      name: 'menuRoles',
  });

  const { fields } = useFieldArray({
    control,
    name: "menuRoles",
  });

  const columns: ColumnDef<MenuRoleItem, string>[] = [
    columnHelper.accessor('parent_menu_name', {
      id: 'parent_menu_name', 
      header: '상위메뉴',
      meta: {
        rowSpan: 2,
        isRowSpan: true,
        style: { width: 'auto' },
        className: 'text-center align-middle',
      }
    }),
    columnHelper.accessor('menu_name', {
      id: 'menu_name', 
      header: '하위메뉴',
      meta: {
        rowSpan: 2,
        isRowSpan: true,
        style: { width: 'auto' },
        className: 'text-center align-middle',
      },
    }),
    columnHelper.group({
      id: 'roleInfo',
      header: '권한',
      columns: [
        columnHelper.accessor('role_name', {
          id: 'role_name', 
          header: '회원등급',
          meta: {
            style: { width: 'auto' },
            className: 'text-center align-middle',
          },
        }),
        columnHelper.accessor('role_yn', {
          id: 'role_yn', 
          header: '권한없음',
          meta: {
            style: { width: '10%' },
            className: 'ps-3',
          },
          cell: ({ row }) => {
            const rowIndex = row.index;

            return <Controller
                      name={`menuRoles.${rowIndex}.role_yn`}
                      control={control}
                      key={`menuRoles.${rowIndex}.role_yn_controller`}
                      render={({
                          field,
                      }) => (
                          <>
                          <Form.Check
                            key={`menuRoles.${rowIndex}.role_yn_div`}
                            className='py-1'
                          >
                            <Form.Check.Input 
                              {...field}
                              key={`menuRoles.${rowIndex}.role_yn_input`} 
                              type='checkbox' 
                              id={`menuRoles.${rowIndex}.role_yn`} 
                              checked={rolesByMenu[rowIndex]?.role_yn === 'Y'} 
                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setValue(`menuRoles.${rowIndex}.role_yn`, e.currentTarget.checked ? 'Y' : 'N');
                                if ( e.currentTarget.checked ) {
                                  setValue(`menuRoles.${rowIndex}.write_yn`, 'N');
                                  setValue(`menuRoles.${rowIndex}.read_yn`, 'N');
                                  setValue(`menuRoles.${rowIndex}.admin_yn`, 'N');
                                }
                              }}
                            />
                            <Form.Check.Label key={`menuRoles.${rowIndex}.role_yn_label`} htmlFor={`menuRoles.${rowIndex}.role_yn`} >권한없음</Form.Check.Label>
                          </Form.Check>
                          </>
                      )}
                    />
          }
        }),
        columnHelper.accessor('read_yn', {
          id: 'read_yn', 
          header: '읽기',
          meta: {
            style: { width: '7%' },
            className: 'ps-3',
          },
          cell: ({ row }) => {
            const rowIndex = row.index;

            return <Controller
                      name={`menuRoles.${rowIndex}.read_yn`}
                      control={control}
                      key={`menuRoles.${rowIndex}.read_yn_controller`}
                      render={({
                          field,
                      }) => (
                          <>
                          <Form.Check
                            key={`menuRoles.${rowIndex}.read_yn_div`}
                            className='py-1'
                          >
                            <Form.Check.Input 
                              {...field}
                              key={`menuRoles.${rowIndex}.read_yn_input`} 
                              type='checkbox' 
                              id={`menuRoles.${rowIndex}.read_yn`} 
                              checked={rolesByMenu[rowIndex]?.read_yn === 'Y'} 
                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                const writeYn = getValues(`menuRoles.${rowIndex}.write_yn`);
                                const adminYn = getValues(`menuRoles.${rowIndex}.admin_yn`);
                                setValue(`menuRoles.${rowIndex}.read_yn`, e.currentTarget.checked ? 'Y' : 'N');

                                if ( writeYn === 'Y' || adminYn === 'Y' || e.currentTarget.checked ) {
                                  setValue(`menuRoles.${rowIndex}.role_yn`, 'N');
                                }
                              }}
                            />
                            <Form.Check.Label key={`menuRoles.${rowIndex}.read_yn_label`} htmlFor={`menuRoles.${rowIndex}.read_yn`} >읽기</Form.Check.Label>
                          </Form.Check>
                          </>
                      )}
                    />
            }
        }),
        columnHelper.accessor('write_yn', {
          id: 'write_yn', 
          header: '쓰기',
          meta: {
            style: { width: '7%' },
            className: 'ps-3',
          },
          cell: ({ row }) => {
            const rowIndex = row.index;

            return <Controller
                      name={`menuRoles.${rowIndex}.write_yn`}
                      control={control}
                      key={`menuRoles.${rowIndex}.write_yn_controller`}
                      render={({
                          field,
                      }) => (
                          <>
                          <Form.Check
                            key={`menuRoles.${rowIndex}.write_yn_div`}
                            className='py-1'
                          >
                            <Form.Check.Input 
                              {...field}
                              key={`menuRoles.${rowIndex}.write_yn_input`} 
                              type='checkbox' 
                              id={`menuRoles.${rowIndex}.write_yn`} 
                              checked={rolesByMenu[rowIndex]?.write_yn === 'Y'} 
                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                const readYn = getValues(`menuRoles.${rowIndex}.read_yn`);
                                const adminYn = getValues(`menuRoles.${rowIndex}.admin_yn`);
                                setValue(`menuRoles.${rowIndex}.write_yn`, e.currentTarget.checked ? 'Y' : 'N');

                                if ( readYn === 'Y' || adminYn === 'Y' || e.currentTarget.checked ) {
                                  setValue(`menuRoles.${rowIndex}.role_yn`, 'N');
                                }
                              }}
                            />
                            <Form.Check.Label key={`menuRoles.${rowIndex}.write_yn_label`} htmlFor={`menuRoles.${rowIndex}.write_yn`} >쓰기</Form.Check.Label>
                          </Form.Check>
                          </>
                      )}
                    />
            }
        }),
        columnHelper.accessor('admin_yn', {
          id: 'admin_yn', 
          header: '관리',
          meta: {
            style: { width: '7%' },
            className: 'ps-3',
          },
          cell: ({ row }) => {
            const rowIndex = row.index;

            return <Controller
                      name={`menuRoles.${rowIndex}.admin_yn`}
                      control={control}
                      key={`menuRoles.${rowIndex}.admin_yn_controller`}
                      render={({
                          field,
                      }) => (
                          <>
                          <Form.Check
                            key={`menuRoles.${rowIndex}.admin_yn_div`}
                            className='py-1'
                          >
                            <Form.Check.Input 
                              {...field}
                              key={`menuRoles.${rowIndex}.admin_yn_input`} 
                              type='checkbox' 
                              id={`menuRoles.${rowIndex}.admin_yn`} 
                              checked={rolesByMenu[rowIndex]?.admin_yn === 'Y'} 
                              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                const readYn = getValues(`menuRoles.${rowIndex}.read_yn`);
                                const writeYn = getValues(`menuRoles.${rowIndex}.write_yn`);
                                setValue(`menuRoles.${rowIndex}.admin_yn`, e.currentTarget.checked ? 'Y' : 'N');

                                if ( readYn === 'Y' || writeYn === 'Y' || e.currentTarget.checked ) {
                                  setValue(`menuRoles.${rowIndex}.role_yn`, 'N');
                                }
                              }}
                            />
                            <Form.Check.Label key={`menuRoles.${rowIndex}.admin_yn_label`} htmlFor={`menuRoles.${rowIndex}.admin_yn`} >관리</Form.Check.Label>
                          </Form.Check>
                          </>
                      )}
                    />
            }
        })
      ]
    })
  ];

  const handleSave = () => {
    const { menuRoles } = getValues();
    console.log('handleSave', menuRoles);
  };

  useEffect(()=> {
    handleSelectedMenu('/admin/menuPermission');
  }, []);

  useEffect(()=> {
    if ( items && !!items.length ) {
      setMenuRoles(items);
      items.forEach((a, idx) => {
        const { menu_id, role_id, role_yn, read_yn, write_yn, admin_yn } = a;
        setValue(`menuRoles.${idx}.menu_id`, menu_id);
        setValue(`menuRoles.${idx}.role_id`, role_id);
        setValue(`menuRoles.${idx}.role_yn`, role_yn);
        setValue(`menuRoles.${idx}.read_yn`, read_yn || 'N');
        setValue(`menuRoles.${idx}.write_yn`, write_yn || 'N');
        setValue(`menuRoles.${idx}.admin_yn`, admin_yn || 'N');
      });
    }
  }, [items]);

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
          <li className="breadcrumb-item"><Link href="/admin/menu">메뉴 관리</Link></li>
          <li className="breadcrumb-item active">메뉴 권한 관리</li>
        </ol>
        <hr/>
        <div className='row' >
          <div className='col p-3'>
            <Table<MenuRoleItem> 
              columns={columns}
              data={menuRoles as MenuRoleItem[] || []}
            />
            <div className='d-flex flex-row-reverse'>
              <Button type='button' onClick={handleSave}>저장</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuPermission;
