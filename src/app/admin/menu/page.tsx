"use client";
import { motion } from 'framer-motion';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MenuItem, MenuItemApiData, MenuSaveType } from '@/app/types/admin/menu/menu';
import dynamic from "next/dynamic";
import Loading from '@/app/loading';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteMenuData, fetchMenuData, fetchMenuListData, fetchMenuTypeData, fetchVisibleData, insertMenuData, updateMenuData } from '@/app/api/admin/menu';
import { useQueryResult } from '@/hooks/useQueryResult';
import Swal from 'sweetalert2';
import MenuEdit from '@/components/admin/menu/MenuEdit';
import MenuAdd from '@/components/admin/menu/MenuAdd';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });

const Menu = () => {

  const [itemId, setItemId] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string>('');
  const [saveType, setSaveType] = useState<MenuSaveType>('update');
  const queryClient = useQueryClient();
  
  const menuForm = useForm({
    defaultValues: {
      menu_id: "",
      parent_menu_id: "",
      menu_name: "",
      menu_url: "",
      menu_type: "menu",
      visible_yn: "",
    }
  });

  const { control, setValue, getValues, reset } = menuForm;

  const { data: items, query: { isLoading } } = useQueryResult<MenuItem[]>(['adminMenuListData'], fetchMenuListData); 
  const { data: item, query: { isLoading: isItemLoading } } = useQueryResult<MenuItemApiData>(['adminMenuOneData', itemId], ({ queryKey }) => fetchMenuData(queryKey[1] as string));

  const insertMenuMutation = useMutation({
    mutationFn: insertMenuData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMenuListData'] });
    }
  });

  const updateMenuMutation = useMutation({
    mutationFn: updateMenuData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMenuListData'] });
      queryClient.invalidateQueries({ queryKey: ['adminMenuOneData'] });
    }
  });

  const deleteMenuMutation = useMutation({
    mutationFn: deleteMenuData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMenuListData'] });
      queryClient.invalidateQueries({ queryKey: ['adminMenuOneData'] });
    }
  });

  const addMenu = () => {
    reset();
    setItemId('');
    setSaveType('new');
  }

  const saveMenu = () => {
      const { menu_type, menu_id, parent_menu_id, menu_name, menu_url, visible_yn } = getValues();

      Swal.fire({
        title : "저장 하시겠습니까?",
        icon : "question",
        showCancelButton : true,
        confirmButtonColor : "#444",
        cancelButtonColor : "#888",
        confirmButtonText : "예",
        cancelButtonText : "아니오",
      }).then((result) => {
        if (result.value) {
          if ( saveType === 'update' ) {
            updateMenuMutation.mutate({
              parent_menu_id,
              menu_type,
              menu_name,
              menu_url,
              menu_id,
              visible_yn,
            });
          } else {
            insertMenuMutation.mutate({
              parent_menu_id,
              menu_type,
              menu_name,
              menu_url,
              menu_id,
              visible_yn,
            });
          }
        }
  
      });
  }

  const deleteMenu = () => {
    const { menu_id } = getValues();

    Swal.fire({
      title : "삭제 하시겠습니까?",
      icon : "question",
      showCancelButton : true,
      confirmButtonColor : "#444",
      cancelButtonColor : "#888",
      confirmButtonText : "예",
      cancelButtonText : "아니오",
    }).then((result) => {
      if (result.value) {
        deleteMenuMutation.mutate({
          menu_id,
        });
      }

    });

  }

  const handleClickMenuItem = (itemId: string) => {
    setItemId(itemId);
    setSelectedItems(itemId);
    setSaveType('update');
  }

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
          <FormProvider {...menuForm}>
          {saveType === 'update' ?
            <MenuEdit 
              item={item}
            />
            :
            <MenuAdd 
              items={items} 
            />
          }
          </FormProvider>
            <div className='d-flex flex-row-reverse'>
              <div className='my-3 mx-1' >
                <button type="button" onClick={saveMenu} className="btn btn-primary px-4">저장</button>
              </div>
              <div className='my-3 mx-1' >
                <button type="button" onClick={deleteMenu} className="btn btn-primary px-4">삭제</button>
              </div>
            </div>
            </>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
