"use client";

import React, { ReactNode, useCallback } from 'react';
import Image from 'next/image';
import Manage from '@/components/user/Manage';
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useQueryResult } from '@/hooks/useQueryResult';
import { fetchMenuList } from '@/app/api/common/common';
import { MenuItem } from '@/app/types/common/common';
import { menuStore } from '@/stores/userStore';

const Header = () => {
  const router = useRouter();
  const { data: items } = useQueryResult<MenuItem[]>(['menuListData'], useCallback(async () => fetchMenuList(), []));
  const setMenu = menuStore((state) => state.setMenu);

  const nextPage = (url: string, parentId?: string, id?: string) => {
    let pathName = '';
    if ( parentId ) pathName = `${pathName}?parentId=${parentId}`;
    if ( id ) pathName = pathName ? `${pathName}&menuId=${id}` : `${pathName}?menuId=${id}`;

    router.push(`${url}${pathName}`);
  };

  const getMenus = () => {
    const menus: ReactNode[] = [];

    if ( items ) {
        items.forEach(a => {
            const { id, label, children } = a;
            const childrenNode: ReactNode[] = [];
            if ( children ) {
                children.forEach(b => {
                    const { url, label: childLabel, id: childId, menuOrder, pathId, paths } = b;
                    childrenNode.push(<NavDropdown.Item key={`menu_${childId}`} href="#" onClick={() => {
                        nextPage(url, id, childId);
                        setMenu({
                            parentId: parseInt(id),
                            id: parseInt(childId),
                            label: childLabel,
                            pathId,
                            paths,
                            url,
                            menuOrder,
                        });
                    }} >{childLabel}</NavDropdown.Item>);
                });
            }
            // eslint-disable-next-line react/no-children-prop
            const menu = <NavDropdown children={childrenNode} key={`menu_${id}`} className='bg-primary' data-bs-theme="light" title={label} id={`navbarScrollingDropdown${id}`}></NavDropdown>;
            menus.push(menu);
        });
    }

    return menus;
  };

 return (
      <>
        <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={()=> {nextPage('/');}} href="#">
                    <Image src="/images/logo-invert.png" alt="WR" width={110} height={50} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-md-auto">
                        <Nav.Link onClick={()=> {nextPage('/');}} href="#">Home</Nav.Link>
                        { items && getMenus() }
                    </Nav>
                </Navbar.Collapse>
                <Manage />
            </Container>
        </Navbar>                
      </>
  );
}
export default Header;