import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Modal,
    Alert,
    Popover
} from 'reactstrap';
import firebase from '../../../firebase';

export default ({ formModal, toggleModal }: { formModal: false|true|undefined, toggleModal: Function }) => {
    var name = ""
    var price = ""
    var quantity = ""

    
    function AddItem(){
        console.log("name: " + name+ " price: " + price+ " quantity " +quantity);
        if(name != "" && price != "" && quantity != ""){
            console.log("Made it to function"+ " " + name+ " " +price+ " " +quantity)
            firebase.firestore().collection('salesRecord')
            .add({item_name: name,price:price,quantity:quantity})

            firebase.firestore().collection('inventoryItem').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    if(doc.data().name == name){
                        console.log("Names are equal");
                        var newQuantity = doc.data().quantity - parseInt(quantity);
                        //var update = firebase.database().ref("inventoryItem/");
                        //update.update({:{quantity:newQuantity}});
                    }
                })
            })

            toggleModal(false);
        }
        else if(name == "" || price == "" || quantity == ""){
            alert("Please fill out all fields");
            
        }

        
    }

    return (
        <Modal
            isOpen={formModal}
            toggle={() => toggleModal()}
			className='modal-dialog-centered'
			size='md'>
			<div className='modal-body p-0'>
                <Card className="bg-white shadow border-0">
                    <CardHeader className="bg-transparent">
                        <h1>Add Item to Sales Record</h1>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                       <label>Item Name  <input type ="text" id = "name" onChange ={e => name = e.currentTarget.value} /></label>
                       <label>Price  <input type ="number" min="0" id="price" onChange ={e => price = e.currentTarget.value}/></label>
                       <label>Quantity  <input type ="number" min="0" id = "quantity"onChange ={e => quantity = e.currentTarget.value}/></label>
                       <button type="button" id="submit" onClick={() => AddItem()}>Add</button>
                    </CardBody>
                </Card>
			</div>
		</Modal>
    )
}