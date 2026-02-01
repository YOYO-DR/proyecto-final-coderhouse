import { getFirestore, collection, getDocs, query, where, doc, getDoc, addDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);


export const getProducts = async () => { 
  const products = [];
  
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}

export const getCategories = async ( ) => { 
  const categories = [];
  
  const querySnapshot = await getDocs(collection(db, "categories"));

  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });

  return categories;
}

export const getProductByCategory = async ( category ) => { 
  const products = [];

  const q = query(collection(db, "products"), where("category", "==", category));

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  })
  return products;
} 

export const getProductById = async ( id ) => { 
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
}

export const createOrder = async ( order ) => {
  const ordersCollection = collection(db, "orders");
  const orderDoc = await addDoc(ordersCollection, order);
  return orderDoc.id;
}