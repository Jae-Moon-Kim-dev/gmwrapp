"use client";

import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";
import { RoleData, RoleEditData } from "@/app/types/admin/role";

export const fetchRoleListData = async ():Promise<RoleData[]> => {
  const res = await apiClient.get('/api/admin/role');
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<RoleData[]>;
};

export const insertRoleData = async (data: RoleEditData) => {
  const { role_name, description } = data;

  await apiClient.post(`/api/admin/role`,{
      role_name,
      description,
  });

  return true;
};

export const updateRoleData = async (data: RoleEditData) => {
  const { role_id, role_name, description } = data;

  await apiClient.put(`/api/admin/role/${role_id}`,{
      role_name,
      description,
  });

  return true;
}

export const deleteRoleData = async (roleId: number) => {
  await apiClient.delete(`/api/admin/role/${roleId}`);

  return true;
};