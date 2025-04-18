"use client";

import React from 'react';
import Image from 'next/image';
import Manage from '@/components/user/Manage';
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const nextPage = (url: string) => {
    router.push(url);
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
                        <NavDropdown className='bg-primary' data-bs-theme="light" title="교회소개" id="navbarScrollingDropdown1">
                            <NavDropdown.Item href="#">교회소개</NavDropdown.Item>
                            <NavDropdown.Item href="#">섬기는분</NavDropdown.Item>
                            <NavDropdown.Item href="#">능력기도원</NavDropdown.Item>
                            <NavDropdown.Item href="#">예배시간안내</NavDropdown.Item>
                            <NavDropdown.Item href="#">우리교회약도</NavDropdown.Item>
                            <NavDropdown.Item href="#">능력기도원약도</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="주일강단" data-bs-theme="light" id="navbarScrollingDropdown2">
                            <NavDropdown.Item href="#">주일설교</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="주일학교" data-bs-theme="light" id="navbarScrollingDropdown3">
                            <NavDropdown.Item href="#">유치부</NavDropdown.Item>
                            <NavDropdown.Item href="#">유 · 초등부</NavDropdown.Item>
                            <NavDropdown.Item href="#">중 · 고등부</NavDropdown.Item>
                            <NavDropdown.Item href="#">청년부</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="교회행사" data-bs-theme="light" id="navbarScrollingDropdown4">
                            <NavDropdown.Item href="#">첫예배 · 세례식</NavDropdown.Item>
                            <NavDropdown.Item href="#">새가족소개</NavDropdown.Item>
                            <NavDropdown.Item href="#">행사안내</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="커뮤니티" data-bs-theme="light" id="navbarScrollingDropdown5">
                            <NavDropdown.Item href="#">자료실</NavDropdown.Item>
                            <NavDropdown.Item href="#">자유게시판</NavDropdown.Item>
                            <NavDropdown.Item href="#">교회앨범</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Manage />
            </Container>
        </Navbar>                
      </>
  );
}
export default Header;