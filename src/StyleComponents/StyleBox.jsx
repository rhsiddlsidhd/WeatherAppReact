import React from "react";
import styled, { css } from "styled-components";

const StyleBox = ({ children, ...rest }) => {
  return <BoxContainer {...rest}>{children}</BoxContainer>;
};

export default StyleBox;

const BoxContainer = styled.div.attrs((props) => ({
  ...props,
  width: props.width || "auto",
  heigth: props.heigth || "auto",
}))`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.backgroundColor.transparent};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.blue};
  font-weight: bold;

  ${({ $btnContainer }) =>
    $btnContainer &&
    css`
      display: flex;
      flex-direction: column;

      > .btnTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 15%;
        padding-left: 1rem;
        padding-right: 1rem;
        color: ${({ theme }) => theme.color.gray};
        border-bottom: 1px solid ${({ theme }) => theme.color.white};
      }
      > .btns {
        height: 85%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    `}

  ${({ $dayForecast }) =>
    $dayForecast &&
    css`
      > .dayForecast_title {
        height: 10%;
        display: flex;
        padding-left: 1rem;
        align-items: center;
        border-bottom: 1px solid ${({ theme }) => theme.color.white};
      }
      > .dayForecast_api {
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > .dayForecast_api_items {
          height: 7%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: 1px solid ${({ theme }) => theme.color.white};
        }
      }
    `}
`;
