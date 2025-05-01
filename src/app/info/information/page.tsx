"use client";

import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Breadcrumb, Button, Container } from 'react-bootstrap';

const Information = () => {

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
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>교회소개</Breadcrumb.Item>
          <Breadcrumb.Item>능력기도원</Breadcrumb.Item>
        </Breadcrumb>
        <hr/>
        <div className="d-flex flex-row-reverse" >
          <Button type='button'>수정</Button>
        </div>
      </Container>
    </motion.div>
  );
}

export default Information;
