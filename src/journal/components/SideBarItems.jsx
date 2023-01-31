
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal'

export const SideBarItems = ({ title, body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch()

    const newTitle = useMemo( ()=>{
        return title.length > 17
        ? title.substring(0, 17) + '...'
        : title
    }, [ title ])



    const noteActive = ( event ) =>{
        dispatch( setActiveNote( { title, body, id, date, imageUrls } ))
    }

    return (
        <ListItem  disablePadding >
            <ListItemButton onClick={ noteActive } >
                <ListItemIcon>
                    <i className="bi bi-bookmark"></i>
                </ListItemIcon>
                <Grid>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
