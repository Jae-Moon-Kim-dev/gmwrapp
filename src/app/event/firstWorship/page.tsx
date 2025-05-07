"use client";

import { menuStore } from '@/stores/userStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Breadcrumb, Button, Container } from 'react-bootstrap';

const Information = () => {
  const menu = menuStore(state => state.menu);
  const router = useRouter();
  const { paths, pathId, url, label } = menu;

  const nextPage = (url: string) => {
    router.push(url);
  };

  const pathNode = () => {

    const pathNames = paths.split(' > ');
    const pathIds = pathId.split(' > ');

    return pathNames.map((a, idx) => (<Breadcrumb.Item key={`path_child_${pathIds[idx]}`} onClick={() => {nextPage(url);}} >{a}</Breadcrumb.Item>));
  }

  useEffect(()=>{
    
  },[]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Breadcrumb key={`path_${label}`} className='mt-3' >
          <Breadcrumb.Item key={'path_home'} >Home</Breadcrumb.Item>
          { menu && pathNode() }
        </Breadcrumb>
        <hr/>
      </Container>
    </motion.div>
  );
}

export default Information;
