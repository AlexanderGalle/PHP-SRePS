import React from 'react';
import firebase from '../../../firebase';
import {
    Grid,
    FormControl,
    ButtonGroup,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Checkbox,
    List,
    ListItem
} from '@material-ui/core';
import Navigation from '../../../components/Navigation';
import InventoryAddItem from './additem';



export default () => {
    return (
        <div>
            <h1>Inventory</h1>
            <p>[Need a Navigation]</p>
            <p>[Need an Inventory table]</p><br/>
            <InventoryAddItem/>
        </div>
    )
}