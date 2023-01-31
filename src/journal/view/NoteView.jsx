import { useEffect, useMemo, useRef } from "react"

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeleteNote, startSaveNote, startUploadingFiles } from "../../store"
import { ImageGallery } from "../components"


export const NoteView = () => {
    
    const dispatch = useDispatch()
    const { active:noteActive, messageSave, isSaving } = useSelector( state => state.journal )
    const { body, title, date, onInputChange, formState }= useForm( noteActive )

    const dateString = useMemo( () => { 
        const newDate = new Date( date )

        return new Intl.DateTimeFormat( 'es-Es', {
            dateStyle: "medium",
            timeStyle: "short"
        }).format( newDate ).toLocaleUpperCase() 

    }, [ date ])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ] )
    

    useEffect( ()=> {
        if( messageSave.length > 0 ){
            Swal.fire(
                'Nota Actualizada',
                messageSave,
                'success',
                'Exito'
            )
        }
    }, [ messageSave ])


    const onSaveNote = (  ) => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({ target })=>{
        if( target.files === 0 ) return;
        console.log('Subiendo archivos ')

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDelete = ( )=>{
        console.log( 'Borrado')

        dispatch( startDeleteNote() )
    }

    return (
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container direction='row' 
            justifyContent='space-between'  
            alignItems='center' 
            sx={{ mb: 1 }} 
            >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='ligth' >{ dateString }</Typography>
            </Grid>

            <input 
                type="file"
                ref={ fileInputRef }
                multiple
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ ()=> fileInputRef.current.click()  }
            >
                <i className="bi bi-upload"></i>
            </IconButton>

            <Grid item>
                <Button 
                    color='primary' 
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote }
                    disabled={ isSaving }
                    >
                        <i className="bi bi-device-ssd" ></i>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder="Ingrese un Titulo"
                    label='Titulo'
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                    sx={{ border: 'none', mb:1 }}
                />

                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder="Nota del Día"
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                    minRows={ 5 }
                />
            </Grid>

            <Grid container justifyContent='end' >
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <i className="bi bi-trash3-fill"></i>
                    Borrar 
                </Button>
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGallery images={ noteActive.imageUrls } />

        </Grid>
    )
}
