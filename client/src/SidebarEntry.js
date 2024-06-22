import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function SidebarEntry({ index, isOpened, icon, label, callback }) {
    return (
        <Box key={index} sx={{ m: isOpened ? 2 : null, borderRadius: '10px', border: isOpened ? '2px solid #FF6D2E' : 'unset' }}>
            <ListItem key={index} disablePadding sx={{ display: 'block', borderRadius: '12px' }}>
                <ListItemButton
                    sx={{
                        minHeight: 72,
                        justifyContent: isOpened ? 'initial' : 'center',
                        px: 2.5,
                        transition: 'background-color 0.5s ease',
                        backgroundColor: isOpened ? '#FF6D2E' : '#332D2A',
                        borderRadius: '5px'
                    }}
                    onClick={callback}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: isOpened ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} sx={{ opacity: isOpened ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </Box>
    )
}