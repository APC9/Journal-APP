
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload, loadNotes } from "../../helpers"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./"


export const startNewNote = ()=>{
    return async(dispatch, getState )=>{

        dispatch( savingNewNote() )

        const { uid } = getState().auth 
        const newNote ={
            title:'',
            body:'',
            imageUrls: [],
            date: new Date().getTime()
        }

        try {

            const newDoc = await addDoc( collection( FirebaseDB, `${ uid }/journal/notes`), newNote )
            newNote.id = newDoc.id

            dispatch( addNewEmptyNote( newNote ) )
            dispatch( setActiveNote( newNote ) )

        } catch (error) {
            console.log( error ) 
        }
        
    }
}

export const startLoadingNotes = () =>{
    return async( dispatch, getState ) =>{

        const { uid } = getState().auth;
        if ( !uid )throw new Error('El UID del usuario no existe')
        
        const notes = await loadNotes( uid )
        dispatch(setNotes( notes ))
        
    }
}

export const startSaveNote = ( )=>{
    return async( dispatch, getState )=>{

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteFireStore = { ...note }
        delete noteFireStore.id
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )

        await setDoc( docRef, noteFireStore, { merge: true } )
        dispatch( updateNote( note ) )
    
    }
}

export const startUploadingFiles = ( files = [] )=>{
    return async( dispatch ) =>{
        dispatch( setSaving() )

        //await fileUpload( files[0] )

        const fileUploadPromises = []

        for( const file of files ){
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises )
        dispatch( setPhotosToActiveNote( photosUrls ) )
    }
}


export const startDeleteNote = ( ) =>{
    return async( dispatch, getState )=>{

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await deleteDoc( docRef )
    

        dispatch( deleteNoteById( note.id ) )
    }
}