import React, { useState } from 'react';
import firebase from '../../../firebase';

const InventoryAddItem = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()

        firebase
            .firestore()
            .collection('inventoryItem')
            .doc(name)
            .set({
                name,
                price: parseFloat(price),
                quantity: parseInt(quantity)
            })
            .then(() => {
                setName('')
                setPrice('')
                setQuantity('')
            })
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <form onSubmit={onSubmit}>
        <h4>Create New Sales Item</h4>
        <div>
            <label>Name</label>
            <input type='text' value={name} onChange={e => setName(e.currentTarget.value)}/>
        </div>
        <div>
            <label>Price</label>
            <input type='number' value={price} onChange={e => setPrice(e.currentTarget.value)}/>
        </div>
        <div>
            <label>Quantity</label>
            <input type='number' value={quantity} onChange={e => setQuantity(e.currentTarget.value)}/>
        </div>
        <button>Add to Inventory</button>
        </form>
    )
}

export default InventoryAddItem