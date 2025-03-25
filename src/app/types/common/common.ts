import { MenuItem } from "../admin/menu/menu";

export interface UseFetchReturn<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}