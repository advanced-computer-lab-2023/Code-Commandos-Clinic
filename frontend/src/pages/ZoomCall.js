import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { Phone, PhoneDisabled } from '@mui/icons-material';
import axios from 'axios';

async function getMeetings(accessToken){
    try{
        const response = await axios.get('/api/videoCall/getMeetings', {accessToken});
        const data = response.data;
        return data;
    }catch(error){
        console.error('Error',error);
    }
}

async function createMeeting(patientId, doctorId,callerName,accessToken){
    try{
        const response = await axios.post('/api/videoCall/createMeeting',{
            patientId:patientId,
            doctorId:doctorId,
            callerName,
            accessToken
        });
        const body = response.data;
        return body;
    }catch(error){
        console.error('Error',error);
    }
}

const ZoomCall = () => {
    const [doctors, setDoctors] = useState(null)
    const [patients, setPatients] = useState(null)
    const [doctorId, setDoctorId] = useState('')
    const [patientId, setPatientId] = useState('')
    const [videoCall, setVideoCall] = useState(null)
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [accessTokenFetched, setAccessTokenFetched] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        const fetchAccessToken = async() => {
            try {
                const response = await axios.post('/api/videoCall/authZoomAPI',{code:authorizationCode})
                if (response.status===200)
                    setAccessToken(await response.data)
            }
            catch {}
        }
        
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/api/doctor/getPatientDoctors')
                if (response.ok)
                    setDoctors(await response.json())
                else
                    alert(await response.text())
            }
            catch {}
        }

        const fetchPatients = async () => {
            try {
                const response = await fetch('/api/patient/getPatientsOfADoctor')
                if (response.ok)
                    setPatients(await response.json())
                else
                    alert(await response.text())
            }
            catch {}
        }

        const fetchUser = async () => {
            try {
            const response = await fetch('/api/user/getUser')
            if(response.ok)
                setUser(await response.json())
            else
                alert(await response.text())
            } 
            catch {}
        }

        const checkForCall = async () => {
            try {
                const response = await fetch('/api/videoCall/getVideoCall')
                if(response.ok)
                    setVideoCall(await response.json())
                else
                    setVideoCall(null)
            }
            catch {}
        }

        if(!accessToken && authorizationCode){
            fetchAccessToken()
        }

        !user && fetchUser()
        user && checkForCall()

        if(user && user.role === 'PATIENT')
            !doctors && fetchDoctors()
        else if(user)
            !patients && fetchPatients()
    }, [user])

    const handleCall = async () => {
        if(accessToken){
            const newMeeting = await createMeeting(patientId, doctorId, user.name, accessToken);
            console.log(newMeeting);
            window.location.href = newMeeting.join_url
        } else {
            window.location.href = 'https://zoom.us/oauth/authorize?response_type=code&client_id=8Gs0wnGbSwuTxfxKrwo5Q&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FZoomCall'
        }
    }

    const handleSignIn = () => {
        console.log("hello")
        window.location.href = 'https://zoom.us/oauth/authorize?response_type=code&client_id=8Gs0wnGbSwuTxfxKrwo5Q&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FZoomCall'
    }

    const handleAnswer = async () => {
        try {
            await axios.delete('/api/videoCall/deleteVideoCall')
        }
        catch(error){}
        window.location.href = videoCall.join_url
    }

    // STYLES
    const root = {
        display: 'flex',
        flexDirection: 'column',
    }
    const gridContainer = {
        width: '100%',
    }
    const container = {
        width: '50%',
        margin: '35px 25%',
        padding: 0,
        alignItems: 'center'
    }
    const margin = {
        marginTop: 20,
    }
    const margin2 = {
        marginTop: 9,
    }
    const padding = {
        padding: 20,
    }
    const paper = {
        padding: '10px 20px',
        //border: '2px solid black',
        top: '0px'
    }
    const loading = {
        alignSelf: 'center'
    }

    const zoomStatus = accessToken?<span style={{color:"green"}}>Signed In</span>:<span style={{color:"red"}}>Not Signed In</span>

    return (
        <Container style={container}> 
            <h2 className="mb-4">
                <hr className="lineAround"></hr>Create a Zoom Meeting
                <hr className="lineAround"></hr>
            </h2>
            {!user || !(doctors || patients)?<h1 style={loading}>Loading...</h1>:<div>
            {videoCall && 
                <div>
                <h3 style={loading}>You are receiving a call from {user.role==="PATIENT"? "a doctor" : "a patient"} (&nbsp;
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} onClick={()=>{handleAnswer()}} >
                    Answer
                </Button>&nbsp;)
                </h3>
                </div>
            }
            <Paper elevation={10} className="card mt-5 border-danger box" style={paper}>
                <form style={root} noValidate autoComplete="off">
                    <Grid container style={gridContainer}>
                        <Grid item xs={12} md={6} style={padding}>
                            <Typography gutterBottom variant="h6">Account Info</Typography>
                            <Typography gutterBottom variant="h7">Name: {user && user.name}</Typography><br/>
                            <Typography gutterBottom variant="h7">Zoom Status: {zoomStatus}</Typography>
                            {!accessToken && <Button variant="contained" color="primary" fullWidth onClick={() => {handleSignIn()}} style={margin2}>Sign In</Button>} 
                        </Grid>
                        <Grid item xs={12} md={6} style={padding}>
                            <Typography gutterBottom variant="h6">Select a {user && user.role==='PATIENT'?<span>Doctor</span>:<span>Patient</span>}</Typography>
                            { user && user.role==='PATIENT'?
                                <select
                                    id="doctor"
                                    name="doctor"
                                    value={doctorId}
                                    onChange={(e) => {
                                        setDoctorId(e.target.value);
                                    }}
                                    className="form-control input-danger"
                                    required
                                >
                                    <option value="">Select a doctor</option>
                                    {doctors && doctors.map((doctor) => (
                                        <option key={doctor._id} value={doctor._id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            :
                                <select
                                    id="patient"
                                    name="patient"
                                    value={patientId}
                                    onChange={(e) => {
                                        setPatientId(e.target.value);
                                    }}
                                    className="form-control input-danger"
                                    required
                                >
                                    <option value="">Select a patient</option>
                                    {patients && patients.map((patient) => (
                                        <option key={patient._id} value={patient._id}>
                                            {patient.name}
                                        </option>
                                    ))}
                                </select>
                            }
                            <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => {handleCall()}} style={margin}>
                                Call
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>}</Container>
    )
}

export default ZoomCall