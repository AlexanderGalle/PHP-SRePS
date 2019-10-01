import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'
import EditItem from './edititem'

export default () => {
    const [formModal, setFormModal] = useState(false)
    const toggleModal = () => setFormModal(!formModal)

    //const InventoryDisplayItem = () => {
    firebase.firestore().collection('inventoryItem').get().then((snapshot: { docs: { forEach: (arg0: (doc: any) => void) => void; }; }) => {
        snapshot.docs.forEach(doc => {
            // create new list elements
            let li = document.createElement('li')
            let name = document.createElement('span')
            let price = document.createElement('span')
            let quantity = document.createElement('span')
            let edit = document.createElement('button')

            // Set onclick behavior to edit
            edit.onclick = function(){
                console.log('Edit: ' + doc.data().name)
                toggleModal()
                //EditItemModal('')
            }

            // Insert data into text elements
            li.setAttribute('data-id', doc.id)
            name.textContent = doc.data().name + ', $'
            price.textContent = doc.data().price + 'ea, '
            quantity.textContent = doc.data().quantity + 'x'
            edit.textContent = 'Edit'

            // insert text elements into singular item
            li.appendChild(name)
            li.appendChild(price)
            li.appendChild(quantity)
            li.appendChild(edit)

            // Put singular into our list element.
            const list = document.getElementById('item_list')
            if (list != null)
                list.appendChild(li)
        })
    })
    //}

    return (
        <div>
            <h3>Display</h3>
            <ol>
                <p id="item_list"/>
            </ol>
            <EditItem
                toggleModal={toggleModal}
                formModal={formModal}
            />
        </div>
    )
}