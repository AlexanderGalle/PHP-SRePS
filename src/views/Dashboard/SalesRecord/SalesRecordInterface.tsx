import firebase from "../../../firebase";

export default interface SalesRecord {
  id: string;
  item_name: string;
  price: number;
  quantity: number;
  date: firebase.firestore.Timestamp;
}
