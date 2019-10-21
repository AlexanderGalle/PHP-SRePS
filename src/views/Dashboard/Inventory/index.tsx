import React, { useState } from "react";
import InventoryAddItem from "./additem";
import InventoryDisplayItem from "./displayitem";
// Nav bar
import { Grid, Button } from "@material-ui/core";
import Navigation from "../../../components/Navigation";
import AddInventoryItem from "./AddInventoryItem";
// CSV TEST
import WriteCSV from "../../../components/CSV/WriteCSV";

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
          <Button
            variant="contained"
            color="primary"
            id="csvButton"
            style={{ position: "absolute", right: 43, top: 60 }}
            onClick={() => {
              var lines = new Array(
                new Array("glass", "12", "$23.12"),
                new Array("ball", "64", "$46.34"),
                new Array("shower cap", "23", "$67.45")
              );
              WriteCSV("weeky_report", new Array("Item","Quantity","Price"), lines);
            }}
          >
            CSV TEST
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
