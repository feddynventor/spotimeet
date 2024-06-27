import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function GroupTypeSelector() {

  const chipStyles = {
    fontSize: '16px',
    borderRadius: '50px',
    padding: '10px',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 2,
        },
      }}
    >
    
    <Stack direction="row" spacing={1}>
      <Chip label="Tutti i gruppi" sx={chipStyles}/>
      <Chip label="Artisti" variant="outlined" sx={chipStyles}/>
      <Chip label="Concerti" variant="outlined" sx={chipStyles}/>
    </Stack>

    </Box>
  );
}