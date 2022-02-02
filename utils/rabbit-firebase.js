import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 

const rabbitRef = collection(db, 'rabbits')

export const addRabbit = async (rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _addRabbitToStore, _addCoupleToStore) => {
    let rabbit = {
        rabbitCode: rabbitCode,
        dateOfbirth: dateOfbirth,
        gender: gender,
        fatherId: fatherId,
        motherId: motherId,
        userId: authentication.currentUser.uid
    }
    
    await addDoc(rabbitRef,rabbit, { merge: true }).then((docRef)=>{
        if(fatherId!=='' && motherId!=''){
            _addCoupleToStore({male:fatherId,female:motherId})
        }
        _addRabbitToStore({...rabbit, id:docRef.id})

      }).catch((e)=>{
          console.log(e)
      })

      
    
    
    setSubmitting(false);
};

export const setRabbit = async(id,rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _setRabbitInStore, _addCoupleToStore) => {

    let rabbit = {
        rabbitCode: rabbitCode,
        dateOfbirth: dateOfbirth,
        gender: gender,
        fatherId: fatherId,
        motherId: motherId,
        userId: authentication.currentUser.uid
    }

    await setDoc(doc(db,'rabbits',id), rabbit).then((docRef)=>{
        if(fatherId!=='' && motherId!=''){
            _addCoupleToStore({fatherId,motherId})
        }
        _setRabbitInStore({...rabbit, id:id})
    }).catch((e)=>{
        console.log(e)
    })
    setSubmitting(false);

}

export const deleteRabbit = async (id, _deleteRabbitInStore)=>{
    const docRef = doc(db, 'rabbits', id);

    await deleteDoc(docRef).then((docRef)=>{
        _deleteRabbitInStore(id);
    }); 
}

export const getRabbits = async ()=>{
    const rabbitsSnapshot = await getDocs(rabbitRef);
    const rabbitsList = rabbitsSnapshot.docs
                        .map((doc) => doc.data())
                        .filter((rabbit)=>rabbit.userId===authentication.currentUser.uid);
    return rabbitsList;

}

export const getFemaleRabbits = async (setFemaleRabbitsList,setLoading)=>{
    const rabbitsSnapshot = await getDocs(rabbitRef);
    const rabbitsList = rabbitsSnapshot.docs
                        .map((doc) => {return {id:doc.id,...doc.data()}})
                        .filter((rabbit)=>rabbit.userId===authentication.currentUser.uid && rabbit.gender==="F");
    setFemaleRabbitsList(rabbitsList)
    setLoading(false);
     
}

export const getMaleRabbits = async (setMaleRabbitsList, setLoading)=>{
    const rabbitsSnapshot = await getDocs(rabbitRef);
    const rabbitsList = rabbitsSnapshot.docs
                        .map((doc) => {return {id:doc.id,...doc.data()}})
                        .filter((rabbit)=>rabbit.userId===authentication.currentUser.uid && rabbit.gender==="M");
    setMaleRabbitsList(rabbitsList)
    setLoading(false);
}

