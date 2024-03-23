import React, { useContext } from "react";
import styled, { css } from "styled-components";
import StyleBox from "../StyleComponents/StyleBox";
import StyleButton from "../StyleComponents/StyleButton";
import { CurrentWeatherDataContext } from "../App";

const WeatherMain = () => {
  const { setCountryValue } = useContext(CurrentWeatherDataContext);

  const test = (e) => {
    setCountryValue(e.target.value);
  };
  return (
    <Main>
      <ArticleHourForecast>
        <FigureHourForecast>
          <StyleBox width="100%" height="90%">
            <div className="hour_forecast_title">예상됩니다</div>
            <div className="hour_forecast_api">
              <div className="hour_forecast_api_item">
                <div>오전10시</div>
                <div>아이콘</div>
                <div>15도</div>
              </div>
            </div>
          </StyleBox>
        </FigureHourForecast>
        <AsideBtns>
          <StyleBox width="45%" height="100%" $btnContainer>
            <div className="btnTitle">title</div>
            <div className="btns">
              <StyleButton>화창</StyleButton>
              <StyleButton>비</StyleButton>
              <StyleButton>눈</StyleButton>
              <StyleButton>흐림</StyleButton>
            </div>
          </StyleBox>
          <StyleBox width="45%" height="100%" $btnContainer>
            <div className="btnTitle">13</div>
            <div className="btns">
              <StyleButton value="kr" onClick={test}>
                Kr
              </StyleButton>
              <StyleButton value="ja" onClick={test}>
                Jp
              </StyleButton>
              <StyleButton value="en" onClick={test}>
                En
              </StyleButton>
              <StyleButton value="it" onClick={test}>
                Fr
              </StyleButton>
            </div>
          </StyleBox>
        </AsideBtns>
      </ArticleHourForecast>
      <ArticleDayForecast>
        <StyleBox width="95%" height="100%" $dayForecast>
          <div className="dayForecast_title">title</div>
          <div className="dayForecast_api">
            <div className="dayForecast_api_items">
              <div>월</div>
              <div>아이콘</div>
              <div>최저</div>
              <div>현재</div>
              <div>최고</div>
            </div>
          </div>
        </StyleBox>
      </ArticleDayForecast>
    </Main>
  );
};

export default WeatherMain;

const $displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  height: 60vh;
  display: flex;
`;

const ArticleHourForecast = styled.div`
  width: 70%;
  height: 100%;
`;

const ArticleDayForecast = styled.div`
  width: 30%;
  height: 90%;
  ${$displayCenter}
  align-items: start;
`;

const FigureHourForecast = styled.div`
  height: 60%;
  ${$displayCenter}
  align-items: start;

  .hour_forecast_title {
    ${$displayCenter}
    justify-content: start;
    height: 30%;
    border-bottom: 1px solid ${({ theme }) => theme.backgroundColor.white};
    padding-left: 1rem;
  }

  .hour_forecast_api {
    height: 70%;
    display: flex;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }

    .hour_forecast_api_item {
      width: 10%;
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      margin-right: 1rem;

      > div {
        ${$displayCenter}
      }

      > div:first-child {
        flex: 1;
      }
      > div:nth-child(2) {
        /* 아이콘크기 */
        flex: 2;
      }
      > div:last-child {
        flex: 1;
      }
    }
  }
`;

const AsideBtns = styled.div`
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;
