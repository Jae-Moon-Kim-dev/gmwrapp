import { Pagination } from "@/app/types/common/table";
import { useState } from "react";

export const usePagination = () => {
    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 0,
        pageSize: 10,
    });
    
    const onPageSizeChange = ( pageSize: number ) => {
        setPagination((prev) => {
            return {
                ...prev,
                pageSize,
            }
        });
    }

    return {
        pagination,
        onPaginationChange: setPagination,
        onPageSizeChange: onPageSizeChange,
    }; 
}