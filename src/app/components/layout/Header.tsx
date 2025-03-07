import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const Header = () => {
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
                <ul className="navbar-nav ms-md-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Home
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <Link href="/info/prayerhouse">
                            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">교회소개</span>
                        </Link>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">교회소개</a>
                            <a className="dropdown-item" href="#">섬기는분</a>
                            <a className="dropdown-item" href="#">능력기도원</a>
                            <a className="dropdown-item" href="#">예배시간안내</a>
                            <a className="dropdown-item" href="#">우리교회약도</a>
                            <a className="dropdown-item" href="#">능력기도원약도</a>
                            {/* <div className="dropdown-divider"></div> */}
                            {/* <a className="dropdown-item" href="#">Separated link</a> */}
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">주일강단</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">주일설교</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">주일학교</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">유치부</a>
                            <a className="dropdown-item" href="#">유 · 초등부</a>
                            <a className="dropdown-item" href="#">중 · 고등부</a>
                            <a className="dropdown-item" href="#">청년부</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">교회행사</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">첫예배 · 세례식</a>
                            <a className="dropdown-item" href="#">새가족소개</a>
                            <a className="dropdown-item" href="#">행사안내</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">커뮤니티</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">자료실</a>
                            <a className="dropdown-item" href="#">자유게시판</a>
                            <a className="dropdown-item" href="#">교회앨범</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <Link href="/user">
                    <button type="button" className="btn btn-link">로그인</button>
                </Link>
                |
                <Link href="/user/join">
                    <button type="button" className="btn btn-link">회원가입</button>
                </Link>
            </div>
        </div>
      </nav>
  );
}
export default Header;