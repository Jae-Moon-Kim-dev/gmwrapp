import { MenuItem, MenuItemApiData } from "@/app/types/admin/menu/menu";
import { ISelectData } from "@/app/types/common/select";

export const fetchVisibleData = async ():Promise<ISelectData[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/common/getCombVisible`).then(res => res.json()).then(res => {
    if (!res.success) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  });
  return result;
};

export const fetchMenuTypeData = async ():Promise<ISelectData[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/common/getMenuType`).then(res => res.json()).then(res => {
    if (!res.success) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  });
  return result;
};

export const fetchMenuListData = async ():Promise<MenuItem[]> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/menus`).then(res => res.json()).then(res => {
    if (!res.success) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  });
  return result;
};

export const fetchMenuData = async (menuId: string):Promise<MenuItemApiData> => {
  console.log('fetchMenuData', menuId);
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/menus/${menuId}`).then(res => res.json()).then(res => {
    if (!res.success) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  });
  return result;
};