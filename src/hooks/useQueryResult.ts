import { CustomQueryHookReturnType } from "@/app/types/common/common";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query"
import { useMemo } from "react";

export const useQueryResult = <T>(
    queryKey: QueryKey,
    queryFn: QueryFunction<T, QueryKey>,
): CustomQueryHookReturnType<T> => {
    const query = useQuery<T, Error>({queryKey, queryFn});
    
    return {
        data: useMemo(() => query.data, [query.data]),
        refetch: query.refetch, 
        query
    };
}