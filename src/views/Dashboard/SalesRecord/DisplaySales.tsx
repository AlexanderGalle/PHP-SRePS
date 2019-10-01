import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import firebase from '../../../firebase';

function useSales() {
    const [sales, setSales] = useState([{id: ''}])
    
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('salesRecord')
        .onSnapshot(snapshot => {
            setSales(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })

        return () => unsubscribe()
    },[])
    
    return sales
}

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



const mapForTable = (row: any) => {
    return (
        <TableRow key = {row.item_name}>
            <TableCell component = "th" scope = "row">
                {row.item_name}
            </TableCell>
            <TableCell>${row.price}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>${row.quantity * row.price}</TableCell>
            <TableCell>{row.time}</TableCell>
        </TableRow>
    )
}

const DisplaySales = () => {
    const classes = useStyles();
    const sales = useSales();

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
                        {sales.map(mapForTable)}
                    </TableBody>
                </Table>
            </Paper>
        </div>

    )
}

export default DisplaySales;