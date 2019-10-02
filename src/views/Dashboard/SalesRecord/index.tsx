import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import Navigation from '../../../components/Navigation';
import AddSales from './AddSales';
import DisplaySales from './DisplaySales';
import EditSales from './EditSales'
import firebase from '../../../firebase'
import {useSales} from './DisplaySales'
import SalesRecord from './SalesRecordInterface'

export default () => {

    const [formModal, setFormModal] = useState(false)
    const toggleModal = () => setFormModal(!formModal)

    const [formModal2, setFormModal2] = useState(false);
    const toggleModal2 = () => setFormModal2(!formModal2); // for edit model 
    
    const [saleToEdit, setSaleToEdit] = useState<SalesRecord>({id: "", item_name: "", price: 0, quantity: 0, time: ""});
    function handleEditClick(salesRecord : SalesRecord){
        setSaleToEdit(salesRecord);
        toggleModal2();
    }

    function handleDeleteClick(salesRecord : SalesRecord){
        firebase.firestore().collection("inventoryItem").get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                if (doc.data().name === salesRecord.item_name) {
                    let reference = doc.data().id.trim();
                    var newQuantity = doc.data().quantity + salesRecord.quantity;
    
                    return firebase.firestore().collection("inventoryItem")
                    .doc(reference)
                    .update({quantity: newQuantity})
                    .then(() => firebase.firestore().collection("salesRecord").doc(salesRecord.id).delete())
                    .catch(err => alert("Couldn't delete"))
                }else
                    firebase.firestore().collection("salesRecord").doc(salesRecord.id).delete()
            });
        }).catch(err => 
            alert("Couldn't delete."));
    };

    return (
        <Grid container>
            <Grid item md={2}>
                <Navigation />
            </Grid>
            <Grid item md={10}>
                <h1 style={{ textAlign: 'center', fontSize: 35}}>Sales Record</h1>
                <button type="button" id="addButton" style={{position: 'absolute',right: 43,top:20 }} onClick={() => toggleModal()}>Add to Sales Record</button>
                <DisplaySales
                    handleEditClick = {handleEditClick}
                    handleDeleteClick = {handleDeleteClick}
                />
            </Grid>
            <AddSales 
                toggleModal={toggleModal}
                formModal={formModal}
                getListItems = {useSales}/>
            <EditSales
                toggleModal={toggleModal2}
                formModal={formModal2}
                salesRecordData = {saleToEdit}
            />
        </Grid>
    )
}