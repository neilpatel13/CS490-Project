import { Grid, Button, Box} from '@mui/material';
import  LogoutOutlinedIcon  from '@mui/icons-material/LogoutOutlined';
import logo from '../assets/mainLogo.svg'
import * as React from 'react';

const SideBar = () => {
return(

    <Grid container 
        display= 'flex'
        spacing= {4}
        direction= 'column'
        justifyContent="space-around"
        alignItems="center"
        bgcolor='#252628'
         >
        <Grid item>
            Crush It
        </Grid>
        <Grid item >
            <img
                src={logo}
                alt='Someone Working!'
                style={{width:'148px', height:'148px' }}/>
        </Grid>
        <Grid item >
            It's time to plan your day!
        </Grid>
        <Grid item >
            <Button size="medium" variant="outlined">
                Plan Day
            </Button>
        </Grid>
        <Grid item>
            <Box mt={4}>
            </Box>
        </Grid>
        <Grid item>
            <Button size="small" variant="outlined" logoutIcon={ <LogoutOutlinedIcon /> }>
                Logout
            </Button>
        </Grid>
    </Grid>

)
}
export default SideBar