const APIKEY = process.env.REACT_APP_APIKEY;

export const getWeatherData = async ($lat, $lon) => {
  try {
    const url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${$lat}&lon=${$lon}&appid=${APIKEY}`
    );

    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (err) {
    throw Error(err.message);
  }
};

export const getCityNameData = async (cityName) => {
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
