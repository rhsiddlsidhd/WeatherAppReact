import "./App.css";
import styled from "styled-components";
import WeatherHeader from "./components/WeatherHeader";
import WeatherMain from "./components/WeatherMain";
import { createContext, useEffect, useState } from "react";
import { getWeatherData } from "./utils/Api";
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다
//2. 도시 섭씨 화씨 날씨 상태정보
//3. 5개의 버튼이 있다 현재위치 4개는 다른도시
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재위치 기반으로 돌아온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 보인다.

export const CurrentWeatherDataContext = createContext();

function App() {
  /**
   * 현재 시간 구하기
   */
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(false);

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
      const currentDate = getDate();
      setCurrentDate(currentDate);
    }, 1000);
  }, []);

  const [currentWeatherData, setCurrentWeatherData] = useState([]);

  useEffect(() => {
    // getLatAndLog();
    const getLatAndLog = () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const $lat = position.coords.latitude;
          const $lon = position.coords.longitude;
          const $weatherData = await getWeatherData($lat, $lon);
          setCurrentWeatherData($weatherData);
          setLoading(true);
        });
      } catch (e) {
        throw Error(e.message);
      }
    };

    getLatAndLog();
  }, []);

  return (
    <CurrentWeatherDataContext.Provider value={{ currentWeatherData, loading }}>
      <div className="App">
        <div className="weather_app">
          <CurrentTime>{currentDate}</CurrentTime>
          <WeatherHeader />
          <WeatherMain />
        </div>
      </div>
    </CurrentWeatherDataContext.Provider>
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
