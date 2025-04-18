"use client";

import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";
import { RoleData } from "@/app/types/admin/role/role";

export const fetchRoleListData = async ():Promise<RoleData[]> => {
  const res = await apiClient.get('/api/admin/role');
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<RoleData[]>;
};