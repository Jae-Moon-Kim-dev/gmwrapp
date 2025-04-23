"use client";

import React, { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { adminMenuInfo } from '@/app/types/admin/admin';
import { adminMenuStore } from '@/stores/adminMenuStore';
import { AdminMenu } from '@/app/types/common/common';
import { useRouter } from 'next/navigation';


const AdminHeader = () => {
  const router = useRouter();
  const setAdminMenu = adminMenuStore((state) => state.setMenu);

  const adminMenuList = () => {
    return (adminMenuInfo.map(a => {
        const { id, name, children } = a;
        const childrenNode:ReactNode[] = [];

        children.map(b=> {
            childrenNode.push(<NavDropdown.Item key={b.id} onClick={()=> {nextPage(b.url);}} eventKey={b.url}>{b.name}</NavDropdown.Item>);
        });
        return <NavDropdown key={id} children={childrenNode} data-bs-theme="light" title={name} id={`navbarScrollingDropdown${id}`}></NavDropdown>;
    })); 
  }

  const nextPage = (url: string) => {
    router.push(url);
  }

  const handleSelectedMenu = (sel: string | null) => {
    let selectedMenu:AdminMenu | undefined = adminMenuInfo.find(a => {
        const { children } = a;
        const selNode =  children.filter(a => a.url === sel);

        if ( selNode && !!selNode.length ) {
            return true;
        } else {
            return false;
        }
    });

    if ( selectedMenu ) {
        let childrenMenus:AdminMenu[] = selectedMenu?.children.map(a => {
            if ( a.url === sel ) {
                return {
                    ...a,
                    active: true
                }
            } else {
                return {
                    ...a,
                    active: false
                }
            }
        });
    
        selectedMenu = {
            ...selectedMenu,
            children: childrenMenus,
        }
    
        setAdminMenu(selectedMenu);
    }
  }

  useEffect(() => {

  }, []);

  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
            <Navbar.Brand onClick={()=> {nextPage("/");}} href='#'>
                <Image src="/images/logo-invert.png" alt="WR" width={110} height={50} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="nav-pills mx-5 px-5" onSelect={(sel) => {handleSelectedMenu(sel);}}>
                    <Nav.Link onClick={()=> {nextPage("/");}} href="#">Home</Nav.Link>
                    {adminMenuList()}
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
export default AdminHeader;