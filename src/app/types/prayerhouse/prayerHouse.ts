export interface Board {
    boardNo: number,
    boardTitle: string,
    boardUserId: number,
    viewCount: number,
};
export interface BoardApiData {
    board_id: number,
    board_type: string,
    board_title: string,
    board_user_id: number,
    create_date: string,
    views_count: number,
};

export const initialData: Board = {
    boardNo: 0,
    boardTitle: '',
    boardUserId: 0,
    viewCount: 0,
  };