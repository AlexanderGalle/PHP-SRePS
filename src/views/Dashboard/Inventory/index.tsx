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

export default () => {
    return (
        <div>
            <h1>Inventory</h1>
            <p>Menu Test C - Put Inventory here.</p>

            <FormControl>
                <ButtonGroup
                    fullWidth
                    color='primary'
                    size='large'
                >
                    <Button
                        variant='contained'
                        style={{
                            marginTop: 18
                        }}
                        onClick={() => {}}
                    >
                        Add Item
                    </Button>
                </ButtonGroup>
            </FormControl>

        </div>
    )
}