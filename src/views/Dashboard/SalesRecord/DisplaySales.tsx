/*
    Display sales table generation by team oops DP2 Semester 2 2019.
    Resources used:
        material-ui table: https://material-ui.com/components/tables/
        firebase/firestore collections: https://www.youtube.com/watch?v=rSgbYCdc4G0
*/

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField
} from "@material-ui/core";
import {EditButton, DeleteButton} from '../../../components/Actions'
import PaginationFooter from '../../../components/Pagination'
import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";

export function useSales(limit?: number) {
  const [sales, setSales] = useState([{ id: "" }]);

  useEffect(() => {
    let salesRef = firebase
      .firestore()
      .collection("salesRecord")
      .orderBy("date");

    if(limit)
      salesRef = salesRef.limit(limit)

    const unsubscribe = salesRef.onSnapshot(snapshot => {
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

export default function DisplaySales({
  handleDeleteClick,
  handleEditClick,
  limit
}: {
  handleDeleteClick?: Function;
  handleEditClick?: Function;
  limit?: number;
}){
  const sales = useSales(limit);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [query, setQuery] = useState("");

  const salesFilter = (sale : any) => {
    return  !(query && sale.id)
          ||(   sale.item_name.toLowerCase().includes(query)
            ||  (sale.date && sale.date.toDate().toLocaleDateString("en-AU").includes(query))
            ||  sale.price.toString().includes(query)
            ||  sale.quantity.toString().includes(query)
            ||  (sale.price * sale.quantity).toString().includes(query)
            );
  }

  return (
    <div>
      <TextField label = "Search" value = {query}
                onChange = {(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value.toLowerCase())}/>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Item price</TableCell>
              <TableCell>Qty purchased</TableCell>
              <TableCell>Total price</TableCell>
              <TableCell>Transaction Date</TableCell>
              {handleDeleteClick != undefined && handleEditClick != undefined ? (<TableCell>Action</TableCell>) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.slice(page*rowsPerPage, page * rowsPerPage + rowsPerPage).filter(salesFilter).map((sale: any) => {
              return (
                <TableRow key={sale.id}>
                  <TableCell component="th" scope="row">
                    {sale.item_name}
                  </TableCell>
                  <TableCell>${sale.price}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>${sale.quantity * sale.price}</TableCell>
                  <TableCell>
                    {sale.date ? sale.date.toDate().toLocaleDateString("en-AU") : ""}
                  </TableCell>
                  {handleDeleteClick != undefined && handleEditClick != undefined ? (<TableCell>
                                  <EditButton onClick = {() => handleEditClick(sale)}/>        
                                  <DeleteButton onClick = {() => handleDeleteClick(sale)}/>
                                </TableCell>) : null}
                </TableRow>
              );
            })}
          </TableBody>
          <PaginationFooter
              count={sales.length} 
              page={page} setPage={setPage}
              rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
        </Table>
      </Paper>
    </div>
  );

};


