"use client";

import { MenuItem } from '@/app/types/common/common';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { Container, ListGroup, Nav } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { menuStore } from '@/stores/userStore';
import { useQueryResult } from '@/hooks/useQueryResult';
import { fetchMenu } from '@/app/api/common/common';

const Sidebar = () => {
    const topMenu = menuStore((state) => state.menu);
    const setMenu = menuStore((state) => state.setMenu);
    const router = useRouter();
    const { data: item } = useQueryResult<MenuItem>(['menuOneData', topMenu?.parentId], useCallback(async ({ queryKey }) => await fetchMenu(queryKey[1] as number), []));

    const handleSelectedMenu = (menu: MenuItem | undefined) => {
        if ( menu ) {
            setMenu({
                id: parseInt(menu.id),
                parentId: parseInt(menu.parentId),
                menuOrder: menu.menuOrder,
                label: menu.label,
                url: menu.url,
                pathId: menu.pathId,
                paths: menu.paths,
            });
            router.push(menu.url);
        } 
    };

    const sideMenuList = () => {
        let itemNode:ReactNode = <></>;
        
        if ( item ) {
            const listItem:ReactNode[] = [];
            listItem.push(<Nav.Item key={`side_sub_menu_${item.id}`} className='fs-5 fw-bold' onClick={()=> {handleSelectedMenu(item);}} >{item.label}</Nav.Item>);
            if ( item.children ) {
                item.children.forEach(a => {
                    listItem.push(<Nav.Link key={`side_sub_menu_${a.id}`} className='fs-6' href="#" onClick={()=> {handleSelectedMenu(a);}} active={(parseInt(a.id) === topMenu.id)} >{a.label}</Nav.Link>);
                });
            }
            itemNode = <Nav key={`side_menu_${item.id}`} children={listItem} className="nav-pills flex-column" ></Nav>;
        }

        return itemNode;
    };

    return <Container className='my-4 px-5' >
    {
        ( item) && sideMenuList()
    }
    </Container>;
}

export default Sidebar;