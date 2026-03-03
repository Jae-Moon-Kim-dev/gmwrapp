import { QueryObserverResult, RefetchOptions, UseQueryResult } from "@tanstack/react-query";

export interface UseFetchReturn<T> {
    data: T | null | undefined;
    isLoading: boolean | null;
    error: Error | null;
}

export interface CustomQueryHookReturnType<T> {
    data: T | undefined,
    refetch: (options?: RefetchOptions)=> Promise<QueryObserverResult<T, Error>>,
    query: UseQueryResult<T, Error>,
}

export type ApiReturn = {
    success: boolean,
    message?: string,
    data?: unknown,
}

export type LoadingStoreActions = {
    setLoading: (loading: LoadingStoreState['isLoading']) => void,
}

export type LoadingStoreState = {
    isLoading: boolean,
}

export type LoadingStore = LoadingStoreState & LoadingStoreActions;

export type AdminMenu = {
    id: number;
    name: string;
    url?: string;
    active: boolean;
    children: AdminMenu[];
};

export const initAdminMenu: AdminMenu = {
    id: 1,
    name: '메뉴 관리',
    url: '',
    active: true,
    children: [
        {
            id: 2,
            name: '메뉴 관리',
            url: '/admin/menu',
            active: true,
            children: [],
        },
        {
            id: 3,
            name: '메뉴 권한 관리',
            url: '/admin/menuPermission',
            active: false,
            children: [],
        },
    ],
};

export const memberSearchParam = [
    {
        label: '이름',
        value: 'name',
    },
    {
        label: '아이디',
        value: 'mem_id',
    },
    {
        label: '이메일',
        value: 'email',
    },
    {
        label: '휴대폰번호',
        value: 'cel_num',
    },
]

export type AdminMenuStoreActions = {
    setMenu: (menu: AdminMenuStoreState['menu']) => void,
}

export type AdminMenuStoreState = {
    menu: AdminMenu,
}

export type AdminMenuStore = AdminMenuStoreState & AdminMenuStoreActions;

export type MenuItem = {
    id: string;
    parentId: string;
    label: string;
    url: string;
    pathId: string;
    paths: string;
    menuOrder: number;
    disabled?: boolean;
    children?: MenuItem[];
  };

export const fileTypeExts = ['.zip','.nwc','.pdf','.hwp','.ppt','.pptx','.doc','.docx','.xls','.xlsx','.mp3'];