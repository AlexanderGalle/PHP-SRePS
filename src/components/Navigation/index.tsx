import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";
import "./styles.css";

const style = {
  navigationLink: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 700
  }
};

export default () => (
  <List style={{ backgroundColor: "rgb(27, 36, 48)" }} className="navigation-min-height">
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
  </List>
);
