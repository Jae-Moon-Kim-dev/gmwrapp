import { MenuItem, MenuItemApiData, MenuUpdateData } from "@/app/types/admin/menu/menu";
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
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/menus/${menuId}`).then(res => res.json()).then(res => {
    if (!res.success) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  });
  return result;
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

