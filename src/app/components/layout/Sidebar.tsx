"use client";

import { adminMenuInfo } from '@/app/types/admin/admin';
import React, { ReactNode } from 'react';
import { Container, ListGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Sidebar = () => {

    return <Container className='mt-5 px-5' >
    <ListGroup as="ul" >
        <ListGroup.Item variant='primary' as="li">메뉴 관리</ListGroup.Item>
        <ListGroup.Item variant='primary' as="li">메뉴 권한 관리</ListGroup.Item>
    </ListGroup>
    </Container>;
}

export default Sidebar;