"use client";
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';

const Role = () => {
  
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
        <div className='d-flex flex-row-reverse px-5 mx-5'>
          <div className='my-3 mx-1' >
            <button type="button" onClick={() => {}} className="btn btn-primary px-3">등급추가</button>
          </div>
        </div>
        <div className='row px-5 mx-5' >
          <div className='col p-3'>
            <h3>회원 구분/등급</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Role;
