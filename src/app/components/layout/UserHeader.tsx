import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const UserHeader = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container">
            <Link href="/" className='navbar-brand' >
                <Image src="/images/logo-invert.png" alt="WR" width={110} height={50} />
            </Link>
        </div>
      </nav>
  );
}
export default UserHeader;