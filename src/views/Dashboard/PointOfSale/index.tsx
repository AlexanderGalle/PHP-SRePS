import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { height } from '@material-ui/system';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(0.2),
      //color: "red",
    },
    input: {
      display: 'none',
    },
  }),

);

    function clearBarcode() {

    }

    function buttonHandler(num: number) {
        if (num < 10) {
            // append data to text field
            alert(num);
        }
        else if (num == 10) {
            // remove last digit from barcode ()
            alert("Clear");
            
        } else if (num == 11) {
            // submit data with barcode and fetch result
            alert("Enter");
        }
        
      };

export default () => {
    const classes = useStyles();



  return (
    <div>
        // comprised of 2 main containers, the left and right

         /**  left side:
         * 
         * keypad to enter barcode
         * a textview that shows the bar code
         * an enter button that fetches an item from barcode
         * 
         * maybe a look-up button that checks if we have that item in stock ?
         * 
         * **/

        <div>
            <div>
                <Button variant="contained" onClick={() => buttonHandler(1)} className={classes.button}>1</Button>
                <Button variant="contained" onClick={() => buttonHandler(2)} className={classes.button}>2</Button>
                <Button variant="contained" onClick={() => buttonHandler(3)} className={classes.button}>3</Button>
            </div>

            <div>
                <Button variant="contained" onClick={() => buttonHandler(4)} className={classes.button}>4</Button>
                <Button variant="contained" onClick={() => buttonHandler(5)} className={classes.button}>5</Button>
                <Button variant="contained" onClick={() => buttonHandler(6)} className={classes.button}>6</Button>
            </div>

            <div>
                <Button variant="contained" onClick={() => buttonHandler(7)} className={classes.button}>7</Button>
                <Button variant="contained" onClick={() => buttonHandler(8)} className={classes.button}>8</Button>
                <Button variant="contained" onClick={() => buttonHandler(9)} className={classes.button}>9</Button>
            </div>

            <div>
                <Button variant="contained" onClick={() => buttonHandler(10)} className={classes.button}>CLR</Button>
                <Button variant="contained" onClick={() => buttonHandler(0)} className={classes.button}>0</Button>
                <Button variant="contained" onClick={() => buttonHandler(11)} className={classes.button}>ENT</Button>
            </div>
        </div>

        <p id="barcode">Barcode</p>
    </div>
  );
}









         /** Right side:
          * 
          * a list of scanned items, fetches data like price and name from database given the barcode, also shows quantity 
          * dynamically updates the total value at the bottom of the list 
          * a confirm sale buttom at the bottom of the screen which navigates to the payment page
          * 
          * 
          * 
          * **/

