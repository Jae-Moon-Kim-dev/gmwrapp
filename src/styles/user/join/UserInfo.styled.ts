import styled from "styled-components";

export const InfoContainer = styled.div`
    &::after {
        display: block;
        content: "";
        clear: both;
    }
`;

export const MiddleTitle = styled.section`
    width: 100%;
    margin-bottom: 16px;
    & h3 {
        font-size: 14px;
        color: #545454;
        line-height: 32px;
        height: 32px;
        font-weight: 600;
    }
`;

export const LayoutTbl = styled.div`
    border-top: 2px solid #545454;
    & > .row {
        width: 100%;
        border-bottom: 1px solid;
        margin: 0px !important;
    }
`;

export const Tit = styled.div`
    padding: 10px 0 10px 15px;
    font-weight: bold;
    font-size: 13px;
`;

export const Cont = styled.div`
    padding: 5px 10px 0 0;
    height: 48px;
`;

export const InputJo = styled.input`
    height: 34px;
    border: 1px solid #cccccc;
    padding: 0 10px;
    margin: 1px 5px 5px 0;
    background: #fff;
`;

export const RadioWrap = styled.div`
    padding-top: 15px;
    & input {
        margin-left: 2px;
        -webkit-appearance: radio;
    }
    & label {
        padding: 0 0 6px 2px;
    }
`;