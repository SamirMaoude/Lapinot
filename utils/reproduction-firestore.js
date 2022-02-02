import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 

const reproductionRef = collection(db, 'reproductions')

export const addReproduction = async (reproduction, _addCoupleToStore, _addReproductionToStore)=>{

    await addDoc(reproductionRef,{...reproduction, userId:authentication.currentUser.uid}, { merge: true }).then((docRef)=>{
        
        _addCoupleToStore({male:reproduction.maleId,female:reproduction.femaleId})
        _addReproductionToStore({...reproduction, id:docRef.id, userId:authentication.currentUser.id})

      }).catch((e)=>{
          console.log(e)
      })

}