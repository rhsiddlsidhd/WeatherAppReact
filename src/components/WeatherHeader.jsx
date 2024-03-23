import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { CurrentWeatherDataContext } from "../App";
import StyleButton from "../StyleComponents/StyleButton";
import Loading from "./Loading";

const WeatherHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentWeatherData, loading } = useContext(CurrentWeatherDataContext);

  const { name, weather, main } = currentWeatherData;

  const weatherMain = weather ? weather[0]?.main : "";

  const $main = main ? main : "";

  /**
   * default kelvin
   * 켈빈 => 화씨
   * 화씨 => 섭씨
   * 섭씨 => 켈빈
   * 값들을 배열로 관리해서 인덱스로 값 추가해서 계속 가져오기
   * 데이터는 한번만 저장하고 저장한 데이터를 가지고 순회
   * 각 데이터의 max 와 min까지 관리해야 해서 데이터를 객체로 전환
   * 객체로 전환한 값을 object.values 값들로 배열로 바꿔서 다시 무한순회
   *
   */

  const convertKelvinTemperature = (tempValues) => {
    let $tempValues = tempValues - 273.15;
    return Number($tempValues).toFixed(2);
  };

  const convertCelsiusTemperature = (tempValues) => {
    let $tempValues = ((tempValues - 32) * 5) / 9;

    return Number($tempValues.toFixed(2));
  };

  const fahrenheitTemp = convertKelvinTemperature($main.temp);
  const fahrenheitTempMax = convertKelvinTemperature($main.temp_max);
  const fahrenheitTempMin = convertKelvinTemperature($main.temp_min);

  const celsiusTemp = convertCelsiusTemperature($main.temp);
  const celsiusTempMax = convertCelsiusTemperature($main.temp_max);
  const celsiusTempMin = convertCelsiusTemperature($main.temp_min);

  const formattedTempData = {
    fahrenheit: {
      temp: `${fahrenheitTemp}°C`,
      temp_max: `${fahrenheitTempMax}°C`,
      temp_min: `${fahrenheitTempMin}°C`,
    },
    celsius: {
      temp: `${celsiusTemp}°F`,
      temp_max: `${celsiusTempMax}°F`,
      temp_min: `${celsiusTempMin}°F`,
    },
    kelvin: {
      temp: `${$main.temp}K`,
      temp_max: `${$main.temp_max}K`,
      temp_min: `${$main.temp_min}K`,
    },
  };
  const $formattedTempData = Object.values(formattedTempData);

  const indexCounter = () => {
    setCurrentIndex((currentIndex + 1) % $formattedTempData.length);
  };

  /**
   * 데이터를 불러오지 못했을 경우 로딩 이미지를 보여주고
   * 데이터를 다 가져왔으면 로딩이미지를 지우고 데이터를 보여줘
   */

  return (
    <Header>
      {loading ? (
        <CurrentWeather>
          <div className="title">{name}</div>
          <div className="temperature">
            <input
              className="temperature_calvin"
              value={
                $formattedTempData[currentIndex]
                  ? `${$formattedTempData[currentIndex].temp}`
                  : $main.temp
              }
              readOnly
            ></input>
            <StyleButton
              className="temperature_btn"
              width={"fit-content"}
              onClick={indexCounter}
            >
              Temperature
            </StyleButton>
          </div>
          <div className="weather">{weatherMain}</div>
          <div className="temperature_high_low">
            <div>
              {$formattedTempData[currentIndex]
                ? `${$formattedTempData[currentIndex].temp_max}`
                : $main.temp}
            </div>
            <div>
              {$formattedTempData[currentIndex]
                ? `${$formattedTempData[currentIndex].temp_min}`
                : $main.temp}
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
