import React, { useState, useEffect } from "react";
import {Grid} from "@material-ui/core";
import Navigation from "../../components/Navigation";
import DisplaySales from "./SalesRecord/DisplaySales"
import firebase from "../../firebase";
import {usePredictions} from "./SalesPrediction/Predict";
import BetterTable from "../../components/BetterTable";
import { makeStyles } from '@material-ui/core/styles'

const style = {
  textStyle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 700,
    marginTop: 20
  }
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(27,36,48)",
    "padding-bottom": "50px",
    "padding-top": "20px",
    "margin-top": "20px",
    "margin-bottom": "20px"
  }
}));

export default () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const styles = useStyles();

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
      setRevenue(Math.round(revenue * 100)/100);      
    });
  };

  useEffect(() => {
    getSummaries();
  }, []);

  const lowStockItems = usePredictions().filter(item => item.stockDepleted != "Never").slice(0,5);
  const headCells = [
    {id: "name", display: "Item"},
    {id: "quantity", display: "Quantity"},
    {id: "stockDepleted", display: "Stock Depleted by"}
  ]
  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10} style={{ padding: 40 }}>
        <h1 style={{ fontSize: 30 }}>Dashboard</h1>
        <div
          className = {styles.container}
          style={{
            width: "49%",
            float: "left",
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
          className = {styles.container}
          style={{
            width: "49%",
            float: "right",
            backgroundColor: "rgb(27, 36, 48)",
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
          className = {styles.container}
          style={{
            width: "100%",
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
        <div
          className = {styles.container}
          style={{
            width: "100%",
            clear: "both"
          }}
        >
          <h2 style={{ ...style.textStyle, marginTop: 10, marginLeft: 23 }}>
            Low Stocked Items
          </h2>
          <div style={{ width: "95%", margin: "auto" }}>
            <BetterTable
              headCells={headCells}
              rows={lowStockItems}
            />          
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
