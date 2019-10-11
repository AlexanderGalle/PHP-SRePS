import React, { constructor, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { height } from "@material-ui/system";
import { Button } from "@material-ui/core";
import Navigation from "../../../components/Navigation";
import { number } from "prop-types";
import undefined from "firebase/empty-import";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(0.2)
      //color: "red",
    },
    input: {
      display: "none"
    }
  })
);

function clearBarcode() {}

function buttonHandler(num: number) {
  if (num < 10) {
    // append data to text field
    alert(num);
  } else if (num == 10) {
    // remove last digit from barcode ()
    clearBarcode();
    alert("Clear");
  } else if (num == 11) {
    // submit data with barcode and fetch result
    alert("Enter");
  }
}

export default () => {
  const classes = useStyles();

  const [number, setNumber] = useState<string>("");
  const addNumber = (newNumber: string) => setNumber(number + newNumber);

  const something: number = 2;
  const list: string[] = [];

  return (
    <Grid container>
      <Grid item md={2}>
        <Navigation />
      </Grid>

      {/*  left side:
       *
       * keypad to enter barcode
       * a textview that shows the bar code
       * an enter button that fetches an item from barcode
       *
       * maybe a look-up button that checks if we have that item in stock ?
       *
       */}
      <div>
        <div>
          <Button variant="contained" onClick={() => addNumber("1")} className={classes.button}>
            1
          </Button>
          <Button variant="contained" onClick={() => addNumber("2")} className={classes.button}>
            2
          </Button>
          <Button variant="contained" onClick={() => addNumber("3")} className={classes.button}>
            3
          </Button>
        </div>

        <div>
          <Button variant="contained" onClick={() => addNumber("4")} className={classes.button}>
            4
          </Button>
          <Button variant="contained" onClick={() => addNumber("5")} className={classes.button}>
            5
          </Button>
          <Button variant="contained" onClick={() => addNumber("6")} className={classes.button}>
            6
          </Button>
        </div>

        <div>
          <Button variant="contained" onClick={() => addNumber("7")} className={classes.button}>
            7
          </Button>
          <Button variant="contained" onClick={() => addNumber("8")} className={classes.button}>
            8
          </Button>
          <Button variant="contained" onClick={() => addNumber("9")} className={classes.button}>
            9
          </Button>
        </div>

        <div>
          <Button variant="contained" onClick={() => buttonHandler(11)} className={classes.button}>
            CLR
          </Button>
          <Button variant="contained" onClick={() => addNumber("0")} className={classes.button}>
            0
          </Button>
          <Button variant="contained" onClick={() => buttonHandler(11)} className={classes.button}>
            ENT
          </Button>
        </div>
        <p>{number}</p>
      </div>

      {/* Right side:
       *
       * a list of scanned items, fetches data like price and name from database given the barcode, also shows quantity
       * dynamically updates the total value at the bottom of the list
       * a confirm sale buttom at the bottom of the screen which navigates to the payment page
       *
       *
       *
       */}
      <div></div>
    </Grid>
  );
};
