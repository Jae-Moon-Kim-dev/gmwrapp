"use client";

import ComPage from '@/components/common/ComPage';
import { menuStore, userStore } from '@/stores/userStore';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';

const Information = () => {
  const menu = menuStore(state => state.menu);
  const user = userStore(state => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams?.get("menuId");
  const { paths, pathId, url, label } = menu;

  const nextPage = (url: string) => {
    router.push(url);
  };

  const pathNode = () => {

    const pathNames = paths.split(' > ');
    const pathIds = pathId.split(' > ');

    return pathNames.map((a, idx) => (<Breadcrumb.Item key={`path_child_${pathIds[idx]}`} onClick={() => {nextPage(url);}} >{a}</Breadcrumb.Item>));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Container className='pb-3'>
        <Breadcrumb key={`path_${label}`} className='mt-3' >
          <Breadcrumb.Item key={'path_home'} >Home</Breadcrumb.Item>
          { menu && pathNode() }
        </Breadcrumb>
        <hr/>
        <ComPage 
          menuId={menuId}
          roleId={(user.role_id).toString()}
        />
      </Container>
    </motion.div>
  );
}

export default Information;
