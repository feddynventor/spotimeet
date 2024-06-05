import * as React from 'react';
import ConcertCard from './ConcertCard';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useEffect } from'react';
import GroupTypeSelector from './GroupTypeSelector';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// export default function GroupList({ groups }) {
//     return (
//         <Grid container spacing={12}>

    
//           <Grid item xs={12}>
//                 {groups.map((group) => (
//                     <Item>                   
//                           <ConcertCard group={group}></ConcertCard>
//                     </Item>
//                 ))}
//             </Grid>
//         </Grid>
//     );
// }

export default function GroupList({ groups }) {
    const { id } = useParams();

    useEffect(() => {
      console.log(id);
    }, [id]);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <GroupTypeSelector />
        <Grid container spacing={2}>
          {groups.map((group) => (
            <Grid item xs={12} sm={12} md={6} lg={4}>
              {/* <Item>  */}
                <ConcertCard group={group}></ConcertCard>
              {/* </Item> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
