import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function UserCard({ user }) {
    if (!user)
        return <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>
    else
        return <Box sx={{ m: 2 }}>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
                <Avatar sx={{ width: '150px', height: '150px' }} src={user.profile.photo}>
                    {user.profile.displayName.split(' ').map((name) => name[0]).join('')}
                </Avatar>
            </Box>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
                <Typography sx={{ margin: '1rem', marginBottom: '0' }} variant="h5">
                    {user.profile.displayName}
                </Typography>
            </Box>
        </Box>
}