import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'


const InventoryDisplayItem = () => {
    firebase.firestore().collection('items_test_a').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            // create new list elements
            let li = document.createElement('li')
            let name = document.createElement('span')
            let price = document.createElement('span')
            let quantity = document.createElement('span')

            // Insert data into text elements
            li.setAttribute('data-id', doc.id)
            name.textContent = doc.data().name + ", "
            price.textContent = doc.data().price + ", "
            quantity.textContent = doc.data().quantity

            // insert text elements into singular item
            li.appendChild(name)
            li.appendChild(price)
            li.appendChild(quantity)

            // Put singular into our list element.
            const list = document.getElementById('item_list')
            if (list != null)
                list.appendChild(li)
        })
    })
                

    return (
        <div>
            <h3>Display</h3>
            <ol>
                <p id="item_list"/>
            </ol>
        </div>
    )
}

export default InventoryDisplayItem