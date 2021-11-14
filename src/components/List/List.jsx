import React, { useState, useEffect, createRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import PlaceDetails from "../PlaceDetails/PleaceDetails";

import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs(() =>
      Array(places?.length)
        .fill()
        .map((_, i) => createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>About 3.0</MenuItem>
              <MenuItem value={4}>About 4.0</MenuItem>
              <MenuItem value={4.5}>About 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => {
              return (
                <Grid ref={elRefs[index]} item xs={12} key={index}>
                  <PlaceDetails
                    place={place}
                    selected={Number(childClicked) === index}
                    refProp={elRefs[index]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
