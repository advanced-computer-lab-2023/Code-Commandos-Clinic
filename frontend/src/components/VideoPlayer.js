import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

import { SocketContext } from '../Context';

const VideoPlayer = () => {

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
                            <Typography variant="h5" gutterBottom>{  }</Typography>
                            <video playsInline muted ref={myVideo} autoPlay className="video" style={video}/>
                        </Grid>
                    </Paper>
                )}
                {callAccepted && !callEnded && (
                    <Paper className="card mt-5 border-danger box" style={paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{  }</Typography>
                            <video playsInline ref={userVideo} autoPlay className="video" style={video}/>
                        </Grid>
                    </Paper>
                )}
            </Grid>
        </div>
    )
}

export default VideoPlayer