import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function ChatBubble({text, userObj, timestamp}) {
    return <Box sx={{
        display: "flex", flexDirection: !userObj ? "row-reverse" : "row", 
        alignItems: "flex-start",
        m: 2, 
        marginBottom: "0",
        marginTop: 1,
        }}>
        <Box sx={{
            borderRadius: "12px", borderTopLeftRadius: !userObj ? "12px" : "0px", borderTopRightRadius: !!userObj ? "12px" : "0px",
            padding: "10px", 
            backgroundColor: !userObj ? "#FFA07A" : "#A9A9A9", 
            maxWidth: "80%", 
            wordWrap: "break-word"
            }}>
            <Typography variant="subtitle1" fontWeight="fontWeightBold">{userObj?.profile.displayName}</Typography>
            <Typography variant="subtitle1">{text}</Typography>
            <Typography variant="subtitle2" fontStyle="italic">{new Date(timestamp).toLocaleTimeString(undefined, {minute: "2-digit", hour: "2-digit"})}</Typography>
        </Box>
    </Box>
}