import React from 'react';
import { Grid } from '@material-ui/core';
import Navigation from '../../../components/Navigation';

export default () => (
    <Grid container>
        <Grid item md={2}>
            <Navigation />
        </Grid>
        <Grid item md={10}>
            Display items
        </Grid>
    </Grid>
);
