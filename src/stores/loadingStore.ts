import { create } from 'zustand';
import { LoadingStore } from '@/app/types/common/common';

export const loadingStore = create<LoadingStore>((set) => ({
    isLoading: false,
    setLoading: (loading:boolean) => set(() => ({ isLoading: loading })),
}));

 