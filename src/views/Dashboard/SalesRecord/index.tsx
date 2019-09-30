import React, { useState, useEffect } from 'react'
import {
    Container,
    InputLabel,
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
import { Color } from '../../../common/'
import { lightGreen } from '@material-ui/core/colors';
import AddSales from './AddSales';
export default () => {
    const [formModal, setFormModal] = useState(false)
    const toggleModal = () => setFormModal(!formModal)
    return (
        <Grid container>
            <Grid item md={2}>
                <Navigation />
            </Grid>
            <Grid item md={10}>
                <h1 style={{ textAlign: 'center', fontSize: 35}}>Sales Record</h1>
                <button type="button" id="addButton" style={{position: 'absolute',right: 43,top:20 }} onClick={() => toggleModal()}>Add to Sales Record</button>
                <Grid style={{ backgroundColor: Color.lightGreen, borderRadius: 10, borderColor: Color.darkBlue , borderWidth: 12 , width: 1100}}>
                    <div id="salesRecord" style={{ textAlign: 'left', fontSize: 20, padding: 20}}>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>not a box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                    </div>
                </Grid>
            </Grid>
            <AddSales 
                toggleModal={toggleModal}
                formModal={formModal}/>
        </Grid>
    )
}