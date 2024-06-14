import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ChatBubble from "./ChatBubble";
import { Typography, Avatar } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';
import MusicNoteSharpIcon from '@mui/icons-material/MusicNoteSharp';
import Button from "@mui/material/Button";
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserDetails } from "../hooks/users";
import { useGroup } from "../hooks/groups";
//import GroupDetails from "./GroupDetails";

export default function Chat({type}) {
    const [cookies, setCookie, removeCookie] = useCookies('token');
    const senderUser = useUserDetails()

    //id Artista o Evento, conosciuti nel resto del frontend
    const entity_id = useParams().id
    const group = useGroup(type, entity_id)

    const [message, setTextbox] = useState("")
    const [messages, setMessages] = useState([])
    //const [showGroupDetails, setShowGroupDetails] = useState(false);

    const messagesEndRef = useRef(null)

    const [socket, setSocket] = useState(null)
    if (!!group && !socket) setSocket( io("ws://spotimeet.fedele.website/?group="+group._id, {
        withCredentials: true,
        extraHeaders: {
            "Authorization": cookies.token
        }
    }) )

    useEffect(() => {
        if (!!!socket) return
        function handleNewMessage(data) {
            setMessages( current => [...current, ...data.messages] );
        }
        socket.on("message", handleNewMessage);
        return () => {
            socket.off("message", handleNewMessage);
        };
    }, [socket])

    const handleSend = () => {
        if (!message) return;
        socket.emit("message", message);
        // replica schema del DB direttamente sul client senza feedback
        setMessages([...messages, {text: message, user: null, timestamp: new Date()}]);
        setTextbox("");
    };

    useEffect(()=>{
        messagesEndRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    if (!senderUser || !group) return
    

    return (
    <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        m: "0px",
        overflowY: 'scroll', /* Garantire che solo lo scorrimento verticale sia abilitato */
        '&::-webkit-scrollbar': { display: 'none' }, /*IOS*/
        scrollbarWidth: 'none', /* Nascondere la barra di scorrimento in Firefox */
        msOverflowStyle: 'none', /* Nascondere la barra di scorrimento in Internet Explorer e Edge */
    }}>
        <form onSubmit={(e)=>{e.preventDefault(); handleSend()}}>
            <Box sx={{display: 'flex', flexDirection: 'row', maxWidth: "100%", padding:'0px', margin:'10px', border: '2px solid #FF6D2E', borderRadius:'50px'}}>
                <TextField autoFocus fullWidth placeholder="Scrivi un messaggio..." onChange={(e)=>{setTextbox(e.target.value)}} value={message} sx={{padding:'0 10 0 0', marginLeft: '20px','& .MuiOutlinedInput-root': {'& fieldset': { borderColor: 'transparent' },'&:hover fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: 'transparent' },},}}></TextField>
                <Button sx={{margin: '0px'}}> <MusicNoteSharpIcon /> </Button>
                <Button type="submit" sx={{marginRght:'20px'}}> <SendIcon /> </Button>
            </Box>
        </form>
        <Box ref={messagesEndRef} sx={{overflowY: "scroll", flexGrow: 1, display: "flex", flexDirection: "column"}}>
            {messages.length == 0 ? <Typography align="center" variant="subtitle1">Ancora nessun messaggio... Comincia tu!</Typography> : messages.map((msg, index) => <ChatBubble
                key={index} text={msg.text}
                userObj={msg.user && msg.user._id===senderUser._id ? null : msg.user}
                timestamp={msg.timestamp} 
            />)}
        </Box>
        <Box /*onClick={() => setShowGroupDetails(true)}*/ sx={{marginBottom: 1, p: 1, borderRadius: '10px 10px 0 0', backgroundColor: '#FF6D2E', display: "flex", alignItems: "center" }}>{
            !!group.artist ? <><Avatar sx={{ width: 64, height: 64, m:1 }} src={group.artist.image}></Avatar><Typography variant="h4">{group.artist.name}</Typography></> :
            !!group.event ? <><Avatar sx={{ width: 64, height: 64, m:1 }} src={group.event.tour.image}></Avatar><Box><Typography variant="h5">{group.event.tour.name} - {group.event.city}</Typography><Typography variant="subtitle1">{new Date(group.event.date).toLocaleDateString()}</Typography></Box></> : null
        }</Box>
        {/*showGroupDetails && <GroupDetails group={group} members={group.members} onClose={() => setShowGroupDetails(false)} />*/}
    </Box>
    )
}