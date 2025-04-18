import { create } from 'zustand';
import { AdminMenu, AdminMenuStore, initAdminMenu } from '@/app/types/common/common';

export const adminMenuStore = create<AdminMenuStore>((set) => ({
    menu: initAdminMenu,
    setMenu: (menu:AdminMenu) => set((state)=> ({menu: {...state.menu, ...menu}})),
}));

 