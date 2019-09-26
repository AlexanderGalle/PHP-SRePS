import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';

export default () => (
    <List>
        <ListItem>
            <Link to='/'>Dashboard</Link>
        </ListItem>
        <ListItem>
            <Link to='/tables'>Tables</Link>
        </ListItem>
        <ListItem>
            <Link to='/inventory'>Inventory</Link>
        </ListItem>
        <ListItem>jaskldf</ListItem>
        <ListItem>jaskldf</ListItem>
    </List>
);
