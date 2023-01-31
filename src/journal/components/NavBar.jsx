import { AppBar, Avatar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../store"


export const NavBar = ({ drawerWidth = 240 }) => {

    const { displayName, photoURL } =useSelector( state => state.auth)

    const dispatch = useDispatch()


    const onLogout = ( )=>{
        dispatch( startLogout() )
    }

    

    return (
        <AppBar 
            position="fixed"
            sx={{ 
                width: { sm: `calc( 100% - ${ drawerWidth }px ) `},
                ml: { sm: ` ${ drawerWidth }px`},
                height: 70,
                mb: 2
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <i className="bi bi-list"></i>
                </IconButton>

                <Grid container  direction='row' justifyContent='space-between' alignItems='center' >

                    <Typography  variant='h5' sx={{  display: { xs: 'none', sm: 'block'} }}>
                        Journal APP
                    </Typography>

                    <IconButton 
                        onClick={ onLogout }
                        color='error'>
                        <i className="bi bi-box-arrow-left"></i>
                    </IconButton>
                </Grid>

            </Toolbar>

        </AppBar>
    )
}
