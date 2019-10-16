import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import Navigation from '../../../components/Navigation';
import ProductItem from './ProductItem';
import firebase from 'firebase';
import Product from '../../../models/Product';



export default () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "one", price: 84, quantity: 1},
    { id: "2", name: "one", price: 84, quantity: 1},
    { id: "3", name: "one", price: 84, quantity: 1}
  ])

  const [barcode, setBarcode] = useState<number>();

  const addItem = () => {
    firebase
    .firestore()
    .collection("inventoryItem")
    .where("barcode", "==", barcode)
    .get()
    .then(snapShot => {
      if (!snapShot.empty) {
        const product = snapShot.docs[0].data() as Product
        setProducts([...products, product])
      }
      else 
        alert("No items here by that barcode...")
    })
  }
  
  return (
    <Grid container>   
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10}>
        <Grid container direction="column">
          <Grid item md={3}>
            <Grid container>
              <Grid item md={9}>
                <TextField 
                  type="number"
                  label="Barcode"
                  placeholder="Enter a barcode..."
                  value={barcode}
                  onChange={e => setBarcode(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick = {() => 
                  addItem()}
                >Enter</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={9}>
            <Paper>
              <Table
              style={{maxHeight: 600, overflowX: "hidden", overflowY: "scroll"}}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Price
                    </TableCell>
                    <TableCell>
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => <ProductItem product={product}/>)}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

















        {/* <Grid>
            <div>
                <Button variant="contained" onClick={() => addNumber("1")} className={classes.button}>1</Button>
                <Button variant="contained" onClick={() => addNumber("2")} className={classes.button}>2</Button>
                <Button variant="contained" onClick={() => addNumber("3")} className={classes.button}>3</Button>
            </div>

            <div>
                <Button variant="contained" onClick={() => addNumber("4")} className={classes.button}>4</Button>
                <Button variant="contained" onClick={() => addNumber("5")} className={classes.button}>5</Button>
                <Button variant="contained" onClick={() => addNumber("6")} className={classes.button}>6</Button>
            </div>

            <div>
                <Button variant="contained" onClick={() => addNumber("7")} className={classes.button}>7</Button>
                <Button variant="contained" onClick={() => addNumber("8")} className={classes.button}>8</Button>
                <Button variant="contained" onClick={() => addNumber("9")} className={classes.button}>9</Button>
            </div>

            <div>
                <Button variant="contained" onClick={() => setNumber("")} className={classes.button}>CLR</Button>
                <Button variant="contained" onClick={() => addNumber("0")} className={classes.button}>0</Button>
                <Button variant="contained" onClick={() => fetchItemFromBarcode(number)} className={classes.button}>ENT</Button>
            </div>
            <p>{number}</p>
        </Grid>
      </Grid>
    </Grid> */}
};








