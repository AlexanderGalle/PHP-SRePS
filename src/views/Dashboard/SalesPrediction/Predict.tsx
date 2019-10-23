import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import { Button } from "@material-ui/core";
import BetterTable from "../../../components/BetterTable";
import WriteCSV from "../../../components/CSV/WriteCSV";
const SALES_HISTORY_LENGTH = 7;

function getDate(days: number): Date {
  //  days is number of days ago.
  let d: Date = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function useItems() {
  const [items, setItems] = useState([
    { id: "", name: "", price: 0, quantity: 0, unitsSold: 0 }
  ]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("inventoryItem")
      .onSnapshot(snapshot => {
        let temp_items = snapshot.docs.map(doc => {
          let data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            unitsSold: 0
          };
        });
        const unsub = firebase
          .firestore()
          .collection("salesRecord")
          .where("date", ">=", getDate(-SALES_HISTORY_LENGTH)) //  Use the last 28 days for predictions.
          .onSnapshot(snapshot => {
            let temp_sales = snapshot.docs.map(doc => {
              let data = doc.data();
              return {
                id: doc.id,
                name: data.item_name,
                quantity: data.quantity
              };
            });
            temp_items.forEach(item => {
              temp_sales
                .filter(s => s.name == item.name)
                .forEach(s => (item.unitsSold += s.quantity));
            });
            setItems(temp_items);
          });
        return () => unsub();
      });
    return () => unsubscribe();
  }, []);

  return items;
}

export default () => {
  const headCells = [
    { id: "name", display: "Item Name" },
    { id: "quantity", display: "Quantity" },
    { id: "weeklySales", display: "Weekly Sales" },
    { id: "monthlySales", display: "Montly Sales" },
    { id: "stockDepleted", display: "Stock depleted" }
  ];

  const items = useItems().map(item => {
    return {
      name: item.name,
      quantity: item.quantity,
      weeklySales: Math.round(item.unitsSold / (SALES_HISTORY_LENGTH / 7)),
      monthlySales: Math.round(item.unitsSold / (SALES_HISTORY_LENGTH / 28)),
      stockDepleted:
        item.unitsSold != 0
          ? getDate(
              Math.floor(
                item.quantity / (item.unitsSold / SALES_HISTORY_LENGTH)
              )
            ).toLocaleDateString("en-AU")
          : "Never"
    };
  });

  return (
    <div className="container">
      <Button
        variant="contained"
        color="primary"
        id="csvButton"
        style={{ position: "absolute", right: 43, top: 60 }}
        onClick={() => {
          const writeableItems = items.map(item => {
            return new Array(
              item.name,
              item.quantity + "",
              item.weeklySales + "",
              item.monthlySales + "",
              item.stockDepleted + ""
            );
          });
          const headers = headCells.map(header => {
            return header.display;
          });
          WriteCSV("predict_sales", headers, writeableItems);
        }}
      >
        Write to CSV
      </Button>
      <BetterTable
        headCells={headCells}
        rows={items}
        rowsPerPageDefault={10}
        sortByDefault="stockDepleted"
        search
      />
    </div>
  );
};
