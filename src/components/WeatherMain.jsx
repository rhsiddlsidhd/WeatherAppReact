import React, { useContext } from "react";
import styled, { css } from "styled-components";
import StyleBox from "../StyleComponents/StyleBox";
import StyleButton from "../StyleComponents/StyleButton";
import { GetDispatchDataContext, GetStateValueContext } from "../App";

const WeatherMain = () => {
  const {
    citys,
    selectUi,
    forecastData,
    currentMode,
    temperatureUnits,
    activeIndex,
    getCurrentDate,
  } = useContext(GetDispatchDataContext);
  const { setCityName, setActiveIndex } = useContext(GetStateValueContext);

  const today = getCurrentDate.split(" ").shift().substring(5);
  console.log(today);
  const dailyForecastData = forecastData.list?.slice(0, 8);
  const weeklyForecastData = forecastData.list?.filter((_, index) => {
    return index % 8 === 0;
  });

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
              오늘 날씨를 알려드립니다. ({today} / 24시간)
            </div>
            <div className="hour_forecast_api">
              {dailyForecastData?.map((it, index) => {
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

                    <div>{`${it.main.temp}${temperatureUnits[currentMode]}`}</div>
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
              <div>주요 도시별</div>
              <StyleButton width="1rem" height="100%" onClick={toggleReset}>
                reset
              </StyleButton>
            </div>
            <div className="btns">
              {citys.map((it, index) => (
                <StyleButton
                  key={index}
                  value={it}
                  istoggle={true}
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
            주간 날씨를 알려드립니다. ({today} / 12시)
          </div>
          <div className="dayForecast_api">
            {weeklyForecastData?.map((it, index) => {
              const date = new Date(it.dt * 1000);
              const dayIndex = date.getDay();
              const dayText = ["일", "월", "화", "수", "목", "금", "토"];
              const dayOfWeek = dayText[dayIndex];

              return (
                <div key={index} className="dayForecast_api_items">
                  <div>{dayOfWeek}</div>
                  <img
                    src={`https://openweathermap.org/img/wn/${it.weather[0].icon}.png`}
                    alt="이미지"
                  />

                  <div>{`${it.main.temp_min}${temperatureUnits[currentMode]}`}</div>
                  <div>{`${it.main.temp}${temperatureUnits[currentMode]}`}</div>
                  <div>{`${it.main.temp_max}${temperatureUnits[currentMode]}`}</div>
                </div>
              );
            })}
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
