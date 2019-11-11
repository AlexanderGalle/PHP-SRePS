import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Button } from "@material-ui/core";
import "./styles.css";
import firebase from "firebase";

const style = {
  navigationLink: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 700
  }
};

export default () => (
  <List style={{ backgroundColor: "rgb(27, 36, 48)", height: "100%" }} className="navigation-min-height">
    <ListItem>
      <Link to="/" style={style.navigationLink}>
        Dashboard
      </Link>
    </ListItem>
    <ListItem>
      <Link to="/inventory" style={style.navigationLink}>
        Inventory
      </Link>
    </ListItem>
    <ListItem>
      <Link to="/sales" style={style.navigationLink}>
        Sales Record
      </Link>
    </ListItem>
    <ListItem>
      <Link to="/predict" style={style.navigationLink}>
        Predict Sales
      </Link>
    </ListItem>
    <ListItem>
      <Link to="/pos" style={style.navigationLink}>
        Point of Sales
      </Link>
    </ListItem>
    <ListItem>
      <Button
        variant="contained"
        fullWidth={true}
        color="primary"
        style={{ marginTop: 60 }}
        onClick={() => firebase.auth().signOut()}
      >
        Logout
      </Button>
    </ListItem>
  </List>
);
