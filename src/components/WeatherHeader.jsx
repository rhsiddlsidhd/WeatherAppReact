import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { GetDispatchDataContext, GetStateValueContext } from "../App";
import StyleButton from "../StyleComponents/StyleButton";
import Loading from "./Loading";

const WeatherHeader = () => {
  const {
    weatherData,
    loading,
    modes,
    currentMode,
    temperatureUnits,
    cityName,
    activeIndex,
  } = useContext(GetDispatchDataContext);

  const { setCurrentMode, setCityName, setActiveIndex } =
    useContext(GetStateValueContext);

  const { name, weather, main } = weatherData;

  const weatherMain = weather ? weather[0]?.main : "";

  const temperatureChange = () => {
    if (cityName !== "") {
      setCityName("");
    }
    if (activeIndex !== null) {
      setActiveIndex(null);
    }

    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    console.log({ nextIndex });
    setCurrentMode(modes[nextIndex]);
  };

  return (
    <Header>
      {loading ? (
        <CurrentWeather>
          <div className="title">{name}</div>
          <div className="temperature">
            <input
              className="temperature_calvin"
              value={`${main.temp}${temperatureUnits[currentMode]}`}
              readOnly
            ></input>
            <StyleButton
              className="temperature_btn"
              width={"fit-content"}
              onClick={temperatureChange}
            >
              Temperature Conversion
            </StyleButton>
          </div>
          <div className="weather">{weatherMain}</div>
          <div className="temperature_high_low">
            <div>
              <h3>최고</h3>
              {main.temp_max}
              {temperatureUnits[currentMode]}
            </div>
            <div>
              <h3>최저</h3>
              {main.temp_min}
              {temperatureUnits[currentMode]}
            </div>
          </div>
        </CurrentWeather>
      ) : (
        <Loading />
      )}
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
    color: ${({ theme }) => theme.color.blue};
    font-weight: bold;
  }

  & > .title {
    width: 30%;
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
      background-color: transparent;
      border: none;
      outline: none;
      text-align: center;
      font-size: ${({ theme }) => theme.fontSize.xlg};
      //일정 사이즈 이하로 내려가면 폰사이즈 내려가야함
      /* border: 1px solid gainsboro; */
      @media ${({ theme }) => theme.windowSize.large} {
        font-size: ${({ theme }) => theme.fontSize.lg};
      }
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
    & > div > h3 {
      ${$displayCenter}
    }
  }
`;
