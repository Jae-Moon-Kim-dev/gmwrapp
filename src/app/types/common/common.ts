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