"use client";

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { adminMenuInfo } from '@/app/types/admin/admin';

const AdminHeader = () => {

  const adminMenuList = () => {
    return (adminMenuInfo.map(a => {
        const { children } = a;
        const childrenNode:ReactNode[] = [];

        children.map(b=> {
            childrenNode.push(<NavDropdown.Item key={b.id} href={b.url}>{b.name}</NavDropdown.Item>);
        });
        return <NavDropdown key={a.id} children={childrenNode} className='bg-primary' title="메뉴 관리" id="navbarScrollingDropdown1"></NavDropdown>;
    })); 
  }

  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/">
                <Image src="/images/logo-invert.png" alt="WR" width={110} height={50} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="mx-5 px-5">
                    <Nav.Link href="/">Home</Nav.Link>
                    {adminMenuList()}
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
export default AdminHeader;