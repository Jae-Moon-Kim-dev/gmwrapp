"use client";

import { uploadFile } from '@/app/api/common/common';
import { menuStore } from '@/stores/userStore';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';

const Information = () => {
  const menu = menuStore(state => state.menu);
  const router = useRouter();
  const { paths, pathId, url, label } = menu;
  const TuiEditor = dynamic(() => import('@/components/common/TuiEditor'), {
    ssr: false,
  });

  const nextPage = (url: string) => {
    router.push(url);
  };

  const pathNode = () => {

    const pathNames = paths.split(' > ');
    const pathIds = pathId.split(' > ');

    return pathNames.map((a, idx) => (<Breadcrumb.Item key={`path_child_${pathIds[idx]}`} onClick={() => {nextPage(url);}} >{a}</Breadcrumb.Item>));
  }

  const handleImage = useCallback(async (blob: File, getImage: typeof Function) => {
    const formData = new FormData();

    formData.append('file', blob);
    formData.append('type', `${menu.id}`);
    const data = await uploadFile(formData);
    getImage(`${process.env.NEXT_PUBLIC_API_DOMAIN}${data}`, blob.name);
  }, []);

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
        <TuiEditor handleImage={(blob: File, callback: typeof Function) => handleImage(blob, callback)} />
      </Container>
    </motion.div>
  );
}

export default Information;
