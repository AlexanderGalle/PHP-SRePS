import Predict from "./Predict";
import { Grid } from "@material-ui/core";
import Navigation from "../../../components/Navigation";
import React from "react";

export default () => {
  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10} style={{ padding: 40 }}>
        <h1 style={{ textAlign: "center", fontSize: 35 }}>Sale Predictions</h1>
        <Predict />
      </Grid>
    </Grid>
  );
};
