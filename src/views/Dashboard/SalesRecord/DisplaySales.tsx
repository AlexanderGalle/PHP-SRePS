import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

const mapData = (row: any) => {
    return (
        <TableRow key = {row.item_name}>
            <TableCell component = "th" scope = "row">
                {row.item_name}
            </TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.quantity * row.price}</TableCell>
            <TableCell>{row.time}</TableCell>
        </TableRow>
    )
}

let rows = [ {item_name: 'Test Item', price: 10, quantity: 20, time: '10/10/2019 11:13AM'}]
const DisplaySales = () => {
    const classes = useStyles();

    return (
        <div>
            <h2>Sales list</h2>
            <div>
                <label>Sort by:</label>{' '}
                <select>
                    <option> Most Recent </option>
                    <option> Least Recent </option>
                    <option> Price (highest) </option>
                </select>
            </div>
            <Paper className = {classes.root}>
                <Table className = {classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item name</TableCell>
                            <TableCell>Item price</TableCell>
                            <TableCell>Qty purchased</TableCell>
                            <TableCell>Total price</TableCell>
                            <TableCell>Transaction time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(mapData)}
                    </TableBody>
                </Table>
            </Paper>
        </div>

    )

}
export default DisplaySales;