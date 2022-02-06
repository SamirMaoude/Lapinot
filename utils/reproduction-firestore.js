import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 

const reproductionRef = collection(db, 'reproductions')

export const addReproduction = async (reproduction, _addReproductionToStore)=>{

    await addDoc(reproductionRef,{...reproduction, userId:authentication.currentUser.uid}, { merge: true }).then((docRef)=>{
        
        _addReproductionToStore({...reproduction, id:docRef.id, userId:authentication.currentUser.uid})

      }).catch((e)=>{
          console.log(e)
      })

}

export const deleteReproduction = async (id, _deleteReproductionInStore)=>{
    const docRef = doc(db, 'reproductions', id);

    await deleteDoc(docRef).then((docRef)=>{
        _deleteReproductionInStore(id);
    }); 
}

export const setReproduction = async(id,reproduction, setSubmitting, _setReproductionInStore) => {

    await setDoc(doc(db,'reproductions',id), {reproduction, userId:authentication.currentUser.uid}).then((docRef)=>{
        
        _setReproductionInStore({...reproduction, id:id, userId:authentication.currentUser.uid})
    }).catch((e)=>{
        console.log(e)
    })
    setSubmitting(false);

}
