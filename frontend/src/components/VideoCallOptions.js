import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { Phone, PhoneDisabled } from '@mui/icons-material';

import { SocketContext } from '../Context';

const VideoCallOptions = ({ children, user }) => {
    const [doctors, setDoctors] = useState(null)
    const [patients, setPatients] = useState(null)
    const [doctorId, setDoctorId] = useState('')
    const [patientId, setPatientId] = useState('')
    //const [doctorSocketId, setDoctorSocketId] = useState('')
    //const [patientSocketId, setPatientSocketId] = useState('')
    const [isCalling, setIsCalling] = useState(false)

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctor/getPatientDoctors')
            if (response.ok)
                setDoctors(await response.json())
            else
                alert(await response.text())
        }

        const fetchPatients = async () => {
            const response = await fetch('/api/patient/getPatientsOfADoctor')
            if (response.ok)
                setPatients(await response.json())
            else
                alert(await response.text())
        }

        if(user.role === 'PATIENT')
            fetchDoctors()
        else
            fetchPatients()
    }, [])

    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    const handleDoctorSelection = async () => {
        if (!doctors)
            return
        for (const doctor of doctors) {
            if (doctorId === doctor._id)
                setIdToCall(doctor.socketID)
        }
    }

    const handleCall = async () => {
        var body = {}
        if(user.role === 'PATIENT') {
            body = { patient: user._id, doctor: doctorId, patientSocketID: me }
            const response = await axios.post('/api/videoCall/addVideoCall', body)
            var json = await response.data
            setIsCalling(true)
            while(!json.doctorSocketID){
                const response2 = await fetch('/api/videoCall/getVideoCall')
                if(response2.ok)
                    json = await response2.json()
            }
            if (json.doctorSocketID){
                callUser(json.doctorSocketID)
            }
        }
        else {
            body = { patient: patientId, doctor: user._id, doctorSocketID: me }
            const response = await axios.post('/api/videoCall/addVideoCall', body)
            var json = await response.data
            setIsCalling(true)
            while(!json.patientSocketID){
                const response2 = await fetch('/api/videoCall/getVideoCall')
                if(response2.ok)
                    json = await response2.json()
            }
            if (json.patientSocketID){
                callUser(json.patientSocketID)
            }
        }
        
        //callUser(doctorSocketId);
    }

    const handleLeaveCall = async () => {
        setIsCalling(false)

        try {
            const response = await axios.delete('/api/videoCall/deleteVideoCall')
        }
        catch(error){}
        
        leaveCall();
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

    }
    const margin = {
        marginTop: 20,
    }
    const padding = {
        padding: 20,
    }
    const paper = {
        padding: '10px 20px',
        //border: '2px solid black',
        top: '-60px'
    }

    return (
        <Container style={container}>
            <Paper elevation={10} className="card mt-5 border-danger box" style={paper}>
                <form style={root} noValidate autoComplete="off">
                    <Grid container style={gridContainer}>
                        <Grid item xs={12} md={6} style={padding}>
                            <Typography gutterBottom variant="h6">Account Info</Typography>
                            <Typography gutterBottom variant="h6">Name: {user.name}</Typography>
                            {/* <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                                    Copy Your ID
                                </Button>
                            </CopyToClipboard> */}
                        </Grid>
                        <Grid item xs={12} md={6} style={padding}>
                            <Typography gutterBottom variant="h6">Select a {user.role==='PATIENT'?<span>Doctor</span>:<span>Patient</span>}</Typography>
                                { user.role==='PATIENT'?
                                    <select
                                        id="doctor"
                                        name="doctor"
                                        value={doctorId}
                                        onChange={(e) => {
                                            setDoctorId(e.target.value); setName(user.name);
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
                                            setPatientId(e.target.value)
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
                            {callAccepted && !callEnded ? ( 
                                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={() => {handleLeaveCall()}} style={margin}>
                                    Hang Up
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => {handleCall()}} style={margin}>
                                    Call
                                </Button>
                            )}
                            {isCalling && !(callAccepted && !callEnded) && <p>Calling {user.role==='PATIENT'?<span>your doctor.</span>:<span>your patient.</span>} Please wait while they answer.</p>}
                            {callEnded && window.location.reload()}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default VideoCallOptions