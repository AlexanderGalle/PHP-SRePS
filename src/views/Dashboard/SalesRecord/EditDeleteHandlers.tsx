import firebase from '../../../firebase'

export function handleEditClick(salesRecord: any){
    setEditSalesRecordData(salesRecord);
    toggleModal2();
};

export function handleDeleteClick(salesRecord: any){
    firebase.firestore().collection("inventoryItem").get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().name == salesRecord.name) {
                let reference = doc.data().id.trim();
                var newQuantity = doc.data().quantity + salesRecord.quantity;

                return firebase.firestore().collection("inventoryItem")
                .doc(reference)
                .update({quantity: newQuantity});
            }
        });
        firebase.firestore().collection("salesRecord").doc(salesRecord.id).delete();
    }).catch(err => 
        alert("Couldn't delete."));

  };
