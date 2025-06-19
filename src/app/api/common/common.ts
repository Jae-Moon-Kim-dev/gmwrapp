import { Page } from "@/app/types/common/board";
import apiClient from "../common";
import { ApiReturn, MenuItem } from "@/app/types/common/common";

export const fetchMenuList = async ():Promise<MenuItem[]> => {
    const res = await apiClient.get('/api/menus');
    const {success, data} = res.data as ApiReturn;
    if ( !success ) {
      throw new Error("Failed to fetch data");
    }
    
    return data as Promise<MenuItem[]>;
  };
  
export const fetchMenu = async (id: number):Promise<MenuItem> => {
  const res = await apiClient.get(`/api/menu/${id}`);
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }

  return data as Promise<MenuItem>;
}

export const uploadFile = async (formData: FormData) => {
  const res = await apiClient.post('/api/file/upload', formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  });

  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export const savePage = async (menuId: string, content: string) => {
  await apiClient.post(`/api/board/savePage`,{
      menuId,
      content,
  });

  return true;
}

export const fetchPage = async (menuId: string):Promise<Page> => {
  const res = await apiClient.get(`/api/board/getPage/${menuId}`);
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }

  return data as Promise<Page>;
}