const VideoCallModel = require('../model/VideoCall');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const PatientModel = require('../model/Patient')
const DoctorModel = require('../model/Doctor')
require('dotenv').config()
const axios = require('axios');
const { NextWeek } = require('@material-ui/icons');

const getVideoCall = asyncHandler(async (req, res) => {
  const id  = req.user.id;
  if(!mongoose.Types.ObjectId.isValid(id) ){
    throw new Error('Invalid id format')
  }
  try {
    var videoCall;
    if(req.user.role === 'PATIENT')
      videoCall = await VideoCallModel.findOne({ patient: id })
    else
      videoCall = await VideoCallModel.findOne({ doctor: id })
    res.status(200).json(videoCall);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteVideoCall = asyncHandler(async (req, res) => {
  const id  = req.user.id;
  const { videoCallID } = req.body
  if(!mongoose.Types.ObjectId.isValid(id) ){
    throw new Error('Invalid id format')
  }
  try {
    var videoCall;
    if( videoCallID )
      videoCall = await VideoCallModel.findOneAndDelete({ _id: videoCallID })
    else if(req.user.role === 'PATIENT')
      videoCall = await VideoCallModel.findOneAndDelete({ patient: id })
    else
      videoCall = await VideoCallModel.findOneAndDelete({ doctor: id })
    res.status(200).json(videoCall);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addVideoCall = asyncHandler(async (req, res) => {
  try {
    const existingVideoCall1 = await VideoCallModel.findOneAndDelete({patient: req.body.patient});
    const existingVideoCall2 = await VideoCallModel.findOneAndDelete({doctor: req.body.doctor});
    const newVideoCall = await VideoCallModel.create(req.body);
    const patient = await PatientModel.findById(newVideoCall.patient)
    const doctor = await DoctorModel.findById(newVideoCall.doctor)
    console.log(newVideoCall)
    newVideoCall.patientName = patient.name
    newVideoCall.doctorName = doctor.name
    await newVideoCall.save()
    res.status(200).json(newVideoCall);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const setSocketID = asyncHandler(async (req,res) => {
  const { id, role } = req.user;
  try{
    var videoCall;
    if(role === 'PATIENT')
      videoCall = await VideoCallModel.findOneAndUpdate({patient: id},{patientSocketID: req.body.socketID})
    else
      videoCall = await VideoCallModel.findOneAndUpdate({doctor: id},{doctorSocketID: req.body.socketID})
    res.status(200).json(videoCall)
  }
  catch (error) {
      res.status(400)
      throw new Error(error.message)
  }
})

const authZoomAPI = asyncHandler(async (req,res) => {
  const code = req.body.code;
  const data = encodeURI(`grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`);

  try{
    const response = await axios.post('https://zoom.us/oauth/token',data,{
      headers:{
        'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
      }
    });
    if(response.status===200)
      res.send(response.data.access_token)
    else
      res.status(400).json(response.data)
  }catch(error){
    res.status(400).json(error.message)
  }
})

const getMeetings = asyncHandler(async (req,res) => {
  const accessToken = req.body.accessToken
  try{
    const response = await axios.get('https://api.zoom.us/v2/users/me/meetings',{
      headers:{
        'Authorization':`Bearer ${accessToken}`
      }
    });
    const data = response.data;
    if(response.status===200)
      res.send(data)
    else
      res.status(400).json(data)
  }catch(error){
      console.error('Error',error);
      res.status(400).json(error.message)
  }
})

const createMeeting = asyncHandler(async (req,res) => {
  const { doctorId, patientId, accessToken } = req.body
  try{
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings',{
      topic: 'Virtual Clinic Meeting',
      type: 2,
      start_time: (new Date()).toUTCString(),
      duration: 60,
      timezone: 'UTC',
      agenda: doctorId || patientId,
      settings:{
        host_video:true,
        participant_video:true,
        join_before_host:true,
        mute_upon_entry:true,
        watermark:false,
        use_pmi:false,
        approval_type:0,
        audio:'both',
        auto_recording:'none'
      }
    },{
      headers:{
        'Authorization':`Bearer ${accessToken}`
      },
    });
    const body = response.data;
    if(!patientId || patientId === "")
      await VideoCallModel.create({join_url:body.join_url, doctor: doctorId});
    else
      await VideoCallModel.create({join_url:body.join_url, patient: patientId});
    res.send(body)
  }catch(error){
      console.error('Error',error);
  }
})

module.exports = {
  getVideoCall,
  addVideoCall,
  deleteVideoCall,
  setSocketID,
  authZoomAPI,
  getMeetings,
  createMeeting
};
