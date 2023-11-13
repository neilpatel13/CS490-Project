import React from 'react';
import { Box, Stack,Paper,styled, Typography } from '@mui/material';


const Tasks =() => {
    return(

        <Box lg={10} display="flex" alignItems={'center'} sx={{
            flexDirection: 'column',
            overflow:"hidden",
            width: '50%',
            height: '50%',
            bgcolor: '#FFF',
            boxShadow: 3,
            borderRadius: 10,
        }}>
            
            <Box display="flex" justifyContent={'center'} sx={{
                mx: 'auto',
                m:1,
                width: '75%',
                height: '100%',
                bgcolor: '#F5F7F9',
                borderRadius: 8
            }}>
            Top Priority
            <Stack>

            </Stack>
            </Box >
            <Box display="flex" justifyContent={'center'} sx={{
                mx: 'auto',
                m:1,
                width: '75%',
                height: '100%',
                bgcolor: '#F5F7F9',
                borderRadius: 8
            }}>
            Important
            </Box>
            <Box display="flex" justifyContent={'center'} sx={{
                mx: 'auto',
                m:1,
                width: '75%',
                height: '100%',
                bgcolor: '#F5F7F9',
                borderRadius: 8
            }}>
            Other
            </Box>
        </Box>
    )
};
export default Tasks