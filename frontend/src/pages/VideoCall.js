import React, { useEffect, useState } from 'react';
import "../css/style.css" 

import VideoPlayer from '../components/VideoPlayer';
import VideoCallNotifications from '../components/VideoCallNotifications';
import VideoCallOptions from '../components/VideoCallOptions';

const VideoCall = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user/getUser')
            if(response.ok){
                const json = await response.json()
                setUser(json)
            }
            else
                alert(await response.text())
        }
        fetchUser()

        var cameraFound = false;
        navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
                if(device.kind === 'videoinput')
                    cameraFound = true;
                console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            });
            if(!cameraFound){
                alert("No camera found")
                window.location.href = "http://localhost:3000/"
                return
            }   
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
        });
    }, [])

    return (
        <div>
            <h2 style={{marginLeft:"20px"}}> Video Call a Doctor </h2>
            { !user && <h2 style={{marginLeft:"20px"}}> LOADING... </h2>}
            <VideoPlayer/> 
            { user && <VideoCallOptions user={user}>
                <VideoCallNotifications user={user}/>
            </VideoCallOptions> }
            { /* TODO: Call notification api to send a notification to the callee */ }
        </div>
    );
}

export default VideoCall;