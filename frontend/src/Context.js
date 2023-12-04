import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('http://localhost:4000/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef({});
  const userVideo = useRef({});
  const connectionRef = useRef({});

  useEffect(() => {
    socket.on('me',async (id) => {
      setMe(id); 
      try{
        const response = await axios.put('/api/videoCall/setSocketID',{socketID:id})
        console.log(await response.data)
      } catch (error) {
        // do nothing (not logged in yet)
      }
    });

    socket.on('callUser', ({ from, name, signal }) => {
      setCall({ isReceivingCall: true, from, name, signal });
      console.log(JSON.stringify({ isReceivingCall: true, from, name}))
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;
    });
      
  }, []);

  const answerCall = async () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      try{
        socket.emit('answerCall', { signal: data, to: call.from });
        socket.on('callEnded', ()=> {
          window.location.reload();
        })
      } catch (error) {
        window.location.reload()
      }
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    try{
      peer.signal(call.signal);
    }
    catch(error){
      alert("Other side lost connection");
      const response = await axios.delete('/api/videoCall/deleteVideoCall')
      if(response.status===200)
        window.location.reload()
    }
    connectionRef.current = peer;

    try {
      const response = await axios.delete('/api/videoCall/deleteVideoCall')
    }
    catch(error){}
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      try {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: name });
      } catch (error) {
        window.location.reload()
      }
      console.log(JSON.stringify({ userToCall: id, from: me, name: name }))
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("callEnded")
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };