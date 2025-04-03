import { initUserData, UserStore } from '@/app/types/user/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const userStore = create(persist<UserStore>((set) => ({
    user: initUserData,
    setUser: (loginUser) => set((state) => ({ user: {...state.user, ...loginUser} })),
    initUser: () => set((state) => ({ user: {...state.user, ...initUserData} })),
}), {
    name: "userStore",
}));

 