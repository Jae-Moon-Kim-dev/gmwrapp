"use client";
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';

const MenuPermission = () => {
  
  useEffect(()=> {
    handleSelectedMenu('/admin/menuPermission');
  }, []);

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
            <h3>메뉴 권한 관리</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuPermission;
