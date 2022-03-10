import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 
import { generateUUID } from "./Utils";

const reproductionRef = collection(db, 'reproductions')

export const addReproduction = async (reproduction, _addReproductionToStore)=>{

    
        
    _addReproductionToStore({...reproduction, id:generateUUID(), userId:authentication.currentUser.uid})


}

export const deleteReproduction = async (id, _deleteReproductionInStore)=>{
    
    _deleteReproductionInStore(id);
}

export const setReproduction = async(id,reproduction, setSubmitting, _setReproductionInStore) => {

       
    _setReproductionInStore({...reproduction, id:id, userId:authentication.currentUser.uid})
   
    setSubmitting(false);

}
