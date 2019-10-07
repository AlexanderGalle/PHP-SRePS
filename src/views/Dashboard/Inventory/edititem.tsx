import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Modal,
    Alert,
    Popover
} from 'reactstrap';
import firebase from '../../../firebase';

export default ({ formModal, toggleModal }: { formModal: false|true|undefined, toggleModal: Function }) => {
    function EditItem(){
        alert("Apply");
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
                        <h1>Edit Item</h1>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                       <label>Item Name</label>
                       <label>Price</label>
                       <label>Quantity</label>
                    </CardBody>
                    <CardFooter>
                        <button type="button" id="submit" onClick={() => EditItem()}>Apply</button>
                        <button type="button" onClick={() => toggleModal()}>Close</button>
                    </CardFooter>
                </Card>
			</div>
		</Modal>
    )
}