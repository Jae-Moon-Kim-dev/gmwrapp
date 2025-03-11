import styled from "styled-components";

export const CompleteContainer = styled.div`
    margin: 40px auto;
    border: 0;
    &::after {
        display: block;
        content: "";
        clear: both;
    }
`;
export const TxtNote = styled.div`
    width: 100%;
    text-align: center;
    font-size: 19px;
    font-weight: bold;
    line-height: 25px;
    margin: 40px 0 20px;
`;
export const TxtNoteTip = styled.p`
    font-size: 14px;
    font-weight: normal;
    margin-top: 10px;
`;
export const ButtonWrapBox = styled.div`
    float: left;
    width: 100%;
    margin: 15px 0 30px 0;
    text-align: center;
    &::after {
        display: block;
        content: "";
        clear: both;
    }
`;

export const Button = styled.button`
    width: 195px;
    height: 48px;
    line-height: 48px;
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
    color: #e40e64;
`;