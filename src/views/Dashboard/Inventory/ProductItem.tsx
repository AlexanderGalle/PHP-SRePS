import React from "react";
import { TableRow, TableCell, Fab } from "@material-ui/core";
import Product from "../../../models/Product";
import { Button } from "reactstrap";
import EditIcon from "@material-ui/icons/Edit";

export default ({
  index,
  product,
  toggleEditItem
}: {
  index: number;
  product: Product;
  toggleEditItem: Function;
}) => {
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>
        <Fab aria-label="edit" onClick={() => toggleEditItem(index)}>
          <EditIcon />
        </Fab>
      </TableCell>
    </TableRow>
  );
};
