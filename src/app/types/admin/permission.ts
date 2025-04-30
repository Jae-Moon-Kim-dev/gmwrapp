import { TreeViewBaseItem } from "@mui/x-tree-view";

export type MenuRoleItem = {
    parent_menu_id: number;
    parent_menu_name: string;
    menu_id: number;
    menu_name: string;
    role_id: number;
    role_name: string;
    role_yn: string;
    read_yn: string;
    write_yn: string;
    admin_yn: string;
    write_disable_yn: string;
    admin_disable_yn: string;
  };

export type RolesByMenu = {
  menuRoles: {
    menu_id: number;
    role_id: number;
    role_yn: string;
    read_yn: string;
    write_yn: string;
    admin_yn: string;
  }[]
}