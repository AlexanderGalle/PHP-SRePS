import React, { useState, useEffect, Component } from "react";
import { Card, CardBody, CardHeader, Modal, Alert, Popover } from "reactstrap";
import firebase from "../../../firebase";
import SalesRecord from ".";

interface salesRecord {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default ({
  formModal,
  toggleModal,
  salesRecordData,
  getListItems
}: {
  formModal: false | true | undefined;
  toggleModal: Function;
  salesRecordData: salesRecord;
  getListItems: Function;
}) => {
  const [name, setName] = useState<string>(salesRecordData.name);
  const [price, setPrice] = useState<number>(salesRecordData.price);
  const [quantity, setQuantity] = useState<number>(salesRecordData.quantity);
  const [id, setId] = useState<string>(salesRecordData.id);

  useEffect(() => {
    setName(salesRecordData.name);
    setPrice(salesRecordData.price);
    setQuantity(salesRecordData.quantity);
    setId(salesRecordData.id);
  }, [salesRecordData]);

  const EditItem = () => {
    const salesRecord = firebase.firestore().collection("salesRecord");
    const inventoryItem = firebase.firestore().collection("inventoryItem");

    if (name && price && quantity) {
      salesRecord.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log(doc.data().id + " local " + id);
          if (doc.data().id == id) {
            let reference = doc.data().id;
            const reset = firebase
              .firestore()
              .collection("salesRecord")
              .doc(reference.trim());
            console.log("Names are equal");
            reset
              .update({ item_name: name, price: price, quantity: quantity })
              .then(function() {
                console.log("It worked edit");
              });
            inventoryItem.get().then(snapshot => {
              snapshot.docs.forEach(doc => {
                console.log(doc.data().name + " name " + name);
                if (doc.data().name == name) {
                  let reference2 = doc.data().id;
                  const reset2 = firebase
                    .firestore()
                    .collection("inventoryItem")
                    .doc(reference2.trim());
                  var newQuantity =
                    doc.data().quantity - quantity + salesRecordData.quantity;
                  reset2.update({ quantity: newQuantity }).then(function() {});
                }
              });
              getListItems();
            });
            toggleModal(false);
          }
        });
      });
    } else {
      alert("Please fill in all fields");
    }
  };

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
            <h1>Edit Item from Sales Record</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <label>
              Item Name
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                min="0"
                id="price"
                value={price}
                onChange={e => setPrice(parseInt(e.target.value))}
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                min="0"
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.currentTarget.value))}
              />
            </label>
            <button type="button" id="submit" onClick={() => EditItem()}>
              Confirm
            </button>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
