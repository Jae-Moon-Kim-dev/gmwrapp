import { CustomQueryHookReturnType } from "@/app/types/common/common";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query"

export const useQueryResult = <T>(
    queryKey: QueryKey,
    queryFn: QueryFunction<T, QueryKey>,
): CustomQueryHookReturnType<T> => {
    const query = useQuery<T, Error>({queryKey, queryFn});
    
    return {
        data: query.data,
        refetch: query.refetch, 
        query
    };
}