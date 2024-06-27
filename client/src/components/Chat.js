import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ChatBubble from "./ChatBubble";
import { Typography, Avatar } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';
import MusicNoteSharpIcon from '@mui/icons-material/MusicNoteSharp';
import Button from "@mui/material/Button";
import { io } from 'socket.io-client';
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserDetails } from "../hooks/users";
import { useGroup } from "../hooks/groups";
//import GroupDetails from "./GroupDetails";
import CustomSkeleton from './CustomSkeleton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function Chat({type}) {
    const [cookies, setCookie, removeCookie] = useCookies('token');
    const senderUser = useUserDetails()
    const navigate = useNavigate();

    //id Artista o Evento, conosciuti nel resto del frontend
    const entity_id = useParams().id  // id artista o concerto
    const group = useGroup(type, entity_id)

    const [message, setTextbox] = useState("")
    const [messages, setMessages] = useState([])
    //const [showGroupDetails, setShowGroupDetails] = useState(false);

    const messagesEndRef = useRef(null)  // useRef per scrollare automaticamente alla fine della chat

    const [socket, setSocket] = useState(null)
    if (!!group && !socket) setSocket( io("//spotimeet.fedele.website/?group="+group._id, {
        withCredentials: true,
        extraHeaders: {
            "Authorization": cookies.token
        }
    }) )

    useEffect(() => {
        if (!!!socket) return
        function handleNewMessage(data) {
            return setMessages( current => [...current, data] );
        }
        function handleHistory(data) {
            return setMessages( current => [...current, ...data] );
        }
        socket.on("message", handleNewMessage);
        socket.on("history", handleHistory);
        return () => {
            socket.off("message", handleNewMessage);
            socket.off("history", handleHistory);
        };
    }, [socket])

    function handleSend() {
        if (!message || !socket) return;
        socket.emit("message", message);
        // replica schema del DB direttamente sul client, nessun feedback
        setMessages([...messages, {text: message, user: null, timestamp: new Date()}]);
        setTextbox("");
    };

    useEffect(()=>{
        messagesEndRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(()=>{ console.log(group,type, entity_id)}, []);

    if (!senderUser || !group) return <CustomSkeleton></CustomSkeleton>
    

    return (
    <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        m: "0px",
    }}>
        <form onSubmit={(e)=>{e.preventDefault(); handleSend()}}>
            <Box sx={{display: 'flex', flexDirection: 'row', maxWidth: "100%", padding:'0px', margin:'10px', border: '2px solid #FF6D2E', borderRadius:'50px'}}>
                <TextField autoFocus fullWidth placeholder="Scrivi un messaggio..." onChange={(e)=>{setTextbox(e.target.value)}} value={message} sx={{padding:'0 10 0 0', marginLeft: '20px','& .MuiOutlinedInput-root': {'& fieldset': { borderColor: 'transparent' },'&:hover fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: 'transparent' },},}}></TextField>
                {/* <Button sx={{margin: '0px'}}> <MusicNoteSharpIcon /> </Button> */}
                <Button type="submit" sx={{marginRght:'20px'}}> <SendIcon /> </Button>
            </Box>
        </form>
        <Box ref={messagesEndRef} sx={{overflowY: "scroll", flexGrow: 1, display: "flex", flexDirection: "column"}}>
            { messages.length == 0
                ? <Typography align="center" variant="subtitle1">Ancora nessun messaggio... Comincia tu!</Typography>
                : messages.map((msg, index) => <ChatBubble
                    key={index} text={msg.text}
                    userObj={msg.user && msg.user._id===senderUser._id ? null : msg.user}
                    timestamp={msg.timestamp} 
                />)
            }
        </Box>
        <Box sx={{marginBottom: 1, p: 1, borderRadius: '10px 10px 0 0', backgroundColor: '#FF6D2E'}}>
            <Box sx={{marginBottom: 1, p: 1, borderRadius: '10px 10px 0 0', backgroundColor: '#FF6D2E', display: "flex", alignItems: "center" }}>{
                !group.event ? <>
                    <Avatar sx={{ width: 80, height: 80 }} src={group.artist.image}></Avatar>
                    <Typography variant="h4">{group.artist.name}</Typography>
                </> :
                !!group.event ? <>
                    <Avatar sx={{ width: 80, height: 80 }} src={group.event.tour.image}></Avatar>
                    <Box sx={{m:1}}>
                        <Typography variant="h5">{group.artist.name} - {group.event.city}</Typography><Typography variant="subtitle1">{new Date(group.event.date).toLocaleDateString()} | {group.event.tour.name}</Typography>
                    </Box>
                </> : null
            }</Box>
            <Stack direction="row" spacing={1} sx={{m:1}}>
                {
                    !!group.event
                    ? <>
                        <Chip label="Invita un amico" onClick={()=> {navigator.clipboard.writeText('https://spotimeet.fedele.website/chat/' + (group.event==null ? 'artist/'+group.artist._id : 'event/'+group.event._id))}} />
                        <Chip label="Acquista biglietto" onClick={()=> {window.open(group.event.url, "_blank")}}/>
                        <Chip label="Profilo TicketOne" onClick={()=> {window.open(group.event.tour.url, "_blank")}}/>
                        <Chip label="Spotify" onClick={()=> {window.open(group.artist.url, "_blank")}}/>
                        <Chip label="Artista" onClick={()=> {navigate('/artist/'+group.artist.uri)}}/>
                    </>
                    : <>
                        <Chip label="Invita un amico" onClick={()=> {navigator.clipboard.writeText('https://spotimeet.fedele.website/chat/' + (group.event==null ? 'artist/'+group.artist._id : 'event/'+group.event._id))}} />
                        <Chip label="Spotify" onClick={()=> {window.open(group.artist.url, "_blank")}}/>
                        <Chip label="Artista" onClick={()=> {navigate('/artist/'+group.artist.uri)}}/>
                    </>
                }
            </Stack>
        </Box>
    </Box>
    )
}