"use client"

import * as S from '@/styles/user/UserAgree.styled';
import React from 'react';

const User = () => {
  return (
    <div className='container'>
      <h3 className='display-5 mt-4' >회원가입</h3>
      <ul className="nav nav-tabs nav-fill mt-5" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" data-bs-toggle="tab" href="#agree" aria-selected="true" role="tab">01. 약관동의</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#certification" aria-selected="false" role="tab">02. 본인인증</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#infoInput" aria-selected="false" role="tab">03. 정보입력</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" data-bs-toggle="tab" href="#completed" aria-selected="false" role="tab">04. 가입완료</a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content mt-2">
        <S.AgreeContainer className="tab-pane fade active show p-4" id="agree" role="tabpanel">
          <form id="frmAgree" method="post" action="/member/step1">
          <input type="hidden" name="csrf_t" value="de95e23d7ad6b60b6ebd50fa4e5d8263" />
          <S.BoxType1 className="container-fluid d-flex justify-content-center">
            <div className='px-2' >
              <label className="form-check-label text-center" htmlFor="agr1">
                  이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="memAgr" value="allCheck" id="agr1" />
            </div>
          </S.BoxType1>
          
          <S.MiddleTitle>
            <h3 className='float-start' >1. 이용약관</h3>
            <div className="form-check float-end mt-1">
              <input className="form-check-input" type="checkbox" name="memAgr" value="Y" id="agr2" />
            </div>
            <div className="px-2 float-end mt-1">
              <label className="form-check-label text-center" htmlFor="agr2">[필수]동의합니다.</label>
            </div>
            <S.TermBox >
              제 1 조 (목적)
              <br/>
              이 약관은 주식회사 데이스톤(이하 &quot;회사&quot;라 한다)가 운영하는 Onmam.com(이하 &quot;사이트&quot;라 한다)에서 제공하는 인터넷 관련 서비스(이하 &quot;서비스&quot;라 한다)를 이용함에 있어 사이트와 이용자의 권리ㆍ의무 및 책임 사항을 규정함을 목적으로 합니다.
              <br/><br/>
              제 2 조 (정의)
              <br/>
              1)&quot;사이트&quot; 란 회사가 인터넷 (관련)서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신 설비를 이용하여 구축한 Onmam.com 홈페이지를 말합니다.<br/>
              2)&quot;이용자&quot;란 &quot;사이트&quot;에 접속하여 이 약관에 따라 &quot;사이트&quot;가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br/>
              3)&quot;회원&quot;이라 함은 &quot;사이트&quot;에 개인정보를 제공하여 회원 등록을 한 자로서, &quot;사이트&quot;의 정보를 지속적으로 제공받으며, &quot;사이트&quot;가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.<br/>
              4)&quot;회원&quot;은 &quot;일반회원&quot;과 &quot;비회원&quot;으로 구분됩니다.&quot;일반회원&quot;은 &quot;무료회원&quot;으로 (주)데이스톤의 일반 서비스를 이용하실 수 있는 회원을 말합니다.<br/>
              5)&quot;비회원&quot;이라 함은 회원에 가입하지 않고 &quot;사이트&quot;가 제공하는 서비스를 이용하는 자를 말합니다.<br/>
              6)위에서 정하는 것 외의 용어의 정의는 관계법령 및 회사가 정하는 바에 의합니다.<br/>
              <br/>
              제 3 조 (약관의 명시와 개정)<br/>
              1)&quot;사이트&quot;는 약관의규제등에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br/>
              2)&quot;사이트&quot;가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 사이트의 초기화면에 공지합니다.<br/>
              3)&quot;사이트&quot;가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다.<br/> 
              단, 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 개정약관의 공지기간 내에 &quot;사이트&quot;에 송신하여 &quot;사이트&quot;의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.<br/>
              4)이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정부가 제정한 관계법령 및 관례에 따릅니다.<br/>
              <br/>
              제 4 조 (서비스의 내용)<br/>
              &quot;사이트&quot;는 다음과 같은 서비스를 제공합니다.<br/>
              1) 마이블, 미션칼리지, 뉴스, 뮤직, QT, 방송, UCC, 아카데미 등의 컨텐츠 서비스<br/>
              2) 크리스천홈피 등의 커뮤니티 서비스<br/>
              3) 쇼핑 거래형 서비스<br/>
              4) 교회형 폰페이지 VM서비스, SMS, MMS 등 모바일서비스<br/>
              5) 기타 &quot;사이트&quot;가 정하거나 개발하거나 다른 회사와 제휴하는 일체의 서비스<br/>
              제 5 조 (서비스의 중단)<br/>
              1) &quot;사이트&quot;는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.<br/>
              2) 서비스 중단의 경우에 &quot;사이트&quot;는 제8조에 정한 방법으로 이용자에게 사전 통지합니다. 단, &quot;사이트&quot;가 통제할 수 없는 사유로 인한 서비스의 중단(시스템 관리자의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.<br/>
              <br/>
              제 6 조 (회원가입)<br/>
              이용자는 &quot;사이트&quot;가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.<br/>
              회원가입 시 기입되는 회원정보는 &quot;필수정보&quot;와 &quot;추가정보&quot;로 나뉘며, &quot;추가정보&quot;의 경우 선택 입력사항입니다.<br/>
              &quot;사이트&quot;는 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원등록을 허락합니다.<br/>
              1) 가입 신청자가 이 약관 제7조제3항에 의하여 이전에 회원 자격을 상실한 적이 있는 경우, 회원 자격 상실후 3년이 경과한 자로서 &quot;사이트&quot;의 회원 재가입 승낙을 얻은 경우에는 예외로 한다.<br/>
              2) 등록 내용에 허위, 기재 누락, 오기가 있는 경우<br/>
              3) 기타 회원으로 등록하는 것이 &quot;사이트&quot;의 기술상 현저히 지장이 있다고 판단되는 경우<br/>
              4) 회원가입 계약의 성립 시기는 &quot;사이트&quot;의 승낙이 회원에게 도달한 시점으로 합니다.<br/>
              5) 회원은 등록사항에 변경이 있는 경우, 즉시 전자우편 기타 방법으로 &quot;사이트&quot;에 대하여 그 변경사항을 알려야 합니다.<br/>
              <br/>
              제 7 조 (회원 탈퇴 및 자격 상실 등)<br/>
              회원은 &quot;사이트&quot;에 언제든지 이메일 혹은 회원정보수정 링크를 통해서 탈퇴를 요청할 수 있으며 &quot;사이트&quot;는 즉시 회원탈퇴를 처리합니다.<br/>
              회원이 다음 각호의 사유에 해당하는 경우, &quot;사이트&quot;는 회원자격을 제한 및 정지시킬 수 있습니다.<br/>
              1) 가입 신청시에 허위 내용을 등록한 경우<br/>
              2) 다른 사람의 &quot;사이트&quot; 이용을 방해하거나 그 정보를 도용하는 등 사이트 운영질서를 위협하는 경우<br/>
              3) &quot;사이트&quot;를 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br/>
              4) &quot;사이트&quot;가 회원 자격을 제한ㆍ정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우<br/>
              5) 타인의 ID와 비밀번호를 무단으로 도용한 경우<br/>
              6) &quot;사이트&quot; 내에서 컴퓨터 바이러스 프로그램을 유포하는 경우<br/>
              7) &quot;사이트&quot; 및 회원, 제3자의 지적재산권을 침해하고 시정을 거부하는 경우<br/>
              8) &quot;사이트&quot;가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 소명할 기회를 부여합니다.<br/>
              <br/>
              제 8 조 (회원에 대한 통지)<br/>
              &quot;사이트&quot;가 회원에 대한 통지를 하는 경우, 회원이 &quot;사이트&quot;에 제출한 전자우편 주소로 할 수 있습니다.<br/>
              &quot;사이트&quot;는 불특정다수 회원에 대한 통지의 경우 1주일 이상 &quot;사이트&quot; 게시판에 게시 함으로서 개별 통지에 갈음할 수 있습니다.<br/>
              <br/>
              제 9 조 (서비스이용계약의 성립)<br/>
              1)회원가입페이지에서 &quot;회원약관에 동의하며 회원가입을 신청한다&quot;는 물음에 &quot;동의&quot; 버튼을 누르면 Onmam.com의 이용약관에 동의하는 것으로 인정합니다.<br/>
              2)&quot;사이트&quot;의 승낙이 제15조의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.<br/>
              <br/>
              제 10 조 (서비스 이용 신청)<br/>
              1) &quot;사이트&quot;에서 제공하는 온라인 양식에서 요구하는 사항을 기록하여 신청합니다.<br/>
              2) 온라인 양식에 기재하는 모든 데이타는 실제 데이타로 간주하며 허위로 기재하거나 입력을 누락한 경우에는 법적인 보호를 받을 수 없으며, 정상적인 서비스를 받지 못할 수 도 있습니다.<br/>
              3) 회사는 이용 신청 고객이 미성년자인 경우에는 서비스별 안내에서 정하는 바에 따라 승낙을 보류할 수 있습니다.<br/>
              <br/>
              제 11 조 (서비스 이용 신청의 유보 및 거부)<br/>
              다음 각호에 해당하는 경우 서비스 이용 신청을 유보할 수 있습니다.<br/>
              1)기술적인 문제가 발생한 경우<br/>
              2)장비에 여유가 없는 경우<br/>
              3)회사 사정상 이용 승낙이 곤란한 경우<br/>
              다음 각호에 해당하는 경우 서비스 이용신청을 거부할 수 있습니다.<br/>
              1)실명을 사용하지 않는 경우<br/>
              2)타인의 명의를 사용하여 신청한 경우<br/>
              3)사회의 질서를 저해할 목적으로 서비스 이용신청을 한 것이라 판단될 경우<br/>
              4)기재 내용을 허위로 기재한 경우<br/>
              5)기타 회사가 정한 이용신청 요건 및 사항에 미치지 못할 경우<br/>
              <br/>
              제 12 조 (서비스 이용시간)<br/>
              1)회사의 업무상 혹은 기술상 특별한 이유가 없는 한 &quot;사이트&quot;에서 제공하는 서비스는 지속적으로 이용할 수 있습니다.<br/>
              2)회사가 정한 정기점검 혹은 임시점검시간에는 이용할 수 없습니다.<br/>
              3)서비스의 종류에 따라서 지속적으로 제공할 수 없는 경우가 있으며 이는 &quot;사이트&quot;가 정합니다.<br/>
              <br/>
              제 13 조 (서비스의 중지)<br/>
              1)&quot;사이트&quot;가 특정 어려움으로 인하여 일시적으로 서비스를 중지해야 할 경우, 서비스 중지 1일 전에 고지하여야 합니다. 이 기간 동안 이용자가 고지 내용을 인지하지 못한데 대하여 &quot;사이트&quot;는 책임을 지지 않습니다.<br/>
              2)매우 급박한 사정이 있을 경우 사전 고지기간은 줄어들거나 생략될 수 있습니다. 서비스 중지에 의하여 본 &quot;사이트&quot;에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 &quot;사이트&quot;는 책임을 지지 않습니다.<br/>
              3) &quot;사이트&quot;의 사정으로 서비스를 영구 중단해야 할 경우 1)항과 2)항을 준용합니다. 단, 이 경우 사전 고지기간은 최소 1개월로 합니다.<br/>
              <br/>
              제 14 조 (수신확인 통지)<br/>
              &quot;사이트&quot;는 이용자의 회원가입 신청이 있는 경우 이용자에게 수신확인 통지를 전자우편을 통해서 합니다.<br/>
              <br/>
              제 15 조 (개인정보보호)<br/>
              1)&quot;사이트&quot;는 이용자의 정보수집 시 서비스 제공에 필요한 기본정보와 상세정보를 수집하며, 다음 사항을 기본 정보 사항으로 합니다.<br/>
              1) 성명 : 이용자의 식별을 위해 수집됩니다.<br/>
              (2) 생년월일(회원의 경우) : 이용자의 식별을 위해 수집됩니다.<br/>
              (3) 주소 : 이벤트 당첨 시 상품수령과 주문상품의 배송 등을 위해 수집됩니다.<br/>
              (4) 전화번호 : 계약이행을 위한 연락 및 안내, 영수증 및 청구서 송부, 배송진행상황의 통보, 신상품이나 이벤트 정보 안내 등을 위해 수집됩니다.<br/>
              (5) 희망ID(회원의 경우) : 회원확인 및 개인정보보호를 위해 수집됩니다.<br/>
              (6) 비밀번호(회원의 경우) : 회원확인 및 개인정보보호를 위해 수집됩니다.<br/>
              (7) 메일 : 계약이행을 위한 연락 및 안내, 영수증 및 청구서 송부, 배송진행상황의 통보, 신상품이나 이벤트 정보 안내 등을 위해 수집됩니다.<br/>
              (8) 교회정보 : 개인정보를 바탕으로 보다 좋은 서비스를 제공하기 위하여 수집됩니다.<br/>
              2)&quot;사이트&quot;는 이용자의 개인 식별이 가능한 개인정보를 수집하는 때에는 반드시 당해 이용자의 동의를 받습니다. 제공된 개인정보는 당해 이용자의 동의 없이 목적 외의 이용이나 제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 &quot;사이트&quot;가 집니다.<br/> 
              단, 다음의 경우에는 예외로 합니다.<br/>
              (1) 쇼핑중개로 인하여 (사이버)쇼핑몰과 배송업체에게 배송에 필요한 최소한의 이용자의 정보(아이디, 성명, 주소, 전화번호)를 알려주는 경우<br/>
              (2) 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우<br/>
              (3)&quot;사이트&quot;가 회원들의 유익을 극대화하기 위하여 제휴한 업체에 회원정보를 제공하는 경우. 단, &quot;사이트&quot;는 사전에 제휴업체, 제공목적, 제공할 정보 등을 공지하고 회원의 동의를 얻어야 합니다.<br/>
              3)&quot;사이트&quot;가 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받는자, 제공목적 및 제공할 정보의 내용)등 정보통신망이용촉진등에관한법률 제16조제3항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.<br/>
              4)이용자는 언제든지 &quot;사이트&quot;가 가지고 있는 자신의 개인정보에 대해 열람 및 오류 정정을 요구할 수 있으며 &quot;사이트&quot;는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다.<br/>
              이용자가 오류의 정정을 요구한 경우에 &quot;사이트&quot;는 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.<br/>
              5)&quot;사이트&quot;는 개인정보 보호를 위하여 관리자를 한정하여 그 수를 최소화하며 이용자의 개인정보의 분실, 도난, 유출, 변조 등으로 인한 이용자의 손해에 대하여 책임을 집니다.<br/>
              6)&quot;사이트&quot; 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집 목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.<br/>
              <br/>
              제 16 조 (&quot;사이트&quot;의 의무)<br/>
              1)&quot;사이트&quot;는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는 데 최선을 다하여야 합니다.<br/>
              2)&quot;사이트&quot;는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.<br/>
              3)&quot;사이트&quot;는 이용자가 원하지 않는 영리 목적의 광고성 전자우편을 발송하지 않습니다. 단, 이용자가 원하는 경우에는 그러하지 아니합니다.<br/>
              <br/>
              제 17 조 (회원의 ID 및 비밀번호에 대한 의무)<br/>
              1)ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.<br/>
              2)회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.<br/>
              3)회원이 자신의 ID 및 비밀번호를 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 &quot;사이트&quot;에 통보하고 &quot;사이트&quot;의 안내가 있는 경우에는 그에 따라야 합니다.<br/>
              4)ID는 주민등록상의 본인실명으로 발급하는 것을 원칙으로 합니다. 단, 법인의 경우에는 그러하지 아니합니다.<br/>
              5)ID는 공유 또는 양도할 수 없습니다. 회원이 회사와 사전 협의 없이 ID를 공유, 양도하는 경우 회사는 해당 ID를 중지할 수 있습니다. 단, 회사와 회원이 별도 조건에 따라 약정하는 경우는 그러하지 아니합니다.<br/>
              <br/>
              제 18 조 (이용자의 의무)<br/>
              이용자는 다음 각호에 해당되는 행위를 하여서는 안됩니다. 다음 각호에 해당되는 행위가 발견되면 회사는 해당자의 회원자격을 정지 혹은 박탈시킬 수 있습니다.<br/>
              1) 신청 또는 변경시 허위내용의 등록<br/>
              2) &quot;사이트&quot;에 게시된 정보의 변경<br/>
              3) &quot;사이트&quot;가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시<br/>
              4) &quot;사이트&quot;와 기타 제3자의 저작권 등 지적재산권에 대한 침해<br/>
              5) &quot;사이트&quot;와 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위<br/>
              6) 외설 또는 폭력적인 메시지ㆍ화상ㆍ음성 기타 공서양속에 반하는 정보를 사이트에 공개 또는 게시하는 행위<br/>
              7) 다른 회원의 ID를 사용하는 행위<br/>
              8) &quot;사이트&quot;에서 제공하는 서비스를 통해서 얻은 정보를 회사의 승인 없이 무단으로 사용하거나 유포하는 행위<br/>
              9) 스토킹(stalking) 등 다른 이용자를 괴롭히는 행위<br/>
              10) &quot;사이트&quot;의 승인을 받지 아니한 광고 판촉물(상품광고, 행사광고, 정크메일, 스팸, 행운의 편지, 피라미드 조직홍보 등 포함)을 전자메일 또는 기타의 방법으로 전송하거나 게재하는 행위<br/>
              11) 다른 이용자의 개인정보를 수집하거나 저장하는 행위<br/>
              12) 기타 관계 법령에 위배되는 행위<br/>
              <br/>
              제 19 조 (연결&quot;사이트&quot;와 피연결&quot;사이트&quot; 간의 관계)<br/>
              상위 &quot;사이트&quot;와 하위 &quot;사이트&quot;가 하이퍼 링크(예: 하이퍼 링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 &quot;연결 사이트&quot;(웹 사이트)라고 하고 후자를 &quot;피연결 사이트&quot;(웹사이트)라고 합니다.<br/>
              &quot;연결 사이트&quot;는 &quot;피연결 사이트&quot;가 독자적으로 제공하는 재화ㆍ용역에 의하여 이용자와 행하는 거래에 대해서 보증책임을 지지 않는다는 뜻을 &quot;연결사이트&quot;의 사이트에서 명시한 경우에는 그 거래에 대한 보증책임을 지지 않습니다.<br/>
              <br/>
              제 20 조 (&quot;사이트&quot;의 정보 제공 및 광고)<br/>
              ) &quot;사이트&quot;는 회원이 가입시에 받기 원한다고 표시한 정보들을 정기 혹은 부정기 적으로 보낼 수 있습니다. 단, 회원이 거부 의사를 표시하면 즉시 중단합니다.<br/>
              ) &quot;사이트&quot;는 &quot;사이트&quot;에서 제공하는 서비스에 광고를 게재할 수 있습니다.<br/>
              <br/>
              제 21 조 (이용자의 게시물)<br/>
              &quot;사이트&quot;는 이용자가 게시한 내용물에 대해서 다음 각호에 해당하는 경우에 사전 통보 없이 삭제할 수 있으며, &quot;사이트&quot;와 전략적 제휴를 맺은 다른 업체에 이용자가 등록한 컨텐츠를 공유할 수 있습니다.<br/>
              1)타인에 대한 인신공격성 발언, 저속한 표현 등을 사용한 경우<br/>
              2)&quot;사이트&quot;가 제시한 게시 기간을 초과하는 경우<br/>
              3)음란한 자료 혹은 음란 사이트 관련 링크를 올리는 경우<br/>
              4)&quot;사이트&quot;를 포함한 타인의 저작권을 침해한 게시물의 경우<br/>
              5)공서양속을 저해하거나 관계법령에 위반되는 경우<br/>
              <br/>
              제 22 조 (저작권의 귀속 및 이용 제한)<br/>
              1)&quot;사이트&quot;가 작성한 저작물에 대한 저작권 기타 지적재산권은 &quot;사이트&quot;에 귀속합니다.<br/> 
              이용자는 &quot;사이트&quot;를 이용함으로써 얻은 정보를 &quot;사이트&quot;의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.<br/>
              2)게시물(이용자가 &quot;사이트&quot;에 업로딩한 글, 영상, 소리 등)에 대한 권리와 책임은 게시자에게 있으며 &quot;사이트&quot;와 전략적 제휴를 맺은 다른 업체와 공유할 수 있습니다.<br/>
              제 23 조 (분쟁해결)<br/>
              1)&quot;사이트&quot;는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 적극적으로 처리합니다.<br/>
              2)&quot;사이트&quot;는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리 일정을 즉시 통보합니다.<br/>
              <br/>
              제 24 조 (손해배상)<br/>
              &quot;사이트&quot;는 서비스가 무료로 운영되는 동안에는 서비스 이용과 관련하여 &quot;사이트&quot;의 고의, 과실에 의한 것이 아닌 한 회원에게 발생한 어떠한 손해에 관해서도 책임을 지지 않습니다.<br/>
              <br/><br/>
              제 25 조(면책조항)<br/>
              1)천재지변 등 불가항력에 의한 서비스 중단 및 이용자가 올린 데이타의 유실 혹은 손상 시 &quot;사이트&quot;는 책임이 면제됩니다.<br/>
              2)&quot;사이트&quot;는 이용자가 게재한 정보의 사실 여부, 정확도 등 내용에 대해서는 책임이 면제됩니다.<br/>
              3)서비스 이용과 관련하여 이용자에게 발생한 손해 중 이용자의 고의, 과실에 의한 손해에 대하여 책임이 면제 됩니다.<br/>
              4)&quot;사이트&quot;는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며 그밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임이 면제됩니다.<br/>
              제 26 조(재판권 및 준거법)<br/>
              1)&quot;사이트&quot;와 이용자간에 발생한 전자거래 분쟁에 관한 소송은 &quot;사이트&quot; 운영사 소재지 관할 법원에 제기합니다.<br/>
              2)&quot;사이트&quot;와 이용자간에 제기된 전자거래 소송에는 한국법을 적용합니다.<br/>
              <br/><br/>
              -부칙-<br/>
              본 약관은 2015년 8월 3부터 적용되며, 2010년 04월 16일부터 시행되던 약관은 본 약관으로 대체합니다. 본 약관의 적용일자 이전 가입자 또한, 본 약관의 적용을 받습니다. 
              <br/><br/>
              이 약관은 2015년 8월 3일부터 시행됩니다. 
              <br/><br/>
              ※ 본 약관에 대한 저작권은 주식회사 데이스톤에 있습니다 
            </S.TermBox>
          </S.MiddleTitle>
          {/* <S.MiddleTitle>
            <h3>2. 개인정보 수집 및 이용에 대한 안내</h3>
            <div className="sctAgr">
              <label htmlFor="agr3">[필수]동의합니다.</label>
              <input type="checkbox" id="agr3" name="memAgr" value="Y" style={{WebkitAppearance:"checkbox"}} />
            </div>
            <S.TermBox>
              1. 개인정보 수집에 대한 동의<br/>
              (주)데이스톤은 회원가입을 통하여 개인정보를 수집하고 있습니다. 또한 (주)데이스톤은 회원님의 개인정보 수집에 대하여 동의를 받고 있으며, 사이트 회원가입 절차 중 약관동의(이용약관 및 개인정보취급방침) 절차를 마련해 두고 있습니다. 회원님께서 [동의합니다] 버튼을 클릭하시면 개인정보 수집에 대해 동의한 것으로 봅니다.
              <br/><br/>
              2. 개인정보의 수집 및 이용목적<br/>
              “개인정보”라 함은 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 생년월일 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보를 말합니다.<br/>
              사이트의 대부분 서비스는 별도의 회원가입 없이 이용할 수 있습니다. 다만, 회원님들에게 보다 향상된 양질의 서비스를 제공하기 위하여 일부 서비스의 경우 회원가입 후 로그인을 요구하며, 이에 회원가입을 통하여 개인의 정보를 수집하고있습니다.<br/>
              (주)데이스톤은 회원의 사전 동의 없이 개인 정보를 공개하지 않으며, 수집된 정보는 아래와 같이 이용되고 있습니다.<br/>
              첫째, 회원님들이 제공한 개인정보를 바탕으로 보다 더 유용한 서비스를 개발하고 있습니다.<br/>
              둘째, 각 수집 정보별 수집 목적은 다음과 같습니다.<br/>
              1) 기본 정보 사항<br/>
              - 이름, 아이디, 이메일, 전화번호, 이동전화번호, 교회, 교단명, 목회자, 교회주소, 교회연락처, 직분, 외국인에 한해 여권번호/외국인등록번호 는 본인 식별을 위해 수집됩니다.<br/>
              - 메일주소, 전화번호 는 계약이행을 위한 연락 및 안내, 영수증 및 청구서 송부, 배송진행상황의 통보, 신상품이나 이벤트 정보 안내 등을 위해 수집됩니다.<br/>
              2) 추가 정보 사항<br/>
              - 주소 는 이벤트 및 주문상품의 배송을 위해 수집됩니다.<br/>
              - 소속교회규모, 교회사역, 관심분야, 메일수신동의, SMS수신동의 는 회원님의 개인정보를 바탕으로 보다 좋은 서비스 제공을 위해 수집됩니다.<br/>
              <br/>
              3. 수집하는 개인정보 항목 및 수집방법<br/>
              (주)데이스톤은 이용자들이 회원서비스를 이용하기 위해 회원으로 가입하실 때 서비스 제공을 위한 필수적인 정보들을 사이트를 통해 입력 받고 있습니다. 회원가입시에 받는 필수적인 정보는 성명, 생년월일, 아이디, 메일주소, 전화번호입니다. 만14세미만 어린이는 회원가입시 부모님(법정대리인)의 동의가 이루어진 후 필수 입력사항으로 성명, 생년월일, 메일주소와 전화번호를 받고 있습니다.<br/> 
              또한 회원들의 선택에 의하여 소속교회규모, 교회사역, 관심분야, 메일수신동의, SMS수신동의 항목들을 추가정보로 입력받고 있습니다.<br/>
              그리고 (주)데이스톤내에서의 설문조사, 이벤트 행사, 메일링 신청등을 위해 선별적으로 개인정보 입력을 요청할 수 있습니다. 그리고 어떤 경우에라도 입력하신 정보를 이용자들에게 사전에 밝힌 목적 이외에 다른 목적으로는 사용하지 않으며 외부로 유출하지 않습니다.<br/>
              <br/>
              4. 개인정보의 보유 및 이용기간<br/>
              회원이 (주)데이스톤의 회원으로서 (주)데이스톤이 제공하는 서비스를 받는 동안 회원님의 개인정보는 (주)데이스톤에서 계속 보유하며 서비스 제공을 위해 이용하게 됩니다. 다만 회원님께서 탈퇴를 하시거나 (주)데이스톤의 이용약관 제5조에 의한 회원 탈퇴 및 자격 상실의 경우에는 회원님께 사전에 알려드린 개인정보를 제공받은 목적이 달성된 경우에 수집된 개인의 정보는 재생할 수 없는 방법에 의하여 하드디스크에서 완전히 삭제되며 어떠한 용도로도 열람 또는 이용할 수 없도록 처리됩니다. 귀하의 개인정보는 다음과 같이 개인정보의 수집목적 또는 제공받은 목적이 달성되면 파기하는 것을 원칙으로 합니다. 다만, (주)데이스톤은 불량 회원의 부정한 이용의 재발을 방지하기 위해, 이용계약 해지일로부터 1년간 해당 회원의 생년월일를 보유할 수 있습니다. 그리고 상법, 전자상거래등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 (주)데이스톤은 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 (주)데이스톤은 (주)데이스톤이 보관하는 정보를 그 본관의 목적으로만 이용하며 보존기간은 아래와 같습니다.<br/>
              - 계약 또는 청약철회 등에 관한 기록 : 5년<br/>
              - 대금결제 및 재화등의 공급에 관한 기록 : 5년<br/>
              - 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년<br/>
              서비스 이용의 혼선 방지, 불법적 사용자에 대한 수사기관 수사 협조 등을 위해, 회원탈퇴 후에도 회원님의 정보를 1년간 보유하게 됩니다. (주)데이스톤은 귀중한 회원의 개인정보를 안전하게 처리하며, 유출의 방지를 위하여 다음과 같은 방법을 통하여 개인정보를 파기합니다.<br/>
              - 종이에 출력된 개인정보는 분쇄기로 분쇄합니다.<br/>
              - 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.<br/>
              <br/>
              5. 개인정보의 공유 및 제 3자 제공<br/>
              (주)데이스톤은 회원님의 동의가 있거나 법률의 규정에 의한 경우를 제외하고는 어떠한 경우에도 “2. 개인정보의 수집목적 및 이용목적‘에서 고지한 범위에서 고지한 범위를 넘어서 회원님의 개인정보를 이용하거나 타인 또는 타기업, 기관에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.<br/>
              - 법령의 규정에 의거하거나, 수사상 목적으로 법령에 정해진 절차와 방법에 따라 관련 기관의 요구가 있는 경우<br/>
              - 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우<br/>
              - 유료서비스 제공에 따른 요금정산을 위하여 필요한 경우<br/>
              - 회원들이 사전에 공개에 동의한 경우<br/>
              - (주)데이스톤 서비스 이용약관 및 운영원칙을 위반한 경우<br/>
              - 이벤트 및 경품 배송 등의 서비스를 위하여 위탁업체에게 배송정보(성명, 연락처, 주소)를 제공하는 경우<br/>
              - 제휴사에서 운영하는 콜센터를 통한 자동차 보험상품 안내를 위한 경우, <br/>
              성명 , 주민번호 ,주소, 이메일, 휴대폰번호, 일반전화, 회원가입일자를 업체에 제공하거나 공유할 수 있습니다.<br/> 
              이때 이용자의 약관 동의는 아래 개인정보 활용에 동의한 것으로 간주 합니다.<br/>
              ① 자동차보험상품 안내 서비스 제공(TM 마케팅 서비스를 포함 )<br/>
              ② 제휴업체 서비스 제공 및 상품의 안내, 가입권유, 보험개발원 조회를TM 을 위하여 업무제휴 한 경우<br/>
              ③ 위 ②항과 관련된 업무제휴 현황은 보험사로는 흥국화재해상보험 입니다.<br/>
              ④ 위 ③항과 관련한 광고대행사는 애드프레임시스템, 제스트온 으로써 (주)데이스톤 광고대행을 중계하고있는 업체입니다.<br/>
              상기 제휴 이외에 (주)데이스톤은 현재 회원님의 동의 없이 회원님의 개인정보 취급을 외부 업체에 위탁하지 않습니다. <br/>
              향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무 내용에 대해 고객님에게 공지하고 필요한 경우 사전 동의를 받도록 하겠습니다.<br/>
              <br/>
              6. 비회원 고객 개인정보 보호<br/>
              (주)데이스톤이 운영하는 (주)데이스톤몰은 비회원 고객 또한 물품 및 서비스 상품의 구매를 하실 수 있습니다. 비회원 주문의 경우 대금 결제와 상품 배송에 반드시 필요한 개인정보 만을 고객에게 요청하고 있습니다. 비회원 고객께서 입력하신 지불인 정보 및 수령인 정보는 대금 결제 및 상품 배송에 관련한 용도 외에는 다른 어떠한 용도로도 사용하지 않습니다.<br/>
              <br/>
              7. 쿠키(cookie)의 운영 및 활용<br/>
              (주)데이스톤은 회원님들에게 적합하고 보다 유용한 서비스를 제공하기 위해서, 회원님의 정보를 저장하고 수시로 불러오는 쿠키(Cookie)를 사용합니다.<br/> 
              쿠키란 사이트에 접속시 자동으로 서버가 회원님의 컴퓨터 브라우저에게 보내는 소량의 텍스트 파일로서 회원님들의 pc 컴퓨터 내의 하드디스크에 저장됩니다.<br/>
              회원님은 쿠키에 대한 선택권을 가지고 있습니다. 회원님의 웹브라우저에서 옵션을 선택함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때 마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 단 쿠키의 저장을 거부하실 경우 로그인이 필요한 (주)데이스톤 사이트의 모든 서비스는 이용 하실 수 없게 됩니다.<br/>
              <br/>
              8. 개인정보보호를 위한 기술적/제도적 관리<br/>
              (주)데이스톤은 회원들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.<br/>
              - (주)데이스톤은 개인정보 및 인증정보를 송수신할때는 웹서버에 SSL(Secure Socket Layer) 인증서를 설치하여 정보를 보고 하고 있습니다.<br/>
              - 불법적인 해킹방지를 위해 자체 첨단 방화벽을 설치하여 운영하고 있으며 접속 로그분석 및 실시간 바이러스 감시시스템이 운영중입니다.<br/>
              - 개인정보 취급 직원을 최소한으로 제한하고 담당직원에 대한 수시 교육을 통하여 본 정책의 준수를 강조하고 있으며, 문제가 발견될 경우 바로 시정조치하고 있습니다.<br/>
              회원님의 개인정보는 비밀번호에 의해 보호되고 있습니다. 회원님의 아이디(ID)의 비밀번호는 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다. 따라서 회원님의 비밀번호는 누구에게도 알려주면 안 됩니다. 또한 작업을 마치신 후에는 로그아웃(log-out)하시고 웹브라우저를 종료하는 것이 바람직합니다. 특히 다른 사람과 컴퓨터를 공유하여 사용하거나 공공장소에서 이용한 경우 개인정보가 다른 사람에게 알려지는 것을 막기 위해서 이와 같은 절차는 꼭 필요합니다.<br/> 
              회원님 본인의 부주의나 인터넷상의 문제로 비밀번호, 생년월일 등 개인정보가 유출해 발생한 문제에 대해 (주)데이스톤은 일체의 책임을 지지 않습니다.<br/>
              <br/>
              9. 자신의 개인정보 열람, 정정 및 삭제<br/>
              회원님은 언제든지 사이트의 회원정보수정 페이지를 통해 회원님의 개인정보를 열람하거나 정정하실 수 있으며, 아이디(ID)삭제(회원탈퇴)를 직접 하실 수 있습니다.<br/> 
              회원정보수정 페이지는 (주)데이스톤 사이트 로그인 후 이용하실 수 있습니다. 아이디(ID) 및 비밀번호를 잊어버린 경우에는 회원 로그인 페이지 하단에 있는 (아이디 찾기), (비밀번호 찾기)를 클릭하여 찾으실 수 있습니다.<br/>
              <br/>
              10. 만 14세 미만 어린이의 개인정보 보호<br/>
              현행법상 만 14세 미만의 어린이는 온라인으로 타인에게 개인정보를 보내기 전에 반드시 개인정보의 수집 및 이용목적에 대하여 충분히 숙지하고 법정대리인의 동의를 받아야 합니다.<br/>
              - (주)데이스톤은 14세 미만 어린이 회원 가입시 부모님 및 법정대리인의 동의를 받았는지의 여부를 확인합니다.<br/>
              - (주)데이스톤은 부모님 및 법정대리인의 핸드폰, 실명확인후 메일을 통하여 동의의사를 확인하고 있습니다.<br/>
              - 수집된 어린이의 부모님 및 법정대리인의 성명, 생년월일, 전화번호, 이메일주소는 동의여부 확인 및 추후 법정대리인의 본인 확인하는 용도로만 사용할 것입니다.<br/>
              - 만 14세 미만 어린이의 부모님 및 법정대리인은 어린이의 개인정보 열람, 정정, 동의철회를 요청할 수 있으며, 이러한 요청이 있을 경우 (주)데이스톤은 지체 없이 필요한 조치를 취합니다.<br/>
              <br/>
              11. 개인정보보호문의 및 개인정보관리책임자<br/>
              (주)데이스톤은 회원님의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 개인정보관리책임자를 두고 있습니다. 회원님의 개인정보와 관련한 문의사항이 있으시면 아래의 개인정보관리책임자 또는 개인정보관리담당자에게 연락주시기 바랍니다.<br/> 
              <br/>
              개인정보 관리책임자<br/>
              책임 및 담당자: 김택환 대표<br/>
              전 화 : 02-6462-0200<br/>
              이메일 : takwhan.kim@onmam.com<br/>
              
              
              (주)데이스톤은 회원님의 문의사항 및 불만사항을 신속히 처리하여 답변 드리도록 하겠습니다.<br/> 
              개인정보에 관한 상담이 필요하시면 정부에서 운영중인 아래의 기관에서 도움을 받으실 수 있습니다.<br/>
              <br/>
              - 개인정보 침해신고센터 (http://www.cyberprivacy.or.kr, 전화 02-1336)<br/>
              - 개인정보 분쟁조정위원회 (http://www.kopico.or.kr, 전화 02-1336)<br/>
              - 정보보호마크 인증위원회 (http://www.privacymark.or.kr, 전화 02-580-0533~4)<br/>
              <br/>
              12. (주)데이스톤 고객센터 안내<br/>
              (주)데이스톤은 회원님들의 민원사항 처리를 위해 고객센터를 운영하고 있으며 운영현황과 연락처는 다음과 같습니다.<br/>
              - 근무시간 : 평 일 09:00~18:00 (점심시간: 12:00~13:00 ; 주말 및 공휴일은 휴무)<br/>
              - 전화번호 : 02-6462-0200<br/>
              - 팩스(Fax) : 02-6462-0201<br/>
              - 기타문의 : 고객센터 &gt; 1:1문의<br/>
              <br/>
              - 부칙 -<br/>
              본 개인정보취급방침이 법령. 정책 또는 보안기술의 변경에 따라 내용의 추가. 삭제 및 수정이 있을 시에는 변경사항의 시행일의 7일 전부터 (주)데이스톤 사이트의 공지사항을 통하여 고지할 것 입니다.<br/>
              o 개인정보취급방침 공고일자 : 2015년 7월 27일<br/>
              o 개인정보취급방침 시행일자 : 2015년 8월 3일<br/>
              이전 개인정보보호정책 (2010년 11월 12일 ~ 2015년 8월 2일 적용)<br/> 
            </S.TermBox>
          </S.MiddleTitle> */}
          
          </form>
          <S.AgreeButtonWrapBox>
            <S.AgreeButton className='firstBtn' id="agree">동의</S.AgreeButton>
            <S.AgreeButton onClick={()=>{history.back();}}>동의하지 않음</S.AgreeButton>
          </S.AgreeButtonWrapBox>
        </S.AgreeContainer>
        <div className="tab-pane fade" id="certification" role="tabpanel">
          <p>Food truck fixie locavore, accusamus mcsweeney&apos;s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
        </div>
        <div className="tab-pane fade" id="infoInput">
          <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney&apos;s organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
        </div>
        <div className="tab-pane fade" id="completed">
          <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
        </div>
      </div>
    </div>
  );
}

export default User;
