import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import InventoryEditItem from "./edititem";
import Product from "../../../models/Product";
import {EditButton, DeleteButton} from '../../../components/Actions'
import BetterTable from '../../../components/BetterTable'

export default () => {
  const [formModal, setFormModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductItem, setSelectedProductItem] = useState<Product>({
    index: 0,
    barcode: "",
    name: "",
    price: 0,
    quantity: 0,
  });
  const toggleModal = () => setFormModal(!formModal);
  const toggleEditItem = (product:  Product) => {
    setSelectedProductItem(product);
    toggleModal();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("inventoryItem")
      .onSnapshot(snapshot => {
        setProducts(
          snapshot.docs.map((doc, index) => ({
            index: index,
            barcode: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity
          }))
        );
      });
  }, []);
  const headCells = [
    {id: "index", display: "Index"},
    {id: "barcode", display: "Barcode"},
    {id: "name", display: "Name"},
    {id: "price", display: "Price"},
    {id: "quantity", display: "Quantity"},
    {id: "action", display: "Action"}
  ]

  products.forEach((prod : any) => {
    prod.action = (<div className = "container">
                {(<EditButton onClick = {() => toggleEditItem(prod)}/>)}
                {(<DeleteButton onClick = {() => {
                  firebase.firestore().collection("inventoryItem").doc(prod.id).delete().then(() => { window.location.reload() });
                }}/>)}
                </div>)
  });

  return (
    <div>
        <BetterTable
          headCells = {headCells}
          rows = {products}
          rowsPerPageDefault = {5}
          sortByDefault = 'index'
          search
        />
        <InventoryEditItem
          toggleModal={toggleModal}
          formModal={formModal}
          product={selectedProductItem}
        />
    </div>
  )
};
