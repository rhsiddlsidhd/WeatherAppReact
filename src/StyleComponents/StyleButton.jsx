import React from "react";
import styled from "styled-components";

const StyleButton = ({ children, ...rest }) => {
  return <StyleBtn {...rest}>{children}</StyleBtn>;
};

export default StyleButton;

const StyleBtn = styled.button.attrs((props) => ({
  ...props,

  width: props.width || "auto",
  height: props.height || "auto",
}))`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  height: ${({ height }) => height};
  width: ${({ width }) => width};
  font-size: ${({ theme }) => theme.fontSize.sm};

  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }

  & + & {
    margin-left: 1rem;
  }
`;
