"use client"

import React from 'react';
import TabProvider from '@/context/TabProvider';
import JoinMain from '@/components/user/join/Join';

const Join = () => {
  return (
    <TabProvider>
      <JoinMain />
    </TabProvider>
  );
}

export default Join;
