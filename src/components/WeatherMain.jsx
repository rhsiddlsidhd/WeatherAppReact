import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import StyleBox from "../StyleComponents/StyleBox";
import StyleButton from "../StyleComponents/StyleButton";
import { GetDispatchDataContext, GetStateValueContext } from "../App";

const WeatherMain = () => {
  const [forecastDataIndex, setForecastDataIndex] = useState(0);

  const { citys, selectUi, forecastData } = useContext(GetDispatchDataContext);
  const result = forecastData.list?.slice(0, 8);

  /**
   * forecastData.list.dt , forecastData.list.main.temp , forecastData.list.weather.icon
   *
   *
   * daily forecast
   *  index 0 ~ 7 = 8개 가져오기
   *
   * 주간 forecast
   *  index 7 > 11 > 15 > 19 > 23 > 27 > 31 > 35 > 39
   *
   */

  const setCityName = useContext(GetStateValueContext);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleReset = () => {
    /**
     * cityName 을 빈값으로 던져서 mount
     * button isActive 초기값
     */
    setCityName("");
    setActiveIndex(null);
  };

  return (
    <Main>
      <ArticleHourForecast>
        <FigureHourForecast>
          <StyleBox width="100%" height="90%">
            <div className="hour_forecast_title">
              현재 날씨를 알려드립니다. (현재기준/24시간)
            </div>
            <div className="hour_forecast_api">
              {result?.map((it, index) => {
                console.log(it);
                const date = new Date(it.dt * 1000);
                const hour = date.getHours();
                let text = hour >= 12 ? "오후" : "오전";

                return (
                  <div className="hour_forecast_api_item" key={index}>
                    <div>{`${text}${hour}시`}</div>
                    <img
                      src={`https://openweathermap.org/img/wn/${it.weather[0].icon}.png`}
                      alt="이미지"
                    />

                    <div>{it.main.temp}</div>
                  </div>
                );
              })}
            </div>
          </StyleBox>
        </FigureHourForecast>
        <AsideBtns>
          <StyleBox width="45%" height="100%" $btnContainer>
            <div className="btnTitle">
              <div>title</div>
              <StyleButton width="1rem" height="100%">
                reset
              </StyleButton>
            </div>
            <div className="btns">
              {selectUi.map((it, index) => (
                <StyleButton key={index} value={it} width="4rem" height="2rem">
                  {it}
                </StyleButton>
              ))}
            </div>
          </StyleBox>
          <StyleBox width="45%" height="100%" $btnContainer>
            <div className="btnTitle">
              <div>title</div>
              <StyleButton width="1rem" height="100%" onClick={toggleReset}>
                reset
              </StyleButton>
            </div>
            <div className="btns">
              {citys.map((it, index) => (
                <StyleButton
                  key={index}
                  value={it}
                  isactive={activeIndex === index ? index : null}
                  onClick={(e) => {
                    setCityName(e.target.value);
                    setActiveIndex(index);
                  }}
                  width="4rem"
                  height="2rem"
                >
                  {it}
                </StyleButton>
              ))}
            </div>
          </StyleBox>
        </AsideBtns>
      </ArticleHourForecast>
      <ArticleDayForecast>
        <StyleBox width="95%" height="100%" $dayForecast>
          <div className="dayForecast_title">
            주간 날씨를 알려드립니다. (12시 기준)
          </div>
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
    justify-content: space-between;
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
