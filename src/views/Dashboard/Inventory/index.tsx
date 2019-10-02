import React from 'react';
import InventoryAddItem from './additem';
import InventoryDisplayItem from './displayitem';
// Nav bar
import { Grid } from '@material-ui/core';
import Navigation from '../../../components/Navigation';


export default () => (
    <Grid container>
        <Grid item md={2}>
            <Navigation/>
        </Grid>
        <Grid item md={10}>
            <div>
                <h1>Inventory</h1>
                <InventoryDisplayItem/>
                <InventoryAddItem/>
            </div>
        </Grid>
    </Grid>
);