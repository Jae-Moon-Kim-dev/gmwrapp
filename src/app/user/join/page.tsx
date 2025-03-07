"use client"

import Agree from '@/components/user/join/Agree';
import Info from '@/components/user/join/Info';
import React from 'react';

const User = () => {
  return (
    <div className='container'>
      <ul className="nav nav-tabs nav-fill mt-5" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#agree" role="tab">01. 약관동의</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link active" data-bs-toggle="tab" href="#infoInput" role="tab">02. 정보입력</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#completed" role="tab">03. 가입완료</a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content mt-2">
        <Agree className="tab-pane fade p-3" />
        <Info className="tab-pane fade active show" />
        <div className="tab-pane fade" id="completed">
          <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
        </div>
      </div>
    </div>
  );
}

export default User;
