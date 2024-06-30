import * as React from 'react';
import ConcertCard from './ConcertCard';
import GlobalCard from './GlobalCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useGroupList } from '../hooks/groups';
import GroupTypeSelector from './GroupTypeSelector';
import CustomSkeleton from './CustomSkeleton';

export default function GroupList({ modificatore, list }) {
    const groups = useGroupList(modificatore)
    const [groupType, setGroupType] = React.useState(null);

    if (!groups) return (
      <>
      { list ? null : <GroupTypeSelector onSelect={setGroupType} selected={groupType} /> } <CustomSkeleton />
      </>
    )
    const groupList = !!!list && !!groups && groups
      .filter( g => groupType==null ? true : groupType=='event' ? g.event!=null : g.event==null)
      .map(groupMap)
    return (
      <Box sx={{ flexGrow: 1 }}>
        { list 
          ? <Box sx={{backgroundColor: '#FF6D2E', borderRadius: '0px 0px 10px 0px',p:2, mb:2, width:'60%'}}><Typography variant="h5" sx={{color: '#332D2A'}}>Gruppi di concerti a {list[0].event.city[0]+list[0].event.city.slice(1).toLowerCase()}</Typography></Box>
          : <GroupTypeSelector onSelect={setGroupType} selected={groupType} />
        }
        <Grid container spacing={2}>
          { groupList && groupList.length==0 ? <Typography variant="h5">Nessun gruppo trovato</Typography> : null }
          { !!list && list.length>0 ? list.map(groupMap) : <Typography variant="h5">Nessun gruppo trovato</Typography> }
        </Grid>
      </Box>
    );
  }

const groupMap = (group) => (
  <Grid item xs={12} sm={12} md={6} lg={3}>
    { !!group.event ? <ConcertCard group={group}></ConcertCard> : <GlobalCard group={group} /> }
  </Grid>
)
