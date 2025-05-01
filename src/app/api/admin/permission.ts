"use client";

import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";
import { MenuRoleItem, RolesByMenu } from "@/app/types/admin/permission";

export const fetchMenuRoleList = async ():Promise<MenuRoleItem[]> => {
  const res = await apiClient.get('/api/admin/permission');
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MenuRoleItem[]>;
};

export const updateMenuRoleData = async ({menuRoles}: RolesByMenu) => {
  await apiClient.post('/api/admin/permission/updateMenuRole', {
    menuRoles,
  });

  return true;
};