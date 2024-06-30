import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function GroupTypeSelector({ onSelect, selected }) {

  const chipStyles = {
    fontSize: '16px',
    borderRadius: '50px',
    padding: '10px',
  };

  if(!onSelect) return;

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
      <Chip label="Tutti i gruppi" variant={selected==null ? 'filled' : 'outlined'} sx={chipStyles} onClick={()=>{onSelect(null)}} />
      <Chip label="Artisti" variant={selected=='artist' ? 'filled' : 'outlined'} sx={chipStyles} onClick={()=>{onSelect('artist')}} />
      <Chip label="Concerti" variant={selected=='event' ? 'filled' : 'outlined'} sx={chipStyles} onClick={()=>{onSelect('event')}} />
    </Stack>

    </Box>
  );
}