import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import Navigation from '../../../components/Navigation';
import ProductItem from './ProductItem';
import firebase from 'firebase';
import Product from '../../../models/Product';
import undefined from 'firebase/empty-import';



export default () => {
  const [products, setProducts] = useState<Product[]>([

  ])

  const [barcode, setBarcode] = useState<string>();

  const addItem = () => {
    if (barcode != null)
    {
      firebase
      .firestore()
      .collection("inventoryItem")
      .where("barcode", "==", barcode)
      .get()
      .then(snapShot => {
        if (!snapShot.empty) {
          let quantityAdded = false
          const snapshotProduct = snapShot.docs[0].data() as Product
          snapshotProduct.quantity = 1;
          products.forEach(product => {
            if(product.barcode == snapshotProduct.barcode) {
              product.quantity++;
              product.price = product.quantity * snapshotProduct.price;
              setProducts([...products]) // update list (pass by reference so not demanding funct)
              
              quantityAdded = true
              getTotal();
              //return
            }
          })
          
          if(!quantityAdded) 
          {
            setProducts([...products, snapshotProduct]);
          }
          
          getTotal();
          console.log("adding item : " + snapshotProduct.name);
          console.log(products.length)
          console.log(products.length)
        }
        else 
          alert("No items here by that barcode...")
      })
    }
  }

  const [total, setTotal] = useState<number>(0);

  const getTotal = () => {
    let t = 0;
    
    products.forEach(product => {
      t += product.price;
    })
      setTotal(t);
      console.log("value is : " + t);
  }

  function writeSalesData(product: Product) {

      firebase
      .firestore()
      .collection("salesRecord")
      .add({
        date: firebase.firestore.Timestamp.now(),//new Date().getDate().toString() + '/' + (new Date().getMonth().toString() + 1) + '/' + new Date().getFullYear().toString() + ' ' + new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString(),
        id: product.barcode,
        item_name: product.name,
        price: product.price / product.quantity,
        quantity: product.quantity
      })
  }

  const makeSale = () => {
    if (products.length > 0)
    {
      products.forEach(product => {
        writeSalesData(product)
      })
    }
    setTotal(0);
    setProducts([]);
  }
  
  return (
    <Grid container>   
      <Grid item md={2}>
        <Navigation />
      </Grid>
      <Grid item md={10}>
        <Grid container direction="column">
          <Grid item md={3} style={{padding: 20, alignSelf:'center'}}>
            <Paper style={{padding: 20, alignSelf:'center', width: 300}}>
            
                <TextField style={{alignSelf:'center'}}
                  type="string"
                  label="Barcode"
                  placeholder="Enter a barcode..."
                  value={barcode}
                  onChange={e => setBarcode(e.target.value)}
                />

                <Button 
                  variant="contained"
                  color="primary"
                  onClick = {() => 
                  addItem()}
                >Enter</Button>

            </Paper>
          </Grid>
          <Grid item md={9} style={{alignSelf:'center', width: '100%'}}>
            <Paper>
              <Table
              style={{maxHeight: 600, overflowX: "hidden", overflowY: "scroll"}}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Quantity
                    </TableCell>
                    <TableCell>
                    Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => <ProductItem product={product}/>)}
                </TableBody>
                <TableRow>
                    <TableCell>
                      
                    </TableCell>
                    <TableCell>
                      Total : 
                    </TableCell>
                    <TableCell>

                      {total}

                    </TableCell>
                  </TableRow>

              </Table>
                    
              <Button 
                  variant="contained"
                  color="primary"
                  onClick = {() => 
                  makeSale()}
                >Make Sale</Button>

            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};








