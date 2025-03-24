import { TreeViewBaseItem } from "@mui/x-tree-view";

export type MenuItem = TreeViewBaseItem<{
    id: string;
    label: string;
    disabled?: boolean;
  }>;

export type MenuItemApiData = {
    menu_id: number;
    menu_name: string;
    parent_menu_id: number;
    menu_order: number;
    depths: number;
    path_id: string;
    paths: string;
    children: MenuItemApiData[];
};
  