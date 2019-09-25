import React, { useState, useEffect } from 'react';
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
// import './styles.css';

export default ({ setSelectedView }: { setSelectedView: Function }) => {
    const [cases, setCases] = useState([
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' },
        { id: 4, name: 'Four' }
    ]);
    useEffect(() => {
        // StudentsRepo.GetAllStudents().then(students => setStudents(students));
    }, []);
    const [selectedCases, setSelectedCases] = useState([{}]);
    const handleSelectAll = () => {};
    return (
        <Grid container>
            <Grid item md={2}>
                <Navigation />
            </Grid>
            <Grid item md={10}>
                <Grid container direction='column' justify='center'>
                    <Grid container>
                        <Grid item md={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <Grid container>
                                            <Grid item md={6}>
                                                <FormControl>
                                                    <h2>Products</h2>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={6}>
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
                                                            Add Product
                                                        </Button>
                                                    </ButtonGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'>
                                            <Checkbox
                                                checked={selectedCases.length === cases.length}
                                                color='primary'
                                                indeterminate={
                                                    selectedCases.length > 0 &&
                                                    selectedCases.length < cases.length
                                                }
                                                onChange={() => handleSelectAll}
                                            />
                                            Name
                                        </TableCell>
                                        <TableCell>Something...</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cases.map(_case => (
                                        <TableRow
                                            hover
                                            key={_case.id}
                                            selected={selectedCases.indexOf(_case.id) !== -1}
                                        >
                                            <TableCell>
                                                <Checkbox />
                                                {_case.name}
                                            </TableCell>
                                            <TableCell>{_case.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
