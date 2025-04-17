"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React from "react";
import { Spinner } from "react-bootstrap";
import * as S from '@/styles/Loading.styled';
import { loadingStore } from "@/stores/loadingStore";

const Loading = ({ isLoading }: { isLoading?: boolean }) => {
  const isQuery = loadingStore((state) => state.isLoading);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const hidden = isLoading ? false : (isFetching || isMutating || isQuery) ? false : true;

  return <>{ !hidden ? <S.LoadingOverlay id="loading" >
    <div className="d-flex justify-content-center">
      <Spinner className="d-flex justify-content-center" hidden={hidden} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  </S.LoadingOverlay> : <></> }
  </>;
};

export default Loading;