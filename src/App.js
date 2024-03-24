import "./App.css";
import styled from "styled-components";
import WeatherHeader from "./components/WeatherHeader";
import WeatherMain from "./components/WeatherMain";
import { createContext, useEffect, useState } from "react";
import {
  fetchForecastApi,
  fetchCityNameData,
  fetchWeatherData,
} from "./utils/Api";
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다
//2. 도시 섭씨 화씨 날씨 상태정보
//3. 5개의 버튼이 있다 현재위치 4개는 다른도시
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재위치 기반으로 돌아온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 보인다.

export const GetDispatchDataContext = createContext();
export const GetStateValueContext = createContext();

function App() {
  /**
   * 현재 시간 구하기
   */
  const [getCurrentDate, setGetCurrentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState("");
  const [forecastData, setForecastData] = useState("");
  const [cityName, setCityName] = useState("");
  const citys = ["Seoul", "Tokyo", "Dubai", "Paris"];
  const selectUi = ["화창", "비", "눈", "흐림"];
  const formattedValue = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  useEffect(() => {
    const getDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = formattedValue(date.getMonth() + 1);
      const day = formattedValue(date.getDate());
      const hour = formattedValue(date.getHours());
      const minute = formattedValue(date.getMinutes());
      return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    setInterval(() => {
      const date = getDate();
      setGetCurrentDate(date);
    }, 1000);
  }, []);

  useEffect(() => {
    const getLatAndLog = () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const $lat = position.coords.latitude;
          const $lon = position.coords.longitude;
          const $getWeatherData = await fetchWeatherData($lat, $lon);
          const $forecastData = await fetchForecastApi($lat, $lon);
          setWeatherData($getWeatherData);
          setForecastData($forecastData);
          setLoading(true);
        });
      } catch (err) {
        throw Error(err.message);
      }
    };

    /**
     * 데이터의 구조는 동일
     * useEffect 시에 호출한 Api 주소를 각 도시별 Api 주소로 변경
     * 각 도시별 Api에 따른 Ui 변경 이루어짐
     */
    const getCityNameData = async () => {
      try {
        const $getCityNameData = await fetchCityNameData(cityName);

        setWeatherData($getCityNameData);
        setLoading(true);
      } catch (err) {
        throw Error(err.message);
      }
    };

    if (cityName === "") {
      getLatAndLog();
    } else {
      getCityNameData();
    }
  }, [cityName]);

  return (
    <GetDispatchDataContext.Provider
      value={{ weatherData, loading, citys, selectUi, forecastData }}
    >
      <GetStateValueContext.Provider value={setCityName}>
        <div className="App">
          <div className="weather_app">
            <CurrentTime>{getCurrentDate}</CurrentTime>
            <WeatherHeader />
            <WeatherMain />
          </div>
        </div>
      </GetStateValueContext.Provider>
    </GetDispatchDataContext.Provider>
  );
}

const CurrentTime = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: end;
  color: ${({ theme }) => theme.color.blue};
  font-weight: bold;
`;

export default App;
