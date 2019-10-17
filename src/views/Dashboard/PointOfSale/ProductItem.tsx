import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { Product } from '../../../models/Product'

export default ({product} : {product: Product}) => {
    return (
        <TableRow>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.price}</TableCell>
        </TableRow>
    )
}