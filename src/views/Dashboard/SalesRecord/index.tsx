import React, { useState, useEffect } from "react";
import {
  Container,
  InputLabel,
  Grid,
  FormControl,
  ButtonGroup,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  List,
  ListItem
} from "@material-ui/core";
import Navigation from "../../../components/Navigation";
import { Color } from "../../../common/";
import { lightGreen } from "@material-ui/core/colors";
import AddSales from "./AddSales";
import EditSales from "./EditSales";
import firebase from "../../../firebase";

interface salesRecord {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default () => {
  const [formModal, setFormModal] = useState(false);
  const toggleModal = () => setFormModal(!formModal);

  const [formModal2, setFormModal2] = useState(false);
  const toggleModal2 = () => setFormModal2(!formModal2);

  const [editSalesRecordData, setEditSalesRecordData] = useState<salesRecord>({
    id: "",
    name: "A name",
    price: 2000,
    quantity: 10
  });

  const [listItems, setListItems] = React.useState<salesRecord[] | null>();

  async function getListItems() {
    try {
      const salesRecordsCollection = await firebase
        .firestore()
        .collection("salesRecord")
        .get();
      const salesRecords = salesRecordsCollection.docs.map(i => ({
        name: i.data().item_name,
        price: i.data().price,
        quantity: i.data().quantity,
        id: i.id
      }));
      setListItems(salesRecords);
    } catch (e) {
      console.log(e);
    }
  }

  const handleEditClick = (salesRecord: salesRecord) => {
    console.log(salesRecord);
    if (salesRecord) {
      setEditSalesRecordData(salesRecord);
      toggleModal2();
    } else {
      console.error("No salesrecorddata got passed in");
    }
  };

  const handleDeleteClick = (salesRecord: salesRecord) => {
    console.log(salesRecord);
    firebase
      .firestore()
      .collection("inventoryItem")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.data().name == salesRecord.name) {
            let reference = doc.data().id;
            const reset = firebase
              .firestore()
              .collection("inventoryItem")
              .doc(reference.trim());
            console.log("Names are equal in delete");
            var newQuantity = doc.data().quantity + salesRecord.quantity;
            reset
              .update({ quantity: newQuantity })
              .then(function() {
                console.log("It worked the delete thingo");
              })
              .catch(function(error) {
                console.log(error);
              })
              .finally(() => getListItems());
          }
        });
      });

    firebase
      .firestore()
      .collection("salesRecord")
      .doc(salesRecord.id)
      .delete();
  };
  useEffect(() => {
    getListItems();
  }, []);

  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10}>
        <h1 style={{ textAlign: "center", fontSize: 35 }}>Sales Record</h1>
        <button
          type="button"
          id="addButton"
          style={{ position: "absolute", right: 43, top: 20 }}
          onClick={() => {
            toggleModal();
          }}
        >
          Add to Sales Record
        </button>
        <Grid
          style={{
            backgroundColor: Color.lightGreen,
            borderRadius: 10,
            borderColor: Color.darkBlue,
            borderWidth: 12,
            width: 1100
          }}
        >
          <div
            id="salesRecord"
            style={{ textAlign: "left", fontSize: 20, padding: 20 }}
          >
            {listItems !== null && listItems !== undefined ? (
              <ul>
                {listItems.map(i => (
                  <li key={i.id}>
                    name: {i.name + " "}
                    price: {i.price + " "}
                    quantity: {i.quantity}
                    <button onClick={() => handleEditClick(i)} id="edit">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(i)} id="delete">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        </Grid>
      </Grid>
      <AddSales
        toggleModal={toggleModal}
        formModal={formModal}
        getListItems={getListItems}
      />
      <EditSales
        toggleModal={toggleModal2}
        formModal={formModal2}
        salesRecordData={editSalesRecordData}
        getListItems={getListItems}
      />
    </Grid>
  );
};
