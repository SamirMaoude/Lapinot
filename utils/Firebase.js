import { authentication } from "../firebase/firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export const registerUser = (farmName, email, password) => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

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
        return {status: 'FAILED', message: errorMessage, user: null}
    });
}