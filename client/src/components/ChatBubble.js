import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

export default function ChatBubble({text, userObj, timestamp, avatar}) {
    return <Box sx={{
        display: "flex", flexDirection: !userObj ? "row-reverse" : "row", 
        alignItems: "flex-start",
        m: 2, 
        marginBottom: "0",
        marginTop: 1,
        }}>
        {!userObj ? null : (
            <Avatar src={userObj.profile.photo} sx={{ width: 40, height: 40, marginRight: 2 }} />
        )}
        <Box sx={{
            borderRadius: "12px", 
            borderTopLeftRadius: !userObj ? "12px" : "0px", 
            borderTopRightRadius: !!userObj ? "12px" : "0px",
            padding: "10px", 
            backgroundColor: !userObj ? "#FFA07A" : "#A9A9A9", 
            maxWidth: timestamp ? "80%" : "100%",
            width: timestamp ? "fit-content" : "100%",
            wordWrap: "break-word",
            }}>
            <Typography variant="subtitle1" fontWeight="fontWeightBold">{userObj?.profile.displayName}</Typography>
            <Typography variant="subtitle1">{text}</Typography>
            {!!timestamp ? <Typography variant="subtitle2" fontStyle="italic" sx={{ alignSelf: 'flex-start' }}>{new Date(timestamp).toLocaleTimeString(undefined, {minute: "2-digit", hour: "2-digit"})}</Typography> : null }
        </Box>
    </Box>
}