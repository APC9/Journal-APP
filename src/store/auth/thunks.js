import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkLoginCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( {email, password} )=> {
    return async( dispatch )=>{

        dispatch( checkLoginCredentials())
    }
} 

export const startGoogleSignIn = () =>{
    return async( dispatch )=>{
        dispatch( checkLoginCredentials())
        
        const result = await singInWithGoogle()
        
        if( !result.ok ) return dispatch( logout( result.errorMessage ))

        dispatch( login( result ))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName })=>{
    return async( dispatch )=>{
        dispatch( checkLoginCredentials())

        const result = await registerUserWithEmailPassword({ email, password, displayName })
        
        
        if( !result.ok ) return dispatch( logout( result ))

        dispatch( login(result))
    }
}

export const startLoginWithEmailPassword = ( {email, password } ) =>{
    return async( dispatch )=>{
        dispatch( checkLoginCredentials())


        const result = await loginWithEmailPassword( {email, password } )
        if( !result.ok ) return dispatch( logout( result ))
        
        dispatch( login(result))

    }
}

export const startLogout = ()=>{
    return async( dispatch ) =>{

        await logoutFirebase()
        dispatch( logout())
        dispatch( clearNotesLogout() )
    }
}