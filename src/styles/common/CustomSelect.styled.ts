import Select from "react-select";
import styled from "styled-components";

export const CustomSelect = styled(Select)`
  & .Select {
    &__control {
      display: flex;
      align-items: center;
      border-radius: 0;
      border: none;
      height: 100%;

      &--is-focused {
        box-shadow: 0 0 1px ${(props) => props.theme.colors.gray};
        /* border-color: transparent !important; */
      }

      &--menu-is-open {
        border-color: transparent;
        box-shadow: none;

        :hover {
          border-color: transparent;
        }

        svg {
          color: ${(props) => props.theme.colors.white};
        }
      }
    }

    &__menu {
      margin-top: 15px;
      top: calc(100% - 2px);
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);

      border-top: 0;
      &-list {
        padding: 0;
        justify-content: center;
        align-items: center;
      }
    }

    &__option {
      height: 40px;
      display: "flex";
      align-items: "center";
      padding: 9px 0px 9px 15px;
      border-top: 1px solid ${(props) => props.theme.colors.gray};
      color: ${(props) => props.theme.colors.black};
      background-color: ${(props) => props.theme.colors.white};
      &--is-selected {
        /* color: ${(props) => props.theme.colors.white};
        background-color: ${(props) => props.theme.colors.gray}; */
        font-weight: bold;
      }
      &--is-focused {
        box-shadow: none;
        background-color: ${(props) => props.theme.colors.gray};
      }
    }
  }
`;