"use client"

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import * as S from '@/styles/user/join/UserComplete.styled';

const Agree = ({className}:{className:string}):ReactNode => {
  const router = useRouter();

  const goHomePage = () => {
    router.push("/");
  }

  return <S.CompleteContainer className={className} >
    <S.TxtNote>
    님께서는 우리교회 홈피 가입 승인 대기 중 입니다.<br />
        <S.TxtNoteTip>우리교회 홈피 가입 승인 운영자에게만 있습니다.</S.TxtNoteTip>
    </S.TxtNote>
    <S.ButtonWrapBox>
        <S.Button onClick={goHomePage} >홈피 방문하기</S.Button> {/**saveInfo(); */}
      </S.ButtonWrapBox>
  </S.CompleteContainer>;
}

export default Agree;