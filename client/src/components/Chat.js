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

export default function Chat({type}) {
    const [cookies, setCookie, removeCookie] = useCookies('token');
    const senderUser = useUserDetails()

    //id Artista o Evento, conosciuti nel resto del frontend
    const entity_id = useParams().id
    const group = useGroup(type, entity_id)

    const [message, setTextbox] = useState("")
    const [messages, setMessages] = useState([])

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

    return <Box sx={{height: "100%", display: "flex", flexDirection: "column-reverse", m: "-10px"}}>
        <form onSubmit={(e)=>{e.preventDefault(); handleSend()}}>
            <Box sx={{display: 'flex', flexDirection: 'row', width: "100%", p:"10px", paddingBottom:0}}>
                <TextField autoFocus fullWidth placeholder="Scrivi un messaggio..." onChange={(e)=>{setTextbox(e.target.value)}} value={message}></TextField>
                <Button > <MusicNoteSharpIcon /> </Button>
                <Button type="submit"> <SendIcon /> </Button>
            </Box>
        </form>
        <Box ref={messagesEndRef} sx={{overflowY: "scroll", flexGrow: 1, display: "flex", flexDirection: "column"}}>
            {messages.length == 0 ? <Typography align="center" variant="subtitle1">Ancora nessun messaggio... Comincia tu!</Typography> : messages.map((msg, index) => <ChatBubble
                key={index} text={msg.text}
                userObj={msg.user && msg.user._id===senderUser._id ? null : msg.user}
                timestamp={msg.timestamp} 
            />)}
        </Box>
        <Box sx={{marginBottom: 1, p: 1, borderRadius: '10px 10px 0 0', backgroundColor: '#FF6D2E', display: "flex", alignItems: "center" }}>{
            !!group.artist ? <><Avatar sx={{ width: 64, height: 64, m:1 }} src={group.artist.image}></Avatar><Typography variant="h4">{group.artist.name}</Typography></> :
            !!group.event ? <><Avatar sx={{ width: 64, height: 64, m:1 }} src={group.event.tour.image}></Avatar><Box><Typography variant="h5">{group.event.tour.name} - {group.event.city}</Typography><Typography variant="subtitle1">{new Date(group.event.date).toLocaleDateString()}</Typography></Box></> : null
        }</Box>
    </Box>
}