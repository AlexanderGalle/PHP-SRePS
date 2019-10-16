import React from "react";
import { TableRow, TableCell, Fab } from "@material-ui/core";
import Product from "../../../models/Product";
import {EditButton} from '../../../components/Actions'


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
        <EditButton onClick = {() => toggleEditItem(index)}/>
      </TableCell>
    </TableRow>
  );
};
