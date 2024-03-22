import React from "react";
import styled, { css } from "styled-components";

import StyleButton from "../StyleComponents/StyleButton";

const WeatherHeader = () => {
  return (
    <Header>
      <CurrentWeather>
        <div className="title">지역</div>
        <div className="temperature">
          <div className="temperature_calvin">켈빈</div>
          <StyleButton className="temperature_btn" width={"fit-content"}>
            Temperature
          </StyleButton>
        </div>
        <div className="weather">weather</div>
        <div className="temperature_high_low">
          <div>최고</div>
          <div>최저</div>
        </div>
      </CurrentWeather>
    </Header>
  );
};

export default WeatherHeader;

const $displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  /* background-color: green; */
  height: 35vh;
  ${$displayCenter}
`;

const CurrentWeather = styled.div`
  width: 100%;
  height: 50%;
  /* border: 1px solid red; */
  ${$displayCenter}
  justify-content: start;
  flex-direction: column;
  & > * {
    font-size: ${({ theme }) =>
      theme.fontSize.base}; /* 자식 요소들의 font-size를 통일 */
  }

  & > .title {
    width: 30%;
    color: red;
    height: 20%;
    font-size: ${({ theme }) => theme.fontSize.lg};
    /* border: 1px solid red; */
    ${$displayCenter}
  }

  & > .temperature {
    width: 30%;
    color: blue;
    height: 50%;
    /* border: 1px solid blue; */
    ${$displayCenter}
    justify-content: space-around;
    flex-direction: column;

    & > .temperature_calvin {
      width: 100%;
      height: 80%;
      ${$displayCenter}
      font-size: ${({ theme }) => theme.fontSize.xlg};
      //일정 사이즈 이하로 내려가면 폰사이즈 내려가야함
      /* border: 1px solid gainsboro; */
      @media ${({ theme }) => theme.windowSize.large} {
        font-size: ${({ theme }) => theme.fontSize.lg};
      }
    }
    & > .temperature_btn {
      border: 1px solid black;
      ${$displayCenter}
    }
  }

  & > .weather {
    width: 30%;
    height: 20%;
    /* border: 1px solid pink; */
    ${$displayCenter}font-size: ${({ theme }) => theme.fontSize.md};
  }

  & > .temperature_high_low {
    width: 30%;
    /* border: 1px solid brown; */
    ${$displayCenter}
    justify-content: space-between;
  }
`;
