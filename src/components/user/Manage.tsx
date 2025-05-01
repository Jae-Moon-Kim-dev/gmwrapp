"use client";

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CommonModal from '../common/Modal';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import * as S from '@/styles/user/login/UserLogin.styled';
import { initLoginData } from '@/app/types/user/user';
import { getUser, login, logout } from '@/app/api/user/manage';
import Swal from 'sweetalert2';
import { userStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';

const Manage = ():ReactNode => {

    const router = useRouter();
    const [modalShow, setModalShow] = useState<boolean>(false);
    const userStoreData = userStore((state) => state.user); 
    const setUserStore = userStore((state) => state.setUser);

    const nextPage = ( url:string ) => {
        router.push(url);
    };

    const form = useForm({
        defaultValues: initLoginData,
    });

    const { control, getValues, trigger, formState: { errors }, clearErrors } = form;

    const handleShowLogin = () => {
        setModalShow(true);
    }

    const handleLogin = useCallback(async () => {
        const { id, pwd } = getValues();

        clearErrors();
        const isVallid = await trigger();

		if (isVallid) {
            const result = await login({id, pwd});
            if ( result ) {
                const user = await getUser();
                setModalShow(false);
                setUserStore({...user});
            }
		}
    }, []);

    const handleShowLogout = useCallback(async () => {
        await logout();
    }, []);

    useEffect(() => {
        if ( Object.values(errors).find(error => !!error) ) {
            Swal.fire({
                icon: "error",
                text: Object.values(errors).find(error => !!error)?.message
            });
        }
    }, [Object.values(errors).find(error => !!error)]);

    return <>
        <Navbar className="bg-primary" data-bs-theme="dark">
            <Container>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
            { !!userStoreData.mem_id ? 
                (<>
                        <NavDropdown data-bs-theme="light" title={userStoreData.name} id={`navbarScrollingDropdown10`}>
                            <NavDropdown.Item onClick={() => {nextPage('/admin/menu');}}>운영자 모드</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => {nextPage('/');}}>회원정보</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleShowLogout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                </>)
                :
                (<>
                        <Nav.Link onClick={handleShowLogin} href='#'>로그인</Nav.Link>
                        <Nav.Link href='#' ><span className='text-light'> | </span></Nav.Link>
                        <Nav.Link onClick={()=> {nextPage('/user/join');}} href='#'>회원가입</Nav.Link>
                </>)
            }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <CommonModal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => { setModalShow(false); }}
            header={<><h5 className='ps-3'>로그인</h5></>}
            body={<>
                <Container>
                    <Row className='pe-5 py-3' >
                        <Col md={{ span: 5, offset: 3 }} >
                            <Row>
                                <Controller
                                    name='id'
                                    control={control}
                                    rules={{
                                        required: "아이디를 입력해 주세요.",
                                    }}
                                    render={({
                                        field: { ref, value, onChange },
                                    }) => (
                                        <>
                                            <S.InputJo 
                                                type="text" ref={ref} value={value}
                                                onChange={onChange} id="id" name="id" 
                                                placeholder="아이디" title="아이디" /> 
                                        </>
                                    )}
                                />
                            </Row>
                            <Row>
                                <Controller
                                    name='pwd'
                                    control={control}
                                    rules={{
                                        required: "비밀번호를 입력해 주세요.",
                                    }}
                                    render={({
                                        field: { ref, value, onChange },
                                    }) => (
                                        <>
                                            <S.InputJo 
                                                type="password" ref={ref} value={value}
                                                onChange={onChange} className='' id="pwd" 
                                                name="pwd" placeholder="비밀번호" title="비밀번호" />{/* onkeyup="keyDown();" */}
                                        </>
                                    )}
                                />
                            </Row>
                        </Col>
                        <Col md={{ span: 3 }} >
                            <S.BtnLogin type='button' onClick={handleLogin} value='로그인' />{/*  onclick="javascript:login();" */}
                        </Col>
                    </Row>
                </Container>
            </>}
        />
    </>;
};

export default Manage;