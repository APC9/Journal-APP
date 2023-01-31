import { Avatar, Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { SideBarItems } from "./SideBarItems"



export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName, photoURL } =useSelector( state => state.auth)
    const { notes } =useSelector( state => state.journal)

    const newName = useMemo( ()=>{
        return displayName.length > 10
        ? displayName.substring(0, 10) + '...'
        : displayName
    }, [ displayName ])

    return (
        <Box
            component='nav'
            sx={{  width: { sm:drawerWidth }, flexShrink:{ sm: 0 } }}
        > 
            <Drawer
                variant='permanent' // temporary
                open
                sx={{ 
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>

                    <Avatar 
                            alt={ displayName } 
                            src={ photoURL } 
                            sx={{ width: 56, height: 56, m:2 }}
                    />

                    <Typography variant='h6' noWrap component='div' >
                            { newName }
                    </Typography>

                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map( note =>(
                            <SideBarItems  key={ note.id } { ...note } />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
