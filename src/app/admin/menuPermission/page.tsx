"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import { MenuRoleItem } from '@/app/types/admin/permission';
import { useQueryResult } from '@/hooks/useQueryResult';
import { fetchMenuRoleList } from '@/app/api/admin/permission';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Table from '@/components/admin/permission/Table';

const MenuPermission = () => {
  const { data: items } = useQueryResult<MenuRoleItem[]>(['adminMenuListData'], fetchMenuRoleList);
  const [ menuRoles, setMenuRoles ] = useState<MenuRoleItem[]>([]);
  const columnHelper = createColumnHelper<MenuRoleItem>();

  const columns: ColumnDef<MenuRoleItem, string>[] = [
    columnHelper.accessor('parent_menu_name', {
      id: 'parent_menu_name', 
      header: '상위메뉴',
      meta: {
        rowSpan: 2
      },
      cell: ({ getValue, row, column, table }) => {
        return <p className='text-center' >{getValue()}</p>
      }
    }),
    columnHelper.accessor('menu_name', {
      id: 'menu_name', 
      header: '하위메뉴',
      meta: {
        rowSpan: 2
      },
      cell: ({ getValue, row, column, table }) => {
        return <p className='text-center' >{getValue()}</p>
      }
    }),
    columnHelper.group({
      id: 'roleInfo',
      header: '권한',
      columns: [
        columnHelper.accessor('role_name', {
          id: 'role_name', 
          header: '회원등급',
          cell: ({ getValue, row, column, table }) => {
            return <p className='text-center' >{getValue()}</p>
          }
        }),
        columnHelper.accessor('role_yn', {
          id: 'role_yn', 
          header: '권한없음'
        }),
        columnHelper.accessor('read_yn', {
          id: 'read_yn', 
          header: '읽기'
        }),
        columnHelper.accessor('write_yn', {
          id: 'write_yn', 
          header: '쓰기'
        }),
        columnHelper.accessor('admin_yn', {
          id: 'admin_yn', 
          header: '관리'
        })
      ]
    })
  ];

  useEffect(()=> {
    handleSelectedMenu('/admin/menuPermission');
  }, []);

  useEffect(()=> {
    if ( items && !!items.length ) {
      setMenuRoles(items);
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuPermission;
