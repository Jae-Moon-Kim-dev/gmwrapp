"use client";
import { motion } from 'framer-motion';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MenuItem, MenuItemApiData } from '@/app/types/admin/menu/menu';
import useFetch from '@/hooks/useFetch';
import dynamic from "next/dynamic";
import Loading from '@/app/loading';
import * as S from '@/styles/admin/menu/AdminMenu.styled';
import { Controller, useForm } from 'react-hook-form';
import CommonSelect from '@/components/common/Select';
import { ISelectData } from '@/app/types/common/select';
import { Value } from 'sass';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });

const Menu = () => {

  const [itemId, setItemId] = useState<string>("");
  
  const { control } = useForm({
    defaultValues: {
      menu_id: "",
      parent_menu_id: "",
      menu_name: "",
      visible_yn: "",
    }
  });
  
  const visibleData:ISelectData[] = [
    {
      label: "공개",
      value: "Y",
    },
    {
      label: "비공개",
      value: "N",
    },
  ];

  const { data: items, isLoading, error } = useFetch<MenuItem[]>('/api/admin/menus');
  const { data: item, isLoading: isItemLoading, error: itemError } = useFetch<MenuItemApiData | null>(`/api/admin/menus/${itemId}`);

  const handleClickMenuItem = (itemId: string) => {
    console.log(itemId);
    setItemId(itemId);
  }

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
            {isLoading ? <Loading /> : 
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                { items && <RichTreeView items={items} onItemClick={(_, itemId) => handleClickMenuItem(itemId)} />}
            </Box>}
          </div>
          <div className='col-6 p-3' >
            {isItemLoading ? <Loading /> : 
            <S.LayoutTbl>
              <div className="row" >
                <S.Tit className='col-2'>
                  <label htmlFor="menu_name" className="compulsory">이름</label>
                </S.Tit>
                <S.Cont className='col-10'>
                  <Controller
                    name='menu_name'
                    control={control}
                    rules={{ 
                      required: "이름 입력하세요.",
                      maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
                    }}
                    render={({
                      field,
                      field: {ref, value, onChange},
                    }) => (
                      <>
                        <S.InputJo
                          ref={ref}
                          value={item?.menu_name}
                          type="text" 
                          id="menu_name"
                          alt="이름"
                          onChange={onChange}
                        />
                      </>
                    )}
                  />
                </S.Cont>
              </div>
              { item?.menu_type === 'page' && 
                <div className="row" >
                  <S.Tit className='col-2'>
                    <label htmlFor="visible_yn" className="compulsory">공개</label>
                  </S.Tit>
                  <S.Cont className='col-10'>
                    <Controller
                      name='visible_yn'
                      control={control}
                      // rules={{ 
                      //   required: "이름 입력하세요.",
                      //   maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
                      // }}
                      render={({
                        field, 
                        field: {ref, value, onChange},
                      }) => (
                        <CommonSelect {...field} width='100px' data={visibleData} handleChange={(e: ISelectData) => {
                          onChange(e);
                        }} /> 
                        // setSelectValue={setInfoMonth2}
                        // data={monthData()}
                      )}
                    />
                  </S.Cont>
                </div>
              } 
            </S.LayoutTbl>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
