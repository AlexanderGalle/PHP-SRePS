import React, { useState, useEffect} from "react";
import { Card, CardBody, CardHeader, Modal } from "reactstrap";
import firebase from "../../../firebase";
import salesRecord from "./SalesRecordInterface"

export default ({
  formModal,
  toggleModal,
  salesRecordData,
}: {
  formModal: false | true | undefined;
  toggleModal: Function;
  salesRecordData: salesRecord;
}) => {
  const [name, setName] = useState<string>(salesRecordData.item_name);
  const [price, setPrice] = useState<number>(salesRecordData.price);
  const [quantity, setQuantity] = useState<number>(salesRecordData.quantity);
  const [id, setId] = useState<string>(salesRecordData.id);

  useEffect(() => {
    setName(salesRecordData.item_name);
    setPrice(salesRecordData.price);
    setQuantity(salesRecordData.quantity);
    setId(salesRecordData.id);
  }, [salesRecordData]);

  const EditItem = () => {
    const salesRecord = firebase.firestore().collection("salesRecord");
    const inventoryItem = firebase.firestore().collection("inventoryItem");

    firebase.firestore().collection("salesRecord")
    .doc(salesRecordData.id)
    .update({ item_name: name, price: price, quantity: quantity })
    .then(() => {
      inventoryItem.get().then(snapshot => {
        let item = snapshot.docs.find(doc => doc.data().name == name);
        if(item)
          inventoryItem.doc(item.id)
            .update({quantity: item.data().quantity - quantity + salesRecordData.quantity})
      })
    })
    toggleModal(false);
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
            <h1>Edit Item from Sales Record</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <label>
              Item Name
              <input type="text" id="name" value={name}
                onChange={e => setName(e.target.value)} />
            </label>
            <label>
              Price
              <input type="number" min="0" id="price" value={price}
                onChange={e => setPrice(parseInt(e.target.value))} />
            </label>
            <label>
              Quantity
              <input type="number" min="0" id="quantity" value={quantity}
                onChange={e => setQuantity(parseInt(e.currentTarget.value))}/>
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
