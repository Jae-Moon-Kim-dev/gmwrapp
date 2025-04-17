// import "../css/styles.css";
import React, { Suspense } from 'react';
import Footer from '@/app/components/layout/Footer';
import AdminHeader from '../components/layout/AdminHeader';
import Sidebar from '../components/layout/Sidebar';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AdminHeader />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <div className='row' >
            <div className='col-3'>
              <Sidebar />
            </div>
            <div className='col-9'>
              {props.children}
            </div>
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
export default Layout;