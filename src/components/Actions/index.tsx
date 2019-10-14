
// function Actions({sale} : {sale?: any}) : JSX.Element {
//     if(handleDeleteClick == undefined || handleEditClick == undefined)
//       return (<div/>);
//     return sale ? 
//       (<TableCell>
//         <Fab  size = "small"
//               arai-label = "edit"
//               className = {classes.fab}
//               onClick = {() => handleEditClick(sale)}
//               ><EditIcon/></Fab>
//         <Fab  size = "small"
//               arai-label = "delete"
//               className = {classes.fab}
//               onClick = {() => handleDeleteClick(sale)}
//               ><DeleteIcon/></Fab>
//       </TableCell>)
//     : (<TableCell>Action</TableCell>);
//   }

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import {Fab} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    fab: {
        margin: theme.spacing(1)
    }
}));


export function DeleteButton({sale, onClick}: {sale: any, onClick: Function})
{
    const classes = useStyles();
    
    return (
        <Fab    size = "small"
                arai-label = "delete"
                className = {classes.fab}
                onClick = {() => onClick(sale)}
        ><DeleteIcon/></Fab>
    );
}

export function EditButton({sale, onClick} : {sale: any, onClick: Function})
{
    const classes = useStyles();
    
    return (
        <Fab    size = "small"
                arai-label = "edit"
                className = {classes.fab}
                onClick = {() => onClick(sale)}
        ><EditIcon/></Fab>
    );
}