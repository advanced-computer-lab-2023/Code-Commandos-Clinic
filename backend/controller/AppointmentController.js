const AppointmentModel = require('../model/Appointment')
const asyncHandler = require('express-async-handler')
const DoctorModel = require("../model/Doctor");
const PatientModel = require('../model/Patient');
const Appointment = require('../model/Appointment');

const createAppointment =asyncHandler( async (req,res) => {
    const appointmentBody = req.body
    let operlappingAppointment
    try {
        operlappingAppointment = await AppointmentModel.findOne({
            $and: [
                {
                    $or: [
                        {
                            doctor: appointmentBody.doctor
                        },
                        {
                            patient: appointmentBody.patient
                        }
                    ]
                },
                {
                    $or: [
                        {
                            startTime: {$lte: appointmentBody.endTime},
                            endTime: {$gte: appointmentBody.startTime},
                        },
                        {
                            startTime: {$gte: appointmentBody.startTime},
                            endTime: {$gte: appointmentBody.endTime},
                        },
                        {
                            startTime: {$lte: appointmentBody.startTime},
                            endTime: {$gte: appointmentBody.endTime},
                        },
                    ]
                }
                ,
                {
                    status: "PENDING",
                }
            ]
        })
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
    if (operlappingAppointment){
        res.status(400)
        throw new Error('The appointment overlapps with another appointment with the doctor/patient')
    }
    try {
        const appointment = await AppointmentModel.create(appointmentBody)
        const patient = await PatientModel.findById(appointment.patient)
        const doctor = await DoctorModel.findById(appointment.doctor)
        appointment.patientName = patient.name
        appointment.doctorName = doctor.name
        await appointment.save()
        res.status(200).json(appointment)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})


//requirement 35
// get the upcoming appointments of a doctor
const getUpcomingAppointments = asyncHandler (async (req,res)=>{
    const {doctorid} = req.params
    const currentDate = new Date();
    let query = {
        $and: [
            { startTime : { $gt : currentDate } },
            { doctor : doctorid }
        ]
    }
    console.log(currentDate)
    try{
    const upcomingAppointments = await AppointmentModel.find(query)
    if(upcomingAppointments.length===0){
        throw new Error("No Upcoming Appointments")
       }
       res.status(200).json(upcomingAppointments);    
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }

})

const getAppointment = asyncHandler (async (req,res)=>{
    
   
        let query={};
        const currentDate = new Date();
        if(req.params.doctor !=="none" && req.params.doctor !=="none"){
            const {doctorid,patientid} =req.params
           query={
            $and:[
                {doctor: doctorid},
                {patient: patientid},
                { startTime : { $lt : currentDate } }
                ]
                
         };
         try {
            const previousAppointments = await Appointment.find(query)
            res.status(200).json(previousAppointments)
          }
          catch (err){
            res.status(400)
            throw new Error(err.message)
          }
}


})




module.exports = {
    createAppointment,
    getUpcomingAppointments,
    getAppointment
};