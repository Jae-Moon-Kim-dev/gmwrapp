"use client";

import React from "react";
import * as S from '@/styles/Loading.styled';

const Loading = () => {
  return <S.LoadingOverlay id="loading" >
    <div className="d-flex justify-content-center"></div>
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </S.LoadingOverlay>;
};

export default Loading;