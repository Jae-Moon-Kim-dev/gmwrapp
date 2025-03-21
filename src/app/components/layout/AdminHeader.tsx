import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const AdminHeader = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container">
            <Link href="/" className='navbar-brand' >
                <Image src="/images/logo-invert.png" alt="WR" width={110} height={50} />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mx-5 px-5">
                    <li className="nav-item">
                        <Link className='nav-link active' href="/">Home
                            <span className="visually-hidden">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link href="/admin/menu" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">메뉴 관리</Link>
                        <div className="dropdown-menu">
                            <Link href="/admin/menu" className="dropdown-item">메뉴 관리</Link>
                            <Link href="/admin/menuPerminssion" className="dropdown-item">메뉴 권한관리</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link href="/admin/menu" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">주일강단</Link>
                        <div className="dropdown-menu">
                            <Link href="/admin/menu" className="dropdown-item" >주일설교</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
  );
}
export default AdminHeader;