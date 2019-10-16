/*
    "Better table" by team oops
    This is an implementation of materialUI's tables and features that we're using for our website.
    Provides the option and functionality to include sorting for all rows, pagination, and searching.
    This table will be used site-wide for consistency and lack of repeating code.

    How to use:
        include parent folder 
                import BetterTable from 'src/components/BetterTable';    
        
        Create an array of table row headings.  format: [{id: 'name', display: 'Name'}]

        Create an array of rows for the table.  format: [{name: 'An Item Name'}]
            object properties in this array must match the 'id' properties in each entry of row headings.

        use JSX element where you want the table to appear
            <BetterTable
                headCells = <row headings array>
                rows = <rows array>
                rowsPerPageDefault = {5} //default rows per page if you want pagination.  Don't include this for no pagination
                sortByDefault = 'name' //default row heading to sort by.  Don't include this for no sorting
                search // don't include this for no search feature.
                onEditClick = function for edit click
                onDeleteClick = function for delete click both must take item as a parameter
            />
        
        Sort rows using imported sortRows function before mapping
                sortRows(rows, orderBy, order).map(<some html/>)
*/

import React, {useState} from 'react'
import {
    Table,
    TableHead,
    TableFooter,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PaginationFooter from './Pagination'
import SortingHeader, {sortRows, Order, HeadCell} from './Sorting'

interface BetterTableProps {
    headCells: HeadCell[],
    rows: Object[],
    rowsPerPageDefault?: number,
    sortByDefault?: string,
    search?: boolean,
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    fab: {
        margin: theme.spacing(1),
    },
}));

export default (props : BetterTableProps) => 
{
    const {headCells, rows, rowsPerPageDefault, sortByDefault, search} = props;
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageDefault || 0);
    const [query, setQuery] = useState("");
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState(sortByDefault || 'name');

    const searchFilter = (item: any) => 
    {
        if(!query)
            return true;

        let match = false;

        for(var property in item)
            if(!match && headCells.find(heading => heading.id == property))
                match = item[property].toString().toLowerCase().includes(query);

        return match;
    }

    let updatedRows = rows;

    let header : JSX.Element = (
        <TableHead>
            <TableRow>
                {headCells.map((cell: HeadCell) => {
                    return (
                        <TableCell>
                            {cell.display}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
    
    let searchInput : JSX.Element = <div></div>;
    if(search)
    {
        searchInput = <TextField label = "Search" value = {query}
                            onChange = {(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value.toLowerCase())}/>
        updatedRows = updatedRows.filter(searchFilter);
    }

    if(sortByDefault)
    {
        updatedRows = sortRows(updatedRows, orderBy, order);
        header = (<SortingHeader    headCells = {headCells}
                                    order = {order} orderBy = {orderBy}
                                    setOrder = {setOrder} setOrderBy = {setOrderBy}/>);
    }    
    
    let footer : JSX.Element = (<TableFooter></TableFooter>)
    if(rowsPerPageDefault)
    {
        updatedRows = updatedRows.slice(page*rowsPerPage, page * rowsPerPage + rowsPerPage);
        footer = (<PaginationFooter
                    count={rows.length} 
                    page={page} setPage={setPage}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>)
    }

    return (
        <div className = 'container'>
            {searchInput}
            <Paper className = {classes.root}>
                <Table className = {classes.table}>
                    {header}
                    <TableBody>
                        {updatedRows.map((item : any) => {
                            let element = [];
                            element.push(<TableRow></TableRow>)
                            for(var property in item)
                                if(headCells.find(heading => heading.id == property))
                                    element.push(<TableCell>{item[property]}</TableCell>);
                            return element;
                        })}
                        </TableBody>
                    {footer}
                </Table>
            </Paper>
        </div>
    );

}