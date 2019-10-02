import React, { useState } from "react";
import { Card, CardBody, CardHeader, Modal, Alert, Popover } from "reactstrap";
import firebase from "../../../firebase";
var name = "";
var price = "";
var quantity = "";

export default ({
  formModal,
  toggleModal,
  getListItems
}: {
  formModal: false | true | undefined;
  toggleModal: Function;
  getListItems: Function;
}) => {
  function AddItem() {
    addItem();
  }

  async function addItem() {
    console.log(name + " " + price + " " + quantity);
    if (name !== "" && price !== "" && quantity !== "") {
      try {
        const salesRecord = firebase.firestore().collection("salesRecord");
        const inventoryItem = firebase.firestore().collection("inventoryItem");

        const newRecord = salesRecord.doc();

        console.log("Adds data");

        await salesRecord.doc(newRecord.id).set({
          item_name: name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          id: newRecord.id
        });

        console.log("Adding data successful");

        await inventoryItem.get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.data().name == name) {
              let reference = doc.data().id;
              const reset = firebase
                .firestore()
                .collection("inventoryItem")
                .doc(reference.trim());
              console.log("Names are equal");
              var newQuantity = doc.data().quantity - parseInt(quantity);
              reset
                .update({ quantity: newQuantity })
                .then(function() {
                  console.log("It worked");
                })
                .catch(function(error) {
                  console.log(error);
                });
              name = "";
              price = "";
              quantity = "";
            }
          });
        });
        toggleModal(false);
        getListItems();
      } catch (e) {
        console.log(e);
      } finally {
        //does this last even if error is caught
      }
    } else if (name == "" || price == "" || quantity == "") {
      alert("Please fill out all fields");
    }
  }

  return (
    <Modal
      isOpen={formModal}
      toggle={() => toggleModal()}
      className="modal-dialog-centered"
      size="md"
    >
      <div className="modal-body p-0">
        <Card className="bg-white shadow border-0">
          <CardHeader className="bg-transparent">
            <h1>Add Item to Sales Record</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <label>
              Item Name
              <input
                type="text"
                id="name"
                onChange={e => (name = e.currentTarget.value)}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                min="0"
                id="price"
                onChange={e => (price = e.currentTarget.value)}
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                min="0"
                id="quantity"
                onChange={e => (quantity = e.currentTarget.value)}
              />
            </label>
            <button type="button" id="submit" onClick={() => AddItem()}>
              Add
            </button>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
