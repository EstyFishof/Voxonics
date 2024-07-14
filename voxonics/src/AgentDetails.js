import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

 import './AgentDetails.css';


const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },

  },
});

export default function AgentDetails() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border:3,
          boxShadow: 1, // doesn't work
          // borderRadius: 2,
          p: 2,
          minWidth: 300, 
            // display: 'grid',
            gridTemplateColumns:'repeat',
            // gridTemplateRows:2,
            display: 'flex',
            // flexDirection: 'row',
  gap:4,
            // padding:'auto',
            marginTop:10
            // columnGap:40
            // width: 40,
            //    height: 600
        
        }}

        
      >
        <div className='div_in_details'>
        <Box sx={{ color: 'text.secondary',fontSize:13 }}>Agent Number(ID)</Box>
        <Box sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'medium' }}>111
          {/* {'funcAgentId'} */}
        </Box></div>
        <div className='div_in_details'>
        <Box sx={{ color: 'text.secondary',fontSize:13 }}> Calls Today</Box>
        <Box sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'medium' }}>25
          {/* {'funcCalls'} */}
        </Box></div>
        {/* <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          vs. last week
        </Box> */}
        
      </Box>
    </ThemeProvider>
  );
}


