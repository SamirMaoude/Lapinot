import { authentication } from "../firebase/firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export const registerUser = (farmName, email, password) => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
    });
}

export const loginUser = (email, password) => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        return {status: 'SUCCESS', user: user, message: ''}
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({status: 'FAILED', message: errorMessage, user: null})
        return {status: 'FAILED', message: errorMessage, user: null}
    });
}