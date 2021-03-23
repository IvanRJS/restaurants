import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'


const db = firebase.firestore(firebaseApp)

export const isUserLogged = () =>{
    let isLogged=false
    firebase.auth().onAuthStateChanged((user)=>{
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export const registerUser = async(email,password) =>{
    const result = {statusResponse: true,error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse = false
        result.error="este correo ya ha sido registrado"
    }
    return result
}

export const loginWithEmailAndPassword = async(email,password) =>{
    const result = {statusResponse: true,error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse = false
        result.error="usuario o contraseña no válidos"
    }
    return result
}

export const closeSession = () =>{
    return firebase.auth().signOut()
}
