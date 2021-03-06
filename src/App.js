import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData, getNearestCities } from "./api";

function App() {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [nearestCities, setNearestCities] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (bounds.sw && bounds.ne) {
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setIsLoading(false);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
      });
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getNearestCities(coordinates.lat, coordinates.lng).then((data) =>
        setNearestCities(data)
      );
    }
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} nearestCities={nearestCities} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
