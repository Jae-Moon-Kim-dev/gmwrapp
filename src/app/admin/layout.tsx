// import "../css/styles.css";
import React from 'react';
import Footer from '@/app/components/layout/Footer';
import AdminHeader from '../components/layout/AdminHeader';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AdminHeader />
        <main>
            {props.children}
        </main>
        <Footer />
    </>
  );
}
export default Layout;