// import "../css/styles.css";
import React from 'react';
import Footer from '@/app/components/layout/Footer';
import UserHeader from '../components/layout/UserHeader';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <UserHeader />
        <main>
            {props.children}
        </main>
        <Footer />
    </>
  );
}
export default Layout;