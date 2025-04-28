export interface MemberData {
    chkMember: boolean,
    rownum: number,
    id: number,
    name: string,
    mem_id: string,
    email: string,
    cel_num: string,
    role_id: number,
    role_name: string,
    created_at: string,
};

export interface MemberApiData {
    member_list: MemberData[],
    total_cnt: number,
}

export type SearchQuery = {
    role_id: string;
    searchParam: string;
    searchText: string;
}

export type UpdateRoleMeber = {
    updateRoleMember: {
        checkMember: boolean,
    }[],
}