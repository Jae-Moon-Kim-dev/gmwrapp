"use client";

import { AdminMenu } from '@/app/types/common/common';
import { adminMenuStore } from '@/stores/adminMenuStore';
import React, { ReactNode } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
    const adminMenu = adminMenuStore((state) => state.menu);
    const setAdminMenu = adminMenuStore((state) => state.setMenu);
    const router = useRouter();

    const handleSelectedMenu = (url: string | undefined) => {
        let adminMenuChildren:AdminMenu[] = [];

        adminMenuChildren = adminMenu.children.map(a=> {
            if ( a.url === url ) {
                return {
                    ...a,
                    active: true,
                }
            } else {
                return {
                    ...a,
                    active: false,
                }
            }
        });

        setAdminMenu({
            ...adminMenu,
            children: adminMenuChildren,
        });

        if (url) router.push(url);
    };

    const sideMenuList = () => {
        const listItem:ReactNode[] = [];
        
        adminMenu.children.forEach(a => {
            listItem.push(<ListGroup.Item key={a.id} onClick={()=> {handleSelectedMenu(a.url);}} active={a.active} as="li"><Link href={a.url ? a.url : '#'} >{a.name}</Link></ListGroup.Item>);
        });

        return listItem;
    };

    return <Container className='mt-5 px-5' >
    <ListGroup as="ul">
        {
            adminMenu.children && sideMenuList()
        }
    </ListGroup>
    </Container>;
}

export default Sidebar;