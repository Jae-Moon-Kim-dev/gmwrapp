"use client";

import apiClient from "../common";
import { ApiReturn } from "@/app/types/common/common";
import { MemberApiData } from "@/app/types/admin/member";
import { Pagination } from "@/app/types/common/table";

export const fetchMemberListData = async (pagination: Pagination):Promise<MemberApiData> => {
  const res = await apiClient.post('/api/admin/member', {
    ...pagination
  });
  const {success, data} = res.data as ApiReturn;
  if ( !success ) {
    throw new Error("Failed to fetch data");
  }
  
  return data as Promise<MemberApiData>;
};
