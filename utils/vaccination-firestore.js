import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 
import { generateUUID } from "./Utils";

const vaccinationRef = collection(db, 'vaccinations')

export const addVaccination = async (vaccination, _addVaccinationToStore)=>{

    _addVaccinationToStore({...vaccination, id:generateUUID(), userId:authentication.currentUser.uid})

}

export const deleteVaccination = async (id, _deleteVaccinationInStore)=>{
    _deleteVaccinationInStore(id);
}

export const setVaccination = async(id,vaccination, setSubmitting, _setVaccinationInStore) => {

   _setVaccinationInStore({...vaccination, id:id, userId:authentication.currentUser.uid})
    setSubmitting(false);

}
