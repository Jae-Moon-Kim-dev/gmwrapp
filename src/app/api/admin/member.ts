"use client";

import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";
import { MemberApiData, SearchQuery } from "@/app/types/admin/member";
import { Pagination } from "@/app/types/common/table";
import { ISelectData } from "@/app/types/common/select";

export const fetchMemberListData = async (pagination: Pagination, searchQuery: SearchQuery):Promise<MemberApiData> => {
  const res = await apiClient.post('/api/admin/member', {
    pagination,
    searchQuery,
  });
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MemberApiData>;
};

export const fetchRoleListData = async ():Promise<ISelectData[]> => {
  const res = await apiClient.get('/api/common/getRoles');
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<ISelectData[]>;
};
