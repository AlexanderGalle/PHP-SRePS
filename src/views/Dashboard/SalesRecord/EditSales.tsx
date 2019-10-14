import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Modal, FormGroup } from "reactstrap";
import firebase from "../../../firebase";
import salesRecord from "./SalesRecordInterface";
import { TextField, Button } from "@material-ui/core";

export default ({
  formModal,
  toggleModal,
  salesRecordData
}: {
  formModal: false | true | undefined;
  toggleModal: Function;
  salesRecordData: salesRecord;
}) => {
  const [name, setName] = useState<string>(salesRecordData.item_name);
  const [price, setPrice] = useState<number>(salesRecordData.price);
  const [quantity, setQuantity] = useState<number>(salesRecordData.quantity);
  const [id, setId] = useState<string>(salesRecordData.id);
  const [date, setDate] = useState<firebase.firestore.Timestamp>(salesRecordData.date);

  useEffect(() => {
    setName(salesRecordData.item_name);
    setPrice(salesRecordData.price);
    setQuantity(salesRecordData.quantity);
    setId(salesRecordData.id);
    setDate(salesRecordData.date);
  }, [salesRecordData]);

  const EditItem = () => {
    const salesRecord = firebase.firestore().collection("salesRecord");
    const inventoryItem = firebase.firestore().collection("inventoryItem");

    firebase
      .firestore()
      .collection("salesRecord")
      .doc(salesRecordData.id)
      .update({ item_name: name, price: price, quantity: quantity, date: date })
      .then(() => {
        inventoryItem.get().then(snapshot => {
          let item = snapshot.docs.find(doc => doc.data().name == name);
          if (item)
            inventoryItem.doc(item.id).update({
              quantity:
                item.data().quantity - quantity + salesRecordData.quantity
            });
        });
      });
    toggleModal(false);
  };

  const handlePriceInput = (value: number) => {
    if (value > 0) {
      setPrice(value);
    } else {
      setPrice(0);
    }
  };
  const handleQuantityInput = (value: number) => {
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(0);
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
            <FormGroup>
              <TextField
                type="text"
                label="Name"
                id="name"
                value={name}
                onChange={e => setName(e.currentTarget.value.toLowerCase())}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Price"
                type="number"
                id="price"
                value={price}
                onChange={e =>
                  handlePriceInput(parseInt(e.currentTarget.value))
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="number"
                label="Quantity"
                id="quantity"
                value={quantity}
                onChange={e =>
                  handleQuantityInput(parseInt(e.currentTarget.value))
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="Date"
                id="date"
                label="Date"
                value={date ? date.toDate().toISOString().split("T")[0] : null}
                onChange={e => setDate(firebase.firestore.Timestamp.fromDate(new Date(e.currentTarget.value)))}
                style={{ marginTop: 20 }}
              />
            </FormGroup>
            <FormGroup>
              <Button
                variant="contained"
                color="primary"
                type="button"
                fullWidth={true}
                id="edit"
                onClick={() => EditItem()}
                style={{ marginTop: 20 }}
              >
                Confirm
              </Button>
            </FormGroup>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
