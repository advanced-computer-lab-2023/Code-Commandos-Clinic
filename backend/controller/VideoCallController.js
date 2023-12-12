const VideoCallModel = require('../model/VideoCall');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const PatientModel = require('../model/Patient')
const DoctorModel = require('../model/Doctor')

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

module.exports = {
  getVideoCall,
  addVideoCall,
  deleteVideoCall,
  setSocketID
};
