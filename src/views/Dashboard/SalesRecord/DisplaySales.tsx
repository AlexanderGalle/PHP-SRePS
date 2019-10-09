/*
    Display sales table generation by team oops DP2 Semester 2 2019.
    Resources used:
        material-ui table: https://material-ui.com/components/tables/
        firebase/firestore collections: https://www.youtube.com/watch?v=rSgbYCdc4G0
*/

import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  Paper,
  Tab
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import Index from "./index";

export function useSales() {
  const [sales, setSales] = useState([{ id: "" }]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("salesRecord")
      .onSnapshot(snapshot => {
        setSales(
          snapshot.docs.map(doc => {
            console.log(doc.data().date);
            return {
              id: doc.id,
              ...doc.data()
            };
          })
        );
      });

    return () => unsubscribe();
  }, []);

  return sales;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

const DisplaySales = ({
  handleDeleteClick,
  handleEditClick
}: {
  handleDeleteClick: Function;
  handleEditClick: Function;
}) => {
  const classes = useStyles();
  const sales = useSales();

  return (
    <div>
      <h2>Sales history</h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Item price</TableCell>
              <TableCell>Qty purchased</TableCell>
              <TableCell>Total price</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale: any) => {
              return (
                <TableRow key={sale.id}>
                  <TableCell component="th" scope="row">
                    {sale.item_name}
                  </TableCell>
                  <TableCell>${sale.price}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>${sale.quantity * sale.price}</TableCell>
                  <TableCell>{sale.date ? sale.date.toDate().toLocaleDateString("en-AU") : ""}</TableCell>
                  <TableCell>
                    <Fab
                      size="small"
                      aria-label="edit"
                      className={classes.fab}
                      onClick={() => handleEditClick(sale)}
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      size="small"
                      aria-label="delete"
                      className={classes.fab}
                      onClick={() => handleDeleteClick(sale)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default DisplaySales;
