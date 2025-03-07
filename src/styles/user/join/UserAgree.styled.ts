import styled from "styled-components";

export const AgreeContainer = styled.div`
    &::after {
        display: block;
        content: "";
        clear: both;
    }
`;

export const BoxType1 = styled.div`
    float: left;
    padding: 25px 0;
    width: 100%;
    background: #f7f7f7;
    margin-bottom: 16px;
`;

export const TermBox = styled.div`
    float: left;
    border: 1px solid #d6d6d6;
    padding: 25px 29px;
    height: 88px;
    overflow: auto;
    font-family: dotum, '돋움';
    line-height: 16px;
    font-size: 11px;
    letter-spacing: 0;
`;

export const MiddleTitle = styled.section`
    float: left;
    width: 100%;
    margin-bottom: 16px;
    & > h3 {
        float: left;
        font-size: 14px;
        color: #545454;
        line-height: 32px;
        height: 32px;
        font-weight: 600;
    }
    &::after {
        display: block;
        content: "";
        clear: both;
    }
`;

export const AgreeFormBox = styled.div`
    float: left;
    width: 100%;
    margin: 0 0 30px;
    text-align: center;
    margin-top: 60px !important;
`;

export const AgreeButtonWrapBox = styled.div`
    float: left;
    width: 100%;
    margin: 0 0 30px;
    text-align: center;
    margin-top: 60px !important;
    &::after {
        display: block;
        content: "";
        clear: both;
    }
`;

export const AgreeButton = styled.button`
    width: 195px;
    height: 46px;
    line-height: 46px;
    font-size: 15px;
    font-weight: normal;
    margin: 0 2px;
    display: inline-block;
    border: 1px solid #d6d6d6;
    text-align: center;
    background: #fff;
    vertical-align: top;
    padding: 0;
    cursor: pointer;
    letter-spacing: -1px;
    &.firstBtn {
       color: #e40e64; 
    }
`;
