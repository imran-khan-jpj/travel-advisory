import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
  var options = {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "x-rapidapi-key": "1dd36351d1msh8d433dcf810420fp15eb9djsn6b33de827dd0",
    },
  };
  try {
    const {
      data: { data },
    } = await axios.get(url, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  let weatherUrl = "https://community-open-weather-map.p.rapidapi.com/weather";
  let params = {
    lat: lat,
    lon: lng,
  };

  try {
    let { data } = await axios.get(weatherUrl, {
      params,
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "1dd36351d1msh8d433dcf810420fp15eb9djsn6b33de827dd0",
      },
    });
    return data;
  } catch (error) {}
};

export const getNearestCities = async (lat, lng) => {
  let nearestCities = "https://geocodeapi.p.rapidapi.com/GetNearestCities";

  try {
    let { data } = await axios.get(nearestCities, {
      params: { latitude: lat, longitude: lng, range: "0" },
      headers: {
        "x-rapidapi-host": "geocodeapi.p.rapidapi.com",
        "x-rapidapi-key": "1dd36351d1msh8d433dcf810420fp15eb9djsn6b33de827dd0",
      },
    });
    return data;
  } catch (error) {}
};
