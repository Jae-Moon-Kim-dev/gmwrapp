"use client"

import React, { ReactNode, useContext } from 'react';
import Agree from '@/components/user/join/Agree';
import Info from '@/components/user/join/Info';
import Complete from '@/components/user/join/Complete';
import { TabContext } from '@/context/TabProvider';

const JoinMain = ():ReactNode => {
    const { tab } = useContext(TabContext);
    
    return (<>
      <div className='container w-75'>
        <ul className="nav nav-tabs nav-fill mt-5" role="tablist">
          <li className="nav-item" role="presentation">
            <a className={`nav-link${tab === 'agree' ? ' active' : ''}`} data-bs-toggle="tab" href="#agree" role="tab">01. 약관동의</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className={`nav-link${tab === 'info' ? ' active' : ''}`} data-bs-toggle="tab" href="#infoInput" role="tab">02. 정보입력</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className={`nav-link${tab === 'complete' ? ' active' : ''}`} data-bs-toggle="tab" href="#completed" role="tab">03. 가입완료</a>
          </li>
        </ul>
        <div id="myTabContent" className="tab-content mt-2">
          <Agree className={`tab-pane fade p-3${tab === 'agree' ? ' active show' : ''}`} />
          <Info className={`tab-pane fade p-3${tab === 'info' ? ' active show' : ''}`} />
          <Complete className={`tab-pane fade p-3${tab === 'complete' ? ' active show' : ''}`} />
        </div>
      </div>
    </>);
};

export default JoinMain;