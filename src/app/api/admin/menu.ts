import { MenuItem, MenuItemApiData, MenuUpdateData } from "@/app/types/admin/menu/menu";
import { ISelectData } from "@/app/types/common/select";
import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";

export const fetchVisibleData = async ():Promise<ISelectData[]> => {
  const res = await apiClient.get('/api/common/getCombVisible');
  const {success, data, message} = res.data as ApiReturn;
    if ( !success ) {
      throw new Error("Failed to fetch data");
    }
  return data as Promise<ISelectData[]>;
};

export const fetchMenuTypeData = async ():Promise<ISelectData[]> => {
    const res = await apiClient.get('/api/common/getMenuType');
    const {success, data, message} = res.data as ApiReturn;
    if ( !success ) {
      throw new Error("Failed to fetch data");
    }

    return data as Promise<ISelectData[]>;
};

export const fetchMenuListData = async ():Promise<MenuItem[]> => {
  const res = await apiClient.get('/api/admin/menus');
  const {success, data, message} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MenuItem[]>;
};

export const fetchMenuData = async (menuId: string):Promise<MenuItemApiData> => {
  const res = await apiClient.get(`/api/admin/menus/${menuId}`);
  const {success, data, message} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MenuItemApiData>;
};

export const updateMenuData = async ( data: MenuUpdateData ):Promise<boolean> => {
  const { menu_id, parent_menu_id, menu_type, menu_name, menu_url } = data;
  await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/menus/saveMenu/${menu_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      parent_menu_id: menu_type === 'menu' ? null : parent_menu_id,
      menu_name,
      menu_url
    })
  })
  // .then(res => res.json()).then(res => {
  //   if (!res.success) {
  //     throw new Error("Failed to update data");
  //   }
  //   return res.success;
  // });

  return true;
}

