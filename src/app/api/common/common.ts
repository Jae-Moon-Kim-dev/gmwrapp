import { BoardApiData, BoardUpdateData, Page, Role } from "@/app/types/common/board";
import apiClient from "../common";
import { ApiReturn, MenuItem } from "@/app/types/common/common";
import { Pagination } from "@/app/types/common/table";

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

export const savePage = async ({menuId, content}: {menuId: string, content: string}) => {
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

export const fetchUserRole = async ( menuId: string, roleId: string ):Promise<Role> => {
  const res = await apiClient.post(`/api/board/getRoleByUser`,{
      menuId,
      roleId,
  });
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }

  return data as Promise<Role>;
}

export const fetchBoardList = async (menuId: string, pagination: Pagination):Promise<BoardApiData> => {
  const res = await apiClient.post('/api/board/getBoard', {
    menuId,
    pagination,
  });
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<BoardApiData>;
};

export const fetchBoardData = async (boardId: string):Promise<BoardUpdateData> => {
  const res = await apiClient.get(`/api/board/getBoard/${boardId}`);
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<BoardUpdateData>;
};

export const insertBoard = async (formData: FormData) => {
  
  const res = await apiClient.post(`/api/board/insertBoard`, formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  });

  const { success } = res.data as ApiReturn;

  if ( !success ) {
    throw new Error("Failed to fetch data");
  }

  return true;
}