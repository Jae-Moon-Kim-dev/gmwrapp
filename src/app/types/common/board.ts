export type Page = {
    board_id: number;
    menu_id: number;
    board_type: string;
    board_content: string;
}

export type Role = {
    menu_id: number;
    role_id: number;
    read_yn: string;
    write_yn: string;
    admin_yn: string;
}

export type ComPageProps = {
    menuId: string | null | undefined;
    roleId: string;
    boardId?: string;
    boardData?: BoardUpdateData;
}

export interface BoardData {
    rownum: number,
    board_id: number,
    menu_id: number,
    board_type: string,
    board_title: string,
    board_user_id: number,
    created_name: string,
    create_date: string,
    views_count: number,
    like_count: number,
};

export interface BoardApiData {
    board_list: BoardData[],
    total_cnt: number,
}

export interface BoardUpdateData {
    menu_id: string | null | undefined,
    board_id: string,
    board_type: string,
    board_title: string,
    board_content: string,
    board_files: File[],
    noti_yn: string,
    admin_yn: string,
    board_user_name: string,
    board_user_date: string,
    like_count: string,
    views_count: string,
    
}