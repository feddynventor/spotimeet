import * as React from 'react';
import ConcertCard from './ConcertCard';
import GlobalCard from './GlobalCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect } from'react';
import { useJoinedGroup } from '../hooks/groups';
import GroupTypeSelector from './GroupTypeSelector';
import CustomSkeleton from './CustomSkeleton';

export default function GroupList({ modificatore }) {
    const groups = useJoinedGroup(modificatore)

    if (!groups) return (
      <>
      <GroupTypeSelector /> <CustomSkeleton />
      </>
    );
    return (
      <Box sx={{ flexGrow: 1 }}>
        <GroupTypeSelector />
        <Grid container spacing={2}>
         {!!groups && groups.map((group) => (
            <Grid item xs={12} sm={12} md={6} lg={3}>
              { !!group.event ? <ConcertCard group={group}></ConcertCard> : <GlobalCard group={group} /> }
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
