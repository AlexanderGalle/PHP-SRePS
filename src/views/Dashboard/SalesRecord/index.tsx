import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Navigation from "../../../components/Navigation";
import AddSales from "./AddSales";
import DisplaySales from "./DisplaySales";
import EditSales from "./EditSales";
import firebase from "../../../firebase";
import { useSales } from "./DisplaySales";
import SalesRecord from "./SalesRecordInterface";

export default () => {
  const [formModal, setFormModal] = useState(false);
  const toggleModal = () => setFormModal(!formModal);

  const [formModal2, setFormModal2] = useState(false);
  const toggleModal2 = () => setFormModal2(!formModal2); // for edit model

  const [saleToEdit, setSaleToEdit] = useState<SalesRecord>({
    id: "",
    item_name: "",
    price: 0,
    quantity: 0,
    date: firebase.firestore.Timestamp.fromMillis(0)
  });
  function handleEditClick(salesRecord: SalesRecord) {
    setSaleToEdit(salesRecord);
    toggleModal2();
  }

  function handleDeleteClick(salesRecord: SalesRecord) {
    let invRef = firebase
      .firestore()
      .collection("inventoryItem");

    invRef.where("name", "==" ,salesRecord.item_name).get().then(snapshot => {
        snapshot.docs.forEach(doc => 
          invRef.doc(doc.id).update({quantity : doc.data().quantity + salesRecord.quantity}));
    }).catch(err => alert(err));

    firebase.firestore().collection("salesRecord").doc(salesRecord.id).delete();
  }

  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10} style={{ padding: 40 }}>
        <h1 style={{ textAlign: "center", fontSize: 35 }}>Sales Record</h1>
        <Button
          variant="contained"
          color="primary"
          id="addButton"
          style={{ position: "absolute", right: 43, top: 20 }}
          onClick={() => toggleModal()}
        >
          Add to Sales Record
        </Button>
        <DisplaySales handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
      </Grid>
      <AddSales toggleModal={toggleModal} formModal={formModal} getListItems={useSales} />
      <EditSales toggleModal={toggleModal2} formModal={formModal2} salesRecordData={saleToEdit} />
    </Grid>
  );
};
