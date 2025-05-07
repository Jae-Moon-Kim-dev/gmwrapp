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