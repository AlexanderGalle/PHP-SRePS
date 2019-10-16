import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import InventoryEditItem from "./edititem";
import Product from "../../../models/Product";
import {EditButton} from '../../../components/Actions'
import BetterTable from '../../../components/BetterTable'

export default () => {
  const [formModal, setFormModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>();
  const [selectedProductItem, setSelectedProductItem] = useState<Product>({
    index: 0,
    id: "",
    name: "",
    price: 0,
    quantity: 0
  });
  const toggleModal = () => setFormModal(!formModal);
  const toggleEditItem = (product:  Product) => {
    setSelectedProduct(product.index);
    setSelectedProductItem(product);
    toggleModal();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("inventoryItem")
      .get()
      .then(snapshot => {
        setProducts(
          snapshot.docs.map((doc, index) => ({
            index: index,
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity
          }))
        );
      });
  }, []);
  const headCells = [
    {id: "index", display: "Index"},
    {id: "name", display: "Name"},
    {id: "price", display: "Price"},
    {id: "quantity", display: "quantity"},
    {id: "action", display: "Action"}
  ]

  products.forEach((prod : any) => {
    prod.action = <EditButton onClick = {() => toggleEditItem(prod)}/>
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
