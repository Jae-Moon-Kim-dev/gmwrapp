"use client"

import Agree from '@/components/user/join/Agree';
import Info from '@/components/user/join/Info';
import Complete from '@/components/user/join/Complete';
import React from 'react';

const User = () => {
  return (
    <div className='container w-75'>
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
        <Info className="tab-pane fade p-3" />
        <Complete className="tab-pane fade p-3 active show" />
      </div>
    </div>
  );
}

export default User;
