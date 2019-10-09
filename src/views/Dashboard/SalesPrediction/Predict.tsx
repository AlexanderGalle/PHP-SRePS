import React, {useState, useEffect} from 'react'
import firebase from '../../../firebase'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Fab,
    Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const SALES_HISTORY_LENGTH = 7

function getDate(days: number) : Date   //  days is number of days ago.
{
    let d : Date = new Date();
    d.setDate(d.getDate()+days);
    return d;
}

function useItems()
{
    const [items, setItems] = useState([{id: '',name: '',price: 0, quantity: 0, unitsSold: 0}]);
    const [unitsSold, setUnitsSold] = useState(0);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('inventoryItem')
        .onSnapshot(snapshot => {
            let temp_items = snapshot.docs.map(doc => {
                let data = doc.data();
                return {
                    id: doc.id,
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity,
                    unitsSold: 0
                }
            });
            const unsub = firebase.firestore().collection('salesRecord')
            .where("date", ">=", getDate(-SALES_HISTORY_LENGTH))   //  Use the last 28 days for predictions.
            .onSnapshot(snapshot => {
                let temp_sales = snapshot.docs.map(doc => {
                    let data = doc.data();
                    return{
                        id: doc.id,
                        name: data.item_name,
                        quantity: data.quantity
                    }
                })
                temp_items.forEach(item => {
                    temp_sales.filter(s => s.name == item.name).forEach(s => 
                        item.unitsSold += s.quantity);
                });
                setItems(temp_items);
            })
            return () => unsub();
        })
        return () => unsubscribe();
    }, []);

    return items;
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
    fab: {
        margin: theme.spacing(1),
    },
}));

export default () => {
    const items = useItems().map(item => {
        return {    name: item.name,
                    quantity: item.quantity,
                    weeklySales: Math.round(item.unitsSold/(SALES_HISTORY_LENGTH/7)),
                    monthlySales: Math.round(item.unitsSold/(SALES_HISTORY_LENGTH/28)),
                    stockDepleted: item.unitsSold != 0 
                                    ? getDate(Math.floor(item.quantity / (item.unitsSold/SALES_HISTORY_LENGTH))).toLocaleDateString("en-AU") 
                                    : "Never"}
    });
    const classes = useStyles();
    
    return (
        <div>
            <h2>Sales Prediction</h2>
            <Paper className = {classes.root}>
                <Table className = {classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item name</TableCell>
                            <TableCell>Quanitity</TableCell>
                            <TableCell>Weekly Sales Estimate</TableCell>
                            <TableCell>Monthly Sales Estimate</TableCell>
                            <TableCell>Stock depleted by</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item : any) => {
                            return (
                                <TableRow key = {item.name}>
                                    <TableCell component = "th" scope = "row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.weeklySales}</TableCell>
                                    <TableCell>{item.monthlySales}</TableCell>
                                    <TableCell>{item.stockDepleted}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

