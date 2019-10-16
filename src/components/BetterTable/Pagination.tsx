/*
    Table pagination footer & functionality by team oops.
    Resources used:
        material-ui table: https://material-ui.com/components/tables/

    How to use:
        include parent folder 
                import Pagenation from 'src/components/Pagination';
        
        create useState variables for page and rowsPerPage     
                const [page, setPage] = useState(0);
                const [rowsPerPage, setRowsPerPage] = React.useState(5);    
        
        Create Pagenation element in html just below TableBody, passing in the number of items and useState variables
                <Pagenation 
                    count = {items.length}
                    page = {page}   setPage = {setPage}
                    rowsPerPage = {rowsPerPage} setRowsPerPage = {setRowsPerPage}
                />
        
        Slice rows array according to page and rowsPerPage before mapping to HTML.
                rows.slice(page*rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => <TableRow>{row.name}</TableRow>)
*/

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    TableRow,
    TableFooter,
    TablePagination,
    IconButton
  } from "@material-ui/core";
  import FirstPageIcon from '@material-ui/icons/FirstPage';
  import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
  import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
  import LastPageIcon from '@material-ui/icons/LastPage';
  import React from "react";

export default function({count, page, setPage, rowsPerPage, setRowsPerPage} 
            : {count: number, page: number, setPage: Function, rowsPerPage: number, setRowsPerPage: Function}) {
    
    interface TablePaginationActionsProps {
      count: number;
      page: number;
      rowsPerPage: number;
      onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
    }

    const TablePaginationActions = (props: TablePaginationActionsProps) =>
    {
      const useStyles = makeStyles((theme: Theme) =>
        createStyles({
          root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
          },
        }),
      );
      const classes = useStyles();
      const {count, page, onChangePage} = props;
      
      const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event,0);
      }
    
      const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event, page - 1);
      }
    
      const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event, page + 1);
      }
    
      const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event,Math.max(0, Math.ceil(count / rowsPerPage)-1));
      }
      return (
        <div className = {classes.root}>
          <IconButton
            onClick = {handleFirstPageButtonClick}
            disabled = {page === 0}
            aria-label="first page">
              <FirstPageIcon/>
            </IconButton>
          <IconButton
            onClick = {handleBackButtonClick}
            disabled = {page === 0}
            aria-label = "previous page">
              <KeyboardArrowLeft/>
            </IconButton>
          <IconButton
            onClick = {handleNextButtonClick}
            disabled = {page >= Math.ceil(count / rowsPerPage) -1}
            aria-label = "next page">
              <KeyboardArrowRight/>
            </IconButton>
          <IconButton
            onClick = {handleLastPageButtonClick}
            disabled = {page >= Math.ceil(count / rowsPerPage) -1}
            aria-label = "last">
              <LastPageIcon/>
            </IconButton>
        </div>
      )
    }

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      setPage(newPage);
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowSpan = {3}
          count={count}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page = {page}
          ActionsComponent = {TablePaginationActions}
        />
      </TableRow>
    </TableFooter>);
  }