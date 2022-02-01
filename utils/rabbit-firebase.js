import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore/lite"; 

const rabbitRef = collection(db, 'rabbits')

export const addRabbit = async (rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _addRabbitToStore) => {
    let rabbit = {
        rabbitCode: rabbitCode,
        dateOfbirth: dateOfbirth,
        gender: gender,
        fatherId: fatherId,
        motherId: motherId,
        userId: authentication.currentUser.uid
    }
    console.log('rabbit')
    console.log(rabbit)
    await addDoc(rabbitRef,rabbit, { merge: true }).then((docRef)=>{
        _addRabbitToStore({...rabbit, id:docRef.id})
      }).catch((e)=>{
          console.log(e)
      })

      
    
    
    setSubmitting(false);
};

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

