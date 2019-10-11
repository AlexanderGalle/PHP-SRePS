import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Modal, Label, ButtonGroup } from "reactstrap";
import firebase from "../../../firebase";
import { Input, Button, TextField, FormGroup } from "@material-ui/core";

export default ({
  formModal,
  toggleModal,
  getListItems
}: {
  formModal: false | true | undefined;
  toggleModal: Function;
  getListItems: Function;
}) => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  function AddItem() {
    addItem();
  }

  async function addItem() {
    console.log(name + " " + price + " " + quantity);
    if (name && price && quantity) {
      firebase
        .firestore()
        .collection("inventoryItem")
        .doc() // auto generate ID
        .set({
          // generate barcode
          name,
          price,
          quantity
        })
        .then(() => {
          setName("");
          setPrice(0);
          setQuantity(0);
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      alert("Please fill out all fields");
    }
  }

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
            <h1>Add Item to Inventory</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <FormGroup>
              <TextField
                type="text"
                label="Name"
                id="name"
                onChange={e => setName(e.currentTarget.value.toLowerCase())}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                label="Price"
                type="number"
                id="price"
                onChange={e => handlePriceInput(parseInt(e.currentTarget.value))}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type="number"
                label="Quantity"
                id="quantity"
                onChange={e => handleQuantityInput(parseInt(e.currentTarget.value))}
              />
            </FormGroup>
            <FormGroup>
              <Button
                variant="contained"
                color="primary"
                type="button"
                fullWidth={true}
                id="submit"
                onClick={() => AddItem()}
                style={{ marginTop: 20 }}
              >
                Add
              </Button>
            </FormGroup>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
