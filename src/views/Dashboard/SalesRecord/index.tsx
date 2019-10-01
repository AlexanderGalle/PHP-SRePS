import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Navigation from '../../../components/Navigation';
import { Color } from '../../../common/'
import { lightGreen } from '@material-ui/core/colors';
import AddSales from './AddSales';
import DisplaySales from './DisplaySales';

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
                <DisplaySales/>
            </Grid>
            <AddSales 
                toggleModal={toggleModal}
                formModal={formModal}/>
        </Grid>
    )
}