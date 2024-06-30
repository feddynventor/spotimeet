import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function DebouncedInput({ onInput }) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const debounceId = setTimeout(() => {
            if (searchTerm === '') return;
            onInput(searchTerm);
        }, 500);

        return () => {
            clearTimeout(debounceId);
        };
    }, [searchTerm]);

    return (
        <FormControl sx={{ m: 2, width: '90%' }}>
          <InputLabel htmlFor="searchBar">Ricerca</InputLabel>
          <OutlinedInput
            autoFocus
            id="searchBar"
            placeholder='Artista o Città...'
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={<InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>}
            label="Ricerca"
            sx={{borderRadius:'25px'}}
          />
        </FormControl>
    );
}