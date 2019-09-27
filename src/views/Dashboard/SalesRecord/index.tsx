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
                <Grid style={{ backgroundColor: Color.lightGreen, borderRadius: 10, borderColor: Color.darkBlue , borderWidth: 12 , width: 1100}}>
                    <div id="salesRecord" style={{ textAlign: 'left', fontSize: 20, padding: 20}}>
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