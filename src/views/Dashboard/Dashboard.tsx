import React, { useState, useEffect } from "react";
import {
  Grid,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useMediaQuery
} from "@material-ui/core";
import Navigation from "../../components/Navigation";
import DisplaySales from "./SalesRecord/DisplaySales"
import { Color } from "../../common";
import { textAlign } from "@material-ui/system";
import firebase from "../../firebase";
import { number } from "prop-types";

const style = {
  textStyle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 700,
    marginTop: 20
  }
};

export default () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);

  const getSummaries = () => {
    firebase
    .firestore()
    .collection("salesRecord")
    .onSnapshot(snapshot => {
      let revenue = 0;
      let sales = 0;
      snapshot.docs.forEach(doc => {
        sales += doc.data().quantity;
        revenue += doc.data().price * doc.data().quantity;
      });
      setTotalSales(sales);
      setRevenue(revenue);      
    });
  };

  useEffect(() => {
    getSummaries();
  }, []);

  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10} style={{ padding: 40 }}>
        <h1 style={{ fontSize: 30 }}>Dashboard</h1>
        <div
          style={{
            width: "49%",
            height: "35%",
            float: "left",
            backgroundColor: "rgb(27, 36, 48)"
          }}
        >
          <h2 style={{ ...style.textStyle, textAlign: "center" }}>
            Total Sales
          </h2>
          <h2 style={{ ...style.textStyle, textAlign: "center" }}>
            {totalSales}
          </h2>
        </div>
        <div
          style={{
            width: "49%",
            height: "35%",
            float: "right",
            backgroundColor: "rgb(27, 36, 48)",
            marginBottom: 20
          }}
        >
          <h2 style={{ ...style.textStyle, textAlign: "center" }}>
            Total Revenue
          </h2>
          <h2 style={{ ...style.textStyle, textAlign: "center" }}>
            {"$" + revenue}
          </h2>
        </div>
        <div
          style={{
            width: "100%",
            height: "60%",
            backgroundColor: "rgb(27, 36, 48)",
            clear: "both"
          }}
        >
          <h2 style={{ ...style.textStyle, marginTop: 10, marginLeft: 23 }}>
            Recent Sales
          </h2>
          <div style={{ width: "95%", margin: "auto" }}>
            <DisplaySales limit = {5} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
