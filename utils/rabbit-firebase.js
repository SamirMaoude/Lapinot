import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 
import { generateUUID } from "./Utils";

const rabbitRef = collection(db, 'rabbits')

export const addRabbit = async (rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _addRabbitToStore) => {
    let rabbit = {
        id: generateUUID(),
        rabbitCode: rabbitCode,
        dateOfbirth: dateOfbirth,
        gender: gender,
        fatherId: fatherId,
        motherId: motherId,
        userId: authentication.currentUser.uid
    }
    
    
        
    _addRabbitToStore(rabbit)

    setSubmitting(false);
};

export const setRabbit = async(id,rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _setRabbitInStore) => {

    let rabbit = {
        rabbitCode: rabbitCode,
        dateOfbirth: dateOfbirth,
        gender: gender,
        fatherId: fatherId,
        motherId: motherId,
        userId: authentication.currentUser.uid
    }


    _setRabbitInStore({...rabbit, id:id})
    
    setSubmitting(false);

}

export const deleteRabbit = async (id, _deleteRabbitInStore)=>{
    
    _deleteRabbitInStore(id);
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

