import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null, 
        //active:{
        //    id: 'asd',
        //    title: '',
        //    body: '',
        //    date: 1234,
        //    imageUrls: []
        //}
    },
    reducers: {
        savingNewNote: ( state ) =>{
            state.isSaving = true
        },
        addNewEmptyNote: ( state, action ) =>{
            state.notes.push( action.payload )
            state.isSaving = false
        },
        setActiveNote: ( state, action ) =>{
            state.active = action.payload;
            state.messageSave = ''
        }, 
        setNotes: ( state, action ) =>{
            state.notes = action.payload
        }, 
        setSaving: ( state ) =>{
            state.isSaving = true ;
            state.messageSave = ''
        }, 
        updateNote: ( state, action ) =>{
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id ) return action.payload
                return note
            });
            state.messageSave = `${ action.payload.title }, Actualizada Correctamente `
        }, 
        setPhotosToActiveNote:(state, action)=>{
            state.active.imageUrls = [ ...(state.active.imageUrls?.length ? state.active.imageUrls : []), ...action.payload ]; 
            state.isSaving = false 
        },
        clearNotesLogout: ( state )=>{
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null; 
        },
        deleteNoteById: ( state, action ) =>{
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.active = null; 
        }, 
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote, 
    setPhotosToActiveNote,
    clearNotesLogout

    } = journalSlice.actions;