import React, { useState } from "react";
import InventoryAddItem from "./additem";
import InventoryDisplayItem from "./displayitem";
// Nav bar
import { Grid, Button } from "@material-ui/core";
import Navigation from "../../../components/Navigation";
import AddInventoryItem from "./AddInventoryItem";

export default () => {
  const [formModal, setFormModal] = useState(false);
  const toggleModal = () => setFormModal(!formModal);
  const [inventory, setInventory] = useState([]);

  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10} style={{ padding: 40 }}>
        <div>
          <h1 style={{ textAlign: "center", fontSize: 35 }}>Inventory</h1>
          <Button
            variant="contained"
            color="primary"
            id="addButton"
            style={{ position: "absolute", right: 43, top: 20 }}
            onClick={() => toggleModal()}
          >
            Add to Inventory
          </Button>
          <InventoryDisplayItem />
        </div>
      </Grid>
      <AddInventoryItem
        toggleModal={toggleModal}
        formModal={formModal}
        getListItems={setInventory}
      />
    </Grid>
  );
};
