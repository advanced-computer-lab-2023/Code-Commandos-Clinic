import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

import { SocketContext } from '../Context';

const VideoPlayer = () => {
    const [user, setUser] = useState({})

    useEffect(()=>{
        const fetchUser = async () => {
            const response = await fetch('/api/user/getUser')
            if(response.ok)
                setUser(await response.json())
            else
                alert(await response.text())
        }
        fetchUser()
    },[])

    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    
    const video = {
        width: '550px',
    }
    const gridContainer = {
        justifyContent: 'center',
    }
    const paper = {
        padding: '10px',
        //border: '2px solid black',
        margin: '0px',
        top: '-40px',
    }
            
    return (
        <div>
            <Grid container style={gridContainer}>
                {stream && (
                    <Paper className="card mt-5 border-danger box" style={paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{ user.name }</Typography>
                            <video playsInline muted ref={myVideo} autoPlay className="video" style={video}/>
                        </Grid>
                    </Paper>
                )}
                {callAccepted && !callEnded && (
                    <Paper className="card mt-5 border-danger box" style={paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{ call.name || 'Name' }</Typography>
                            <video playsInline ref={userVideo} autoPlay className="video" style={video}/>
                        </Grid>
                    </Paper>
                )}
            </Grid>
        </div>
    )
}

export default VideoPlayer