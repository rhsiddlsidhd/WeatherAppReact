const APIKEY = process.env.REACT_APP_APIKEY;

export const getWeatherData = async ($lat, $lon) => {
  try {
    const url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${$lat}&lon=${$lon}&lang=${"kr"}&appid=${APIKEY}`
    );

    const res = await fetch(url);
    const data = res.json();

    // console.log(data);
    return data;
  } catch (err) {
    throw Error(err.message);
  }
};
