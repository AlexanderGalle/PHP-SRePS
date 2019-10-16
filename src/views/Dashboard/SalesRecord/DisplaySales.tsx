/*
    Display sales table generation by team oops DP2 Semester 2 2019.
    Resources used:
        material-ui table: https://material-ui.com/components/tables/
        firebase/firestore collections: https://www.youtube.com/watch?v=rSgbYCdc4G0
*/

import {EditButton, DeleteButton} from '../../../components/Actions'
import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import BetterTable from '../../../components/BetterTable'

export function useSales(limit?: number) {
  const [sales, setSales] = useState<any>([]);

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
  const sales = useSales(limit).map((sale : any) => {
    return {
      item_name : sale.item_name,
      price: "$" + sale.price,
      quantity: "$" + sale.quantity,
      total_price: sale.price * sale.quantity,
      date: sale.date ? sale.date.toDate().toLocaleDateString("en-AU") : "",
      ...(handleEditClick != undefined || handleDeleteClick != undefined) && {
            action: (<div className = "container">
                {handleEditClick != undefined ? (<EditButton onClick = {() => handleEditClick(sale)}></EditButton>) : <div/>}
                {handleDeleteClick != undefined ? (<DeleteButton onClick = {() => handleDeleteClick(sale)}></DeleteButton>) : <div/>}
                </div>)
      }
    }
  });
  const headCells = [
    {id: "item_name", display: "Item Name"},
    {id: "price", display: "Price"},
    {id: "quantity", display: "Quantity"},
    {id: "total_price", display: "Total Price"},
    {id: "date", display: "Date"},
  ];
  if(handleEditClick != undefined || handleDeleteClick != undefined)
    headCells.push({id: "action", display: "Action"});

  return <BetterTable headCells = {headCells} 
                      rows = {sales}
                      rowsPerPageDefault = {10}
                      sortByDefault = 'date'
                      {...!limit && { search: true }}/>
};


