/*
    Table sorting header & functionality by team oops.
    Resources used:
        material-ui table: https://material-ui.com/components/tables/

    How to use:
        include parent folder 
                import Sorting {Order, sortRows, HeadCell} from 'src/components/Pagination';
        
        create useState variables for order and orderBy     
                const [order, setOrder] = useState<Order>('desc');
                const [orderBy, setOrderBy] = React.useState('default_col');    
        
        Create Sorting element in html above TableBody, passing in the header columns and useState variables
                <Sorting 
                    headCells = {headCells}
                    order = {order}   setOrder = {order}
                    orderBy = {orderBy} setOrderBy = {setOrderBy}
                />
        
        Sort rows using imported sortRows function before mapping
                sortRows(rows, orderBy, order).map(<some html/>)
*/

import React from 'react'
import {
    TableHead,
    TableRow,
    TableCell} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface SortingProps {
    headCells: HeadCell[],
    order: Order,   setOrder: Function,
    orderBy: keyof any, setOrderBy: Function
}

export interface HeadCell
{
    id: string,
    display: string
}

export type Order = 'asc' | 'desc';

export default function(props : SortingProps)
{
    const {headCells, order, setOrder, orderBy, setOrderBy} = props;

    const onRequestSort = (property: keyof any) => (event: React.MouseEvent<unknown>) =>
    {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map(col => {
                    if(col.id == "")
                        return <TableCell>{col.display}</TableCell>
                    return (
                        <TableCell
                            key = {col.id}
                            sortDirection = {orderBy == col.id ? order : false}
                        >
                            <TableSortLabel
                                active = {orderBy == col.id}
                                direction = {order}
                                onClick = {onRequestSort(col.id)}
                            >
                                {col.display}
                            </TableSortLabel>
                    </TableCell>    );
                })}
            </TableRow>
        </TableHead>
    )
}

export function sortRows(array: any[], orderBy: keyof any, order: Order) : any[]
{
    function desc(a: any, b: any, orderBy: keyof any)
    {
        return b[orderBy] < a[orderBy] ? -1 : (b[orderBy] > a[orderBy] ? 1 : 0);
    }

    const method = order == 'desc'  ? (a : any, b : any) => desc(a,b,orderBy)
                                    : (a : any, b : any) => -desc(a,b,orderBy);
    
    return array.sort(method);
}