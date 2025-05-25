"use client";

import { MenuDeleteData, MenuItem, MenuItemApiData, MenuUpdateData } from "@/app/types/admin/menu";
import { ISelectData } from "@/app/types/common/select";
import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";

export const fetchVisibleData = async ():Promise<ISelectData[]> => {
  const res = await apiClient.get('/api/common/getCombVisible');
  const {success, data} = res.data as ApiReturn;
    if ( !success ) {
      throw new Error("Failed to fetch data");
    }
  return data as Promise<ISelectData[]>;
};

export const fetchMenuTypeData = async ():Promise<ISelectData[]> => {
    const res = await apiClient.get('/api/common/getMenuType');
    const {success, data} = res.data as ApiReturn;
    if ( !success ) {
      throw new Error("Failed to fetch data");
    }

    return data as Promise<ISelectData[]>;
};

export const fetchMenuListData = async ():Promise<MenuItem[]> => {
  const res = await apiClient.get('/api/admin/menus');
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MenuItem[]>;
};

export const fetchMenuData = async (menuId: string):Promise<MenuItemApiData> => {
  const res = await apiClient.get(`/api/admin/menus/${menuId}`);
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MenuItemApiData>;
};

export const deleteMenuData = async ( data: MenuDeleteData ):Promise<boolean> => {
  const { menu_id } = data;
  await apiClient.delete(`/api/admin/menus/deleteMenu/${menu_id}`);

  return true;
}

export const updateMenuData = async ( data: MenuUpdateData ):Promise<boolean> => {
  const { menu_id, parent_menu_id, menu_type, menu_name, menu_url, visible_yn } = data;
  await apiClient.patch(`/api/admin/menus/saveMenu/${menu_id}`,{
      parent_menu_id: menu_type === 'menu' ? null : parent_menu_id,
      menu_type,
      menu_name,
      menu_url,
      visible_yn,
  });

  return true;
}

export const insertMenuData = async ( data: MenuUpdateData ):Promise<boolean> => {
  const { parent_menu_id, menu_type, menu_name, menu_url,visible_yn } = data;
  await apiClient.post(`/api/admin/menus/saveMenu`,{
      parent_menu_id: menu_type === 'menu' ? null : parent_menu_id,
      menu_type,
      menu_name,
      menu_url,
      visible_yn,
  });

  return true;
}
export const updateMenuOrder = async ( { datas }: { datas: MenuItem[] | undefined } ):Promise<boolean> => {
  await apiClient.post(`/api/admin/menus/updateMenuOrder`, {
    datas
  });

  return true;
}

