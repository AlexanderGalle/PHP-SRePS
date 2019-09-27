import React, { useState } from 'react'
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
export default () => {
   
    return (
        <Grid container>
            <Grid item md={2}>
                <Navigation />
            </Grid>
            <Grid item md={10}>
                <p style={{ textAlign: 'center', fontSize: 35}}>Sales Record</p>
                <Grid style={{border: 1, borderColor: Color.lightGreen}}>
                    <div id="salesRecord" style={{ textAlign: 'center', fontSize: 20, padding: 20}}>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                        <p>box</p>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    


    )
}