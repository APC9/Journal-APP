import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, } from 'firebase/auth'
import { FirebaseAuth } from './config';


const googleProvider =  new GoogleAuthProvider();

export const singInWithGoogle = async ()=>{

    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider)
        //const credentials = GoogleAuthProvider.credentialFromResult( result )
        
        const { displayName, email, photoURL, uid } = result.user

        return{
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) =>{

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email,  password )
        const { uid, photoURL,} = resp.user

        await updateProfile( FirebaseAuth.currentUser, { displayName })

        return{
            ok: true,
            displayName, email, photoURL, uid,
        }
        
    } catch (error) {

        return{
            ok: false,
            errorMessage: 'El usuario ya existe'
        }
    }

}

export const loginWithEmailPassword = async ( {email, password}  ) =>{

    try {
        
        const result =  await signInWithEmailAndPassword(FirebaseAuth, email, password )

        const { displayName, photoURL, uid } = result.user

        return{
            ok: true,
            displayName, email, photoURL, uid
        }
    
    } catch (error) {
        
        const errorMessage = (error.message === "Firebase: Error (auth/wrong-password).")
                            ? 'Contraseña invalida'
                            : 'Usuario no encontrado';

        return{
            ok: false,
            errorMessage,
        }
    }
}


export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut()
}