"use client";
import { motion } from 'framer-motion';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuItem, MenuItemApiData, MenuOrderGubun, MenuSaveType } from '@/app/types/admin/menu/menu';
import dynamic from "next/dynamic";
import Loading from '@/app/loading';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenuData, fetchMenuData, fetchMenuListData, insertMenuData, updateMenuData, updateMenuOrder } from '@/app/api/admin/menu';
import { useQueryResult } from '@/hooks/useQueryResult';
import Swal from 'sweetalert2';
import MenuEdit from '@/components/admin/menu/MenuEdit';
import MenuAdd from '@/components/admin/menu/MenuAdd';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });

const Menu = () => {

  const [itemId, setItemId] = useState<string>("");
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
  
  const { getValues, reset, clearErrors, trigger, formState: { errors } } = menuForm;
  
  const { data: items, query: { isLoading } } = useQueryResult<MenuItem[]>(['adminMenuListData'], fetchMenuListData); 
  const { data: item, query: { isLoading: isItemLoading } } = useQueryResult<MenuItemApiData>(['adminMenuOneData', itemId], ({ queryKey }) => fetchMenuData(queryKey[1] as string));
  const [menuItems, setMenuItems] = useState<MenuItem[] | undefined>([]);

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

  const saveOrderMenuMutation = useMutation({
    mutationFn: updateMenuOrder,
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

  const saveMenu = async () => {
      const { menu_type, menu_id, parent_menu_id, menu_name, menu_url, visible_yn } = getValues();

      clearErrors();
      const isVallid = await trigger();
      if (isVallid) {
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
    setSaveType('update');
  }

  const handleOrderMenu = (gubun: MenuOrderGubun):void => {
    let tmpItems:MenuItem[] = [];
    let selectedItemIdx = 0;
    let childrenParentId = '';

    if ( menuItems && !!menuItems.length ) {
      let selectedItem = menuItems?.find( a => a.id === itemId );
      let parentId = selectedItem?.parentId;
      
      // console.log('menuItems, itemId, selectedItemIdx, selectedItem', menuItems, itemId, selectedItemIdx, selectedItem);
      if ( !selectedItem ) {
        menuItems?.forEach(a=> {
          a.children?.forEach(b=> {
            if ( b.id === itemId ) {
              childrenParentId = b.parentId;
            }
          });
        });
        parentId = childrenParentId;
        selectedItem = menuItems?.find( a => a.id === childrenParentId );
      }
      
      if ( !(!!parentId) && !!selectedItem ) {
        const lastIdx = menuItems?.filter(a => !(!!a.parentId)).length -1;
        selectedItemIdx = menuItems?.findIndex( a => a.id === itemId );
        tmpItems = menuItems?.filter((a, idx) => !(!!a.parentId) && idx !== (selectedItemIdx));

        if ( gubun === 'top' ) {
          if ( selectedItemIdx === 0 ) return;

          tmpItems.splice((selectedItemIdx-1), 0, selectedItem);
        } else if ( gubun === 'start' ) {
          tmpItems.splice(0, 0, selectedItem);
        } else if ( gubun === 'bottom' ) {
          
          if ( selectedItemIdx === lastIdx ) return;
          tmpItems.splice((selectedItemIdx+1), 0, selectedItem);
        } else if ( gubun === 'end' ) {
          tmpItems.splice(lastIdx, 0, selectedItem);
        }
        
        tmpItems = tmpItems?.filter(a => !(!!a.parentId)).map((a, idx)=> {
          return {
            ...a,
            menuOrder: (idx+1)
          };
        });

        setMenuItems(tmpItems);
      } else if ( parentId && selectedItem && (selectedItem.children && !!selectedItem.children.length) ) {
        const childrenItems = selectedItem?.children;
        selectedItemIdx = childrenItems.findIndex( a => a.id === itemId ) || 0;
        const childrenSelectedItem = childrenItems.find( a => a.id === itemId );
        tmpItems = childrenItems.filter((a, idx) => idx !== (selectedItemIdx));
        const lastIdx = (childrenItems && !!childrenItems.length) ? childrenItems.length -1 : 0;

        if ( childrenSelectedItem ) {
          if ( gubun === 'top' ) {
            if ( selectedItemIdx === 0 ) return;

            tmpItems.splice((selectedItemIdx-1), 0, childrenSelectedItem);
          } else if ( gubun === 'start' ) {
            tmpItems.splice(0, 0, childrenSelectedItem);
          } else if ( gubun === 'bottom' ) {
            
            if ( selectedItemIdx === lastIdx ) return;
            tmpItems.splice((selectedItemIdx+1), 0, childrenSelectedItem);
          } else if ( gubun === 'end' ) {
            tmpItems.splice(lastIdx, 0, childrenSelectedItem);
          }

          tmpItems = tmpItems?.map((a, idx)=> {
            return {
              ...a,
              menuOrder: (idx+1)
            };
          });

          setMenuItems(
            menuItems.map(a => {
              if ( a.id === parentId ) {
                return {
                  ...a,
                  children: tmpItems
                };
              }
              return a;
            })
          );
        }
      }
    }
  }

  const handleOrderMenuSave = () => {
    saveOrderMenuMutation.mutate({
      datas: menuItems
    });
  }

  useEffect(() => {
    if ( items && items.length > 0 ) {
      setMenuItems(items);
      setItemId(items[0].id);
    }
  }, [items]);

  useEffect(() => {
    if ( errors && !!Object.values(errors).find(error => !!error) ) {

      Swal.fire({
        icon : "error",
        text: Object.values(errors).find(error => !!error)?.message,
        showCloseButton: true
      });
      
    }
  }, [errors && !!Object.values(errors).find(error => !!error)]);

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
                { menuItems && <RichTreeView items={menuItems} selectedItems={itemId} onItemClick={(_, itemId) => handleClickMenuItem(itemId)} />}
            </Box>}
            <div className='d-flex flex-row-reverse'>
              <div className='my-3 mx-1' >
                <button type="button" onClick={handleOrderMenuSave} className="btn btn-primary px-2">위치저장</button>
              </div>
              <div className='my-3 mx-1' >
                <button type="button" onClick={()=>handleOrderMenu('end')} className="btn btn-primary btn-sm px-2">맨 아래로</button>
              </div>
              <div className='my-3 mx-1' >
                <button type="button" onClick={()=>handleOrderMenu('bottom')} className="btn btn-primary btn-sm px-2">아래로</button>
              </div>
              <div className='my-3 mx-1' >
                <button type="button" onClick={()=>handleOrderMenu('top')} className="btn btn-primary btn-sm px-2">위로</button>
              </div>
              <div className='my-3 mx-1' >
                <button type="button" onClick={()=>handleOrderMenu('start')} className="btn btn-primary btn-sm px-2">맨 위로</button>
              </div>
            </div>
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
              items={menuItems} 
            />
          }
          </FormProvider>
            <div className='d-flex flex-row-reverse'>
              <div className='my-3 mx-1' >
                <button type="button" onClick={saveMenu} className="btn btn-primary px-4">저장</button>
              </div>
              {saveType === 'update' && 
                <div className='my-3 mx-1' >
                  <button type="button" onClick={deleteMenu} className="btn btn-primary px-4">삭제</button>
                </div>
              }
            </div>
            </>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
