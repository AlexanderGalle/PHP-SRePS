import React, {useState, useEffect} from 'react'
import firebase from '../../../firebase'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PaginationFooter from '../../../components/Pagination'
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
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [query, setQuery] = useState("");

    const items = useItems().map(item => {
        return {    name: item.name,
                    quantity: item.quantity,
                    weeklySales: Math.round(item.unitsSold/(SALES_HISTORY_LENGTH/7)),
                    monthlySales: Math.round(item.unitsSold/(SALES_HISTORY_LENGTH/28)),
                    stockDepleted: item.unitsSold != 0 
                                    ? getDate(Math.floor(item.quantity / (item.unitsSold/SALES_HISTORY_LENGTH))).toLocaleDateString("en-AU") 
                                    : "Never"}
    });

    const itemsFilter = (item : any) => {
        return  !(query && item.name)
              ||(   item.name.toLowerCase().includes(query)
                ||  item.quantity.toString().includes(query)
                ||  item.weeklySales.toString().includes(query)
                ||  item.monthlySales.toString().includes(query)
                ||  item.stockDepleted.toString().includes(query)
                );
      }    
    
    return (
        <div>
            <TextField label = "Search" value = {query}
                onChange = {(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value.toLowerCase())}/>
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
                        {items.slice(page*rowsPerPage, page * rowsPerPage + rowsPerPage).filter(itemsFilter).map((item : any) => {
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
                    <PaginationFooter
                        count={items.length} 
                        page={page} setPage={setPage}
                        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
                </Table>
            </Paper>
        </div>
    )
}

