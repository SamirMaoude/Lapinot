import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 

const vaccinationRef = collection(db, 'vaccinations')

export const addVaccination = async (vaccination, _addVaccinationToStore)=>{

    await addDoc(vaccinationRef,{...vaccination, userId:authentication.currentUser.uid}, { merge: true }).then((docRef)=>{
        _addVaccinationToStore({...vaccination, id:docRef.id, userId:authentication.currentUser.uid})

      }).catch((e)=>{
          console.log(e)
      })

}

export const deleteVaccination = async (id, _deleteVaccinationInStore)=>{
    const docRef = doc(db, 'vaccinations', id);

    await deleteDoc(docRef).then((docRef)=>{
        _deleteVaccinationInStore(id);
    }); 
}

export const setVaccination = async(id,vaccination, setSubmitting, _setVaccinationInStore) => {

    await setDoc(doc(db,'vaccinations',id), {vaccination, userId:authentication.currentUser.uid}).then((docRef)=>{
        
        _setVaccinationInStore({...vaccination, id:id, userId:authentication.currentUser.uid})
    }).catch((e)=>{
        console.log(e)
    })
    setSubmitting(false);

}
