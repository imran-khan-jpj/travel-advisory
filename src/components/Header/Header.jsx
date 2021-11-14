import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

const Header = ({ setCoordinates, nearestCities }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  const [city, setCity] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    let findedCity = nearestCities.filter(
      (city) => city.City === e.target.value
    );

    setCoordinates({
      lat: findedCity[0].Latitude,
      lng: findedCity[0].Longitude,
    });
    // setAutocomplete(null);
  };

  const onPlaceChange = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography
            variant="h6"
            className={classes.title}
            style={{ width: 150 }}
          >
            Nearest Cities
          </Typography>
          <FormControl>
            <Select
              value={city}
              label="Age"
              onChange={handleChange}
              className={classes.selectElement}
              variant="outlined"
            >
              {nearestCities?.map((city, i) => (
                <MenuItem value={city.City}>{city.City}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ width: 200 }}
          >
            Explore New Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
