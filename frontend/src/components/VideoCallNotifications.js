import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { SocketContext } from '../Context';
import axios from 'axios';

const VideoCallNotifications = ({user}) => {
  const { me, setName, answerCall, call, callAccepted } = useContext(SocketContext);

  const [ videoCall, setVideoCall ] = useState(null)

  useEffect(() => {
    const fetchVideoCall = async () => {
      const response = await fetch('/api/videoCall/getVideoCall')
      if (response.ok) {
        setVideoCall(await response.json())
      }    
      else
        alert(await response.text())
    }
    fetchVideoCall()
  },[])

  const handleAnswer = async () => { 
    try{
      const delay = ms => new Promise(res => setTimeout(res, ms));
      if(user.role==='PATIENT')
        await setName(videoCall.patientName)
      else
        await setName(videoCall.doctorName)
      await delay(2000) 
      answerCall()
    }
    catch(error){
      alert("Other side lost connection");
      const response = await axios.delete('/api/videoCall/deleteVideoCall')
      if(response.status===200)
        window.location.reload()
    }
  }

  return (
    <>
      {/* {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )} */}
      { videoCall && !callAccepted &&
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{user.role=='DOCTOR'?videoCall.patientName:videoCall.doctorName} is calling:</h1>
          <Button variant="contained" color="primary" onClick={handleAnswer}>
            Answer
          </Button>
        </div> 
      }
    </>
  );
};

export default VideoCallNotifications;