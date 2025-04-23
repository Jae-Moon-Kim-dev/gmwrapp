export type RoleData = {
    role_id: number;
    role_name: string;
    description: string;
    edit_yn: string;
    isModify?: boolean;
};

export type RoleEditData = {
    role_id?: number;
    role_name: string;
    description: string;
};

export type RoleDatas = {
    roles: {
        id?: string;
        role_id?: number;
        role_name: string;
        description: string;
        edit_yn?: string;
        isModify?: boolean;
    }[],
}