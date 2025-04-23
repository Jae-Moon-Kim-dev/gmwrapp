import { ColumnDef } from "@tanstack/react-table";

export interface TableProps<T extends object> {
    data: T[],
    columns: ColumnDef<T>[],
}

export type Pagination = {
    pageIndex: number;
    pageSize: number;
}
export interface PagenationTableProps<T extends object> {
    data: T[],
    columns: ColumnDef<T>[],
    total: number,
    onPaginationChange: React.Dispatch<React.SetStateAction<Pagination>>,
    pagination: Pagination,
}
