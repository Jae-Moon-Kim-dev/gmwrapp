import styled from "styled-components";

export const InputJo = styled.input`
    height: 34px;
    border: 1px solid #cccccc;
    padding: 0 10px;
    margin: 1px 5px 5px 0;
    background: #fff;
    &:disabled {
        background-color: var(--bs-secondary-bg);
    }
`;

export const BtnLogin = styled.input`
    border: 1px solid #757575;
    background: #868686;
    width: 98px;
    height: 76px;
    color: #fff;
    font-size: 14px;
`;
