import { useMemo } from "react"
import { Link as RouterLink } from "react-router-dom" // el "as" es un alias para cambiarle el nombre y no haya conflictos
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store"
import { useDispatch, useSelector } from "react-redux"

const formDate ={
    email: '',
    password: ''
}

export const LoginPages = () => {

    const { status, errorMessage } = useSelector( state => state.auth )
    const dispatch =useDispatch()

    const { email, password, onInputChange, formState } = useForm( formDate )

    const isAuthenticating = useMemo( () => status === 'checking', [status] )
    

    const onSubmit = ( event ) =>{
        event.preventDefault()
        dispatch(startLoginWithEmailPassword( {email, password} ))
    }

    const onGoogleSignIn = ( ) =>{
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title="Login">

                <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
                    <Grid container >
                        
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label='Correo' 
                                type='email'
                                placeholder="correo@email.com"
                                fullWidth
                                name ='email'
                                value={ email }
                                onChange={ onInputChange}
                            />
                        </Grid>
                        
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField 
                                label='Contraseña' 
                                type='password'
                                placeholder="Contraseña"
                                fullWidth
                                name ='password'
                                value={ password }
                                onChange={ onInputChange}
                            />
                        </Grid>
                    

                        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1}} >

                            <Grid item xs={ 12 }  sm={ 6 } >
                                <Button 
                                    type='submit' 
                                    variant='contained' 
                                    fullWidth 
                                    disabled={ isAuthenticating }
                                >
                                    Login
                                </Button>
                            </Grid>
                            
                            <Grid item xs={ 12 }  sm={ 6 } >
                                <Button 
                                    variant='contained' 
                                    fullWidth 
                                    className="bi bi-google"
                                    disabled={ isAuthenticating }
                                    onClick={ onGoogleSignIn } 
                                    >
                                        <i className="bi bi-chrome"></i>    
                                        <Typography sx={{ ml: 1 }}>
                                            Google
                                        </Typography>
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 }  display={ !!errorMessage ? '' : 'none' }>
                                <Alert severity="error" >{ errorMessage }</Alert>
                            </Grid>

                            <Grid container direction='row' justifyContent='end' sx={{mt: 2}} >
                                <Link component={ RouterLink } color='inherit'  to='/auth/register' >
                                    Crear una cuenta
                                </Link>
                            </Grid>

                        </Grid>

                    </Grid>
                </form>

        </AuthLayout>

    )
}
