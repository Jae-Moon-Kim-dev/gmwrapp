"use client";
import { motion } from 'framer-motion';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MenuItem, MenuItemApiData, MenuSaveType } from '@/app/types/admin/menu/menu';
import useFetch from '@/hooks/useFetch';
import dynamic from "next/dynamic";
import Loading from '@/app/loading';
import * as S from '@/styles/admin/menu/AdminMenu.styled';
import { Controller, useForm, useWatch } from 'react-hook-form';
import CommonSelect from '@/components/common/Select';
import { ISelectData } from '@/app/types/common/select';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuData, fetchMenuListData, fetchMenuTypeData, fetchVisibleData } from '@/app/api/admin/menu';
import { useQueryResult } from '@/hooks/useQueryResult';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });

const Menu = () => {

  const [itemId, setItemId] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string>('');
  const [saveType, setSaveType] = useState<MenuSaveType>('update');
  
  const { control, setValue, getValues, reset } = useForm({
    defaultValues: {
      menu_id: "",
      parent_menu_id: "",
      menu_name: "",
      menu_url: "",
      menu_type: "menu",
      visible_yn: "",
    }
  });

  const menu_type = useWatch({
    control,
    name: 'menu_type',
  });

  const { data: visibleData } = useQueryResult<ISelectData[]>(['adminMenuVisibleData'], fetchVisibleData);
  const { data: menuTypeData } = useQueryResult<ISelectData[]>(['adminMenuMenuTypeData'], fetchMenuTypeData);
  const { data: items, query: { isLoading } } = useQueryResult<MenuItem[]>(['adminMenuListData'], fetchMenuListData); 
  const { data: item, query: { isLoading: isItemLoading } } = useQueryResult<MenuItemApiData>(['adminMenuOneData', itemId], ({ queryKey }) => fetchMenuData(queryKey[1] as string));

  const addMenu = () => {
    reset();
    setItemId('');
    setSaveType('new');
  }

  const saveMenu = () => {
    const { menu_type, menu_id, parent_menu_id, menu_name, menu_url } = getValues();

    if ( saveType === 'update' ) {
      useFetch(`/api/admin/menus/saveMenu/${menu_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parent_menu_id: menu_type === 'menu' ? null : parent_menu_id,
          menu_name,
          menu_url
        })
      });

    }
  }

  const handleClickMenuItem = (itemId: string) => {
    setItemId(itemId);
    setSelectedItems(itemId);
    setSaveType('update');
  }

  useEffect(() => {
    if ( item ) {
      setValue("menu_id", item.menu_id ? item.menu_id.toString() : '');
      setValue("parent_menu_id", item.parent_menu_id ? item.parent_menu_id.toString() : '');
      setValue("menu_name", item.menu_name ? item.menu_name : '');
      setValue("menu_url", item.menu_url ? item.menu_url : '');
      setValue("menu_type", item.menu_type ? item.menu_type : '');
      setValue("visible_yn", item.visible_yn ? item.visible_yn : '');
    }
  }, [item]);
  
  useEffect(() => {
    if ( items && items.length > 0 ) {
      setItemId(items[0].id);
      setSelectedItems(items[0].id);
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
          <li className="breadcrumb-item"><Link href="/admin/menu/">메뉴 관리</Link></li>
          <li className="breadcrumb-item active">메뉴 관리</li>
        </ol>
        <hr/>
        <div className='row' >
          <div className='col-6 p-3'>
            {isLoading ? <Loading /> : 
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                { items && <RichTreeView items={items} selectedItems={selectedItems} onItemClick={(_, itemId) => handleClickMenuItem(itemId)} />}
            </Box>}
          </div>
          <div className='col-6 px-3 py-1' >
            {isItemLoading ? <Loading /> : 
            <><div className='mx-3 mb-3 d-flex flex-row-reverse' >
            <button type="button" onClick={addMenu} className="btn btn-primary px-4">추가</button>
          </div>
          <S.LayoutTbl>
              <div className="row" >
                <S.Tit className='col-2'>
                  <label htmlFor="menu_type" className="compulsory">메뉴 종류</label>
                </S.Tit>
                <S.Cont className='col-10'>
                  <Controller
                    name='menu_type'
                    control={control}
                    // rules={{ 
                    //   required: "이름 입력하세요.",
                    //   maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
                    // }}
                    render={({
                      field, 
                      field: {onChange},
                    }) => (
                      <CommonSelect 
                        {...field} 
                        width='150px' 
                        data={(menuTypeData as (ISelectData[] | undefined))} 
                        isDisabled={item?.parent_menu_id === null} 
                        handleChange={(e: ISelectData) => {
                          onChange(e);
                          setValue("menu_type", e.value);
                        }} 
                      /> 
                    )}
                  />
                </S.Cont>
              </div>
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
                      field: {value, ref, onChange},
                    }) => (
                      <>
                        <S.InputJo
                          ref={ref}
                          value={value}
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
              <div className="row" >
                <S.Tit className='col-2'>
                  <label htmlFor="menu_url" className="compulsory">URL</label>
                </S.Tit>
                <S.Cont className='col-10'>
                  <Controller
                    name='menu_url'
                    control={control}
                    rules={{ 
                      required: "URL을 입력하세요.",
                      maxLength: { value: 100, message: "최대 100글자 이하로 입력해 주세요." }
                    }}
                    render={({
                      field: {value, ref, onChange},
                    }) => (
                      <>
                        <S.InputJo
                          ref={ref}
                          value={value}
                          type="text" 
                          id="menu_url"
                          alt="이름"
                          onChange={onChange}
                        />
                      </>
                    )}
                  />
                </S.Cont>
              </div>
              { menu_type === 'page' && 
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
                        field: {onChange},
                      }) => (
                        <CommonSelect {...field} width='100px' data={visibleData && (visibleData as (ISelectData[] | undefined))} handleChange={(e: ISelectData) => {
                          onChange(e);
                          setValue("visible_yn", e.value);
                        }} /> 
                        // setSelectValue={setInfoMonth2}
                        // data={monthData()}
                      )}
                    />
                  </S.Cont>
                </div>
              } 
            </S.LayoutTbl>
            </>}
            <div className='m-3 d-flex flex-row-reverse' >
              <button type="button" onClick={saveMenu} className="btn btn-primary px-4">저장</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
