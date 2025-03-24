// import "../css/styles.css";
import React, { Suspense } from 'react';
import Footer from '@/app/components/layout/Footer';
import AdminHeader from '../components/layout/AdminHeader';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AdminHeader />
        <main>
          <Suspense fallback={<p>Loading...</p>}>
            {props.children}
          </Suspense>
        </main>
        <Footer />
    </>
  );
}
export default Layout;