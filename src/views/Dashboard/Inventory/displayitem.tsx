import React, { useState, useEffect } from "react";
import firebase from "../../../firebase";
import InventoryEditItem from "./edititem";
import { Paper, Table, TableHead, TableCell, TableRow, TableBody } from "@material-ui/core";
import Product from "../../../models/Product";
import ProductItem from "./ProductItem";

export default () => {
  const [formModal, setFormModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>();
  const [selectedProductItem, setSelectedProductItem] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    quantity: 0
  });
  const toggleModal = () => setFormModal(!formModal);
  const toggleEditItem = (index: number) => {
    setSelectedProduct(index);
    setSelectedProductItem(products[index]);
    toggleModal();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("inventoryItem")
      .get()
      .then(snapshot => {
        setProducts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            quantity: doc.data().quantity
          }))
        );
      });
  }, []);

  return (
    <div>
      <h2>Display</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products ? (
              products.map((product, index) => (
                <ProductItem index={index} product={product} toggleEditItem={toggleEditItem} />
              ))
            ) : (
              <> </>
            )}
          </TableBody>
        </Table>
        <InventoryEditItem
          toggleModal={toggleModal}
          formModal={formModal}
          product={selectedProductItem}
        />
      </Paper>
    </div>
  );
};
