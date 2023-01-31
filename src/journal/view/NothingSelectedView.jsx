import { Grid, Typography } from "@mui/material"
import { borderRadius } from "@mui/system"


export const NothingSelectedView = () => {
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={ 0 }
            direction="column"
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: 'calc(100vh - 100px ) ', backgroundColor: 'primary.main', borderRadius: 3 }}
        > 
            <Grid item xs={ 12 } sx={{ fontSize: 150, color: 'white'}}>
                <i className="bi bi-star"></i>
            </Grid>
            <Grid item xs={ 12 } >
                <Typography color= 'white' variant='h5'> Selecciona o Crea una Entrada  </Typography>
            </Grid>

        </Grid>
    )
}
