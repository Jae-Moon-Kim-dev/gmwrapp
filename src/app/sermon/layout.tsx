// import "../css/styles.css";
import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '@/components/common/Sidebar';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
        <main>
          <Container>
            <Row>
              <Col xs={3} >
                <Sidebar />
              </Col>
              <Col xs={9} >
                {props.children}
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
    </>
  );
}
export default Layout;