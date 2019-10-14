import React, { useState, useEffect } from "react";
import {
  Grid,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@material-ui/core";
import Navigation from "../../components/Navigation";
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
  const [recentSales, setRecentSales] = useState([{ id: "" }]);

  const GetSales = () => {
    var newQuantity = 0;
    firebase
      .firestore()
      .collection("salesRecord")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          newQuantity += doc.data().quantity;
          setTotalSales(newQuantity);
        });
      });
  };

  const GetRevenue = () => {
    var Revenue = 0;
    firebase
      .firestore()
      .collection("salesRecord")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          Revenue += doc.data().price * doc.data().quantity;
          setRevenue(Revenue);
        });
      });
  };

  const GetRecentSales = () => {
    firebase
      .firestore()
      .collection("salesRecord")
      .orderBy("date", "desc")
      .limit(4)
      .onSnapshot(snapshot => {
        setRecentSales(
          snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            };
          })
        );
      });
  };

  useEffect(() => {
    GetSales();
    GetRevenue();
    GetRecentSales();

    firebase
      .firestore()
      .collection("salesRecord")
      .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();

        changes.forEach(change => {
          if (change.type == "modified") {
            GetSales();
            GetRevenue();
          }
        });
      });
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
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item name</TableCell>
                    <TableCell>Item price</TableCell>
                    <TableCell>Qty purchased</TableCell>
                    <TableCell>Total price</TableCell>
                    <TableCell>Transaction Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentSales.map((sale: any) => {
                    return (
                      <TableRow key={sale.id}>
                        <TableCell component="th" scope="row">
                          {sale.item_name}
                        </TableCell>
                        <TableCell>${sale.price}</TableCell>
                        <TableCell>{sale.quantity}</TableCell>
                        <TableCell>${sale.quantity * sale.price}</TableCell>
                        <TableCell>
                          {sale.date
                            ? sale.date.toDate().toLocaleDateString("en-AU")
                            : ""}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
