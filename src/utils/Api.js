const APIKEY = process.env.REACT_APP_APIKEY;

export const fetchWeatherData = async ($lat, $lon, currentMode) => {
  try {
    const url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${$lat}&lon=${$lon}&appid=${APIKEY}&units=${currentMode}`
    );

    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (err) {
    throw Error(err.message);
  }
};

export const fetchCityNameData = async (cityName) => {
  try {
    const url =
      new URL(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}
  `);

    const res = await fetch(url);
    const data = res.json();

    return data;
  } catch (err) {
    throw Error(err.message);
  }
};

/**
 * forecast api
 */

export const fetchForecastApi = async ($lat, $lon, currentMode) => {
  try {
    const url = new URL(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${$lat}&lon=${$lon}&appid=${APIKEY}&units=${currentMode}`
    );
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (err) {
    throw Error(err.message);
  }
};
