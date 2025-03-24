"use client";
import { motion } from 'framer-motion';
import { Board, BoardApiData } from '@/app/types/prayerhouse/prayerHouse';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Box from '@mui/material/Box';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuItem, MenuItemApiData } from '@/app/types/admin/menu/menu';

const Menu = () => {

  const [items, setItems] = useState<MenuItem[]>([]);
  const [item, setItem] = useState<MenuItem | null>(null);

  const fetchMenus = useCallback(async ():Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/menus`);
    const { data } = await response.json();
    console.log(data);
    setItems(data);
  }, []);

  const fetchMenuById = useCallback(async (itemId: string):Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/menus/${itemId}`);
    const { data } = await response.json();
    setItem(data);
  }, [item]);

  const handleClickMenuItem = async (itemId: string) => {
    await fetchMenuById(itemId);
  }

  useEffect(() => {
    fetchMenus(); 
  },[]);

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
          <li className="breadcrumb-item"><Link href="/admin/menu/">메뉴 관리</Link></li>
          <li className="breadcrumb-item active">메뉴 관리</li>
        </ol>
        <hr/>
        <div className='row' >
          <div className='col-6 p-3'>
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <RichTreeView items={items} onItemClick={(_, itemId) => handleClickMenuItem(itemId)} />
            </Box>
          </div>
          <div className='col-6 p-3' >
            {JSON.stringify(item)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
