import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Modal,
  Alert,
  Popover,
  FormGroup,
  CardText,
  CardTitle
} from "reactstrap";
import firebase from "../../../firebase";
import Product from "../../../models/Product";
import { TextField, Button, FormControl } from "@material-ui/core";

export default ({
  formModal,
  toggleModal,
  product
}: {
  formModal: false | true | undefined;
  toggleModal: Function;
  product: Product;
}) => {
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const EditItem = () => {
    firebase
      .firestore()
      .collection("inventoryItem")
      .doc(product.id)
      .set({
        name,
        price,
        quantity
      })
      .then(() => {
        window.location.reload()
      });
  };

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
  }, [product]);

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
            <h1>Edit Item:</h1>
            <h4>{name}</h4>
          </CardHeader>
          <CardBody>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <TextField defaultValue={price} label="Price"  onChange = {(event) => setPrice(parseFloat(event.currentTarget.value))}/>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <TextField defaultValue={quantity} label="Quantity" onChange = {(event) => setQuantity(parseInt(event.currentTarget.value))} />
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              id="submit"
              onClick={() => EditItem()}
              style={{ marginTop: 10 }}
            >
              Apply
            </Button>
            <Button
              variant="contained"
              fullWidth
              type="button"
              onClick={() => toggleModal()}
              style={{ marginTop: 10 }}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Modal>
  );
};
