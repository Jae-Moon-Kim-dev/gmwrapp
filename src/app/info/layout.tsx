// import "../css/styles.css";
import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
        <main>
            {props.children}
        </main>
        <Footer />
    </>
  );
}
export default Layout;