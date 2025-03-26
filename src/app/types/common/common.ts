
export interface UseFetchReturn<T> {
    data: T | null | undefined;
    isLoading: boolean | null;
    error: Error | null;
}