const asyncHandler = require('express-async-handler')
const DoctorModel = require("../model/Doctor");
const PatientModel = require('../model/Patient');
const AppointmentModel = require('../model/Appointment');

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
                            startTime: {$lte: appointmentBody.startTime},
                            endTime: {$gte: appointmentBody.startTime},
                        },
                        {
                            startTime: {$gte: appointmentBody.startTime},
                            endTime: {$lte: appointmentBody.endTime},
                        },
                        {
                            startTime: {$lte: appointmentBody.endTime},
                            endTime: {$gte: appointmentBody.startTime},
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
const getUpcomingPatientsOfDoctor = asyncHandler (async (req,res)=>{
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
        const patientIds = upcomingAppointments.map(appointment => appointment.patient);
        const upcomingPatients = await PatientModel.find({ _id: { $in: patientIds } });
        res.status(200).json(upcomingPatients);
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
            const previousAppointments = await AppointmentModel.find(query)
            res.status(200).json(previousAppointments)
          }
          catch (err){
            res.status(400)
            throw new Error(err.message)
          }
}


})


const getAppointmentsByDateAndStatus = asyncHandler( async (req , res) => {
    try {
        const {appointmentDate,status} = req.params
        const _appointmentDate = new Date(appointmentDate)
        const _appointmentDateEnd = new Date(_appointmentDate)
        _appointmentDateEnd.setHours(23)
        _appointmentDateEnd.setMinutes(59)
        const appointmentsAvailable = await AppointmentModel.find({startTime:{$gte:_appointmentDate,$lte:_appointmentDateEnd}, status:status})

        if(appointmentsAvailable.length == 0){
            res.status(404)
            throw new Error('No appointments found')
        }
        res.status(200).json(appointmentsAvailable)
    }
    catch (error){
        res.status(400)
        //alert(error.message)
        throw new Error(error.message)
    }
})

const getAppointments = asyncHandler( async (req , res) => {
    //const {appointmentDate,status} = req.params
    const appointmentsAvailable = await AppointmentModel.find({})

    if(appointmentsAvailable.length == 0){
        res.status(404)
        throw new Error('No appointments found')
    }
    res.status(200).json(appointmentsAvailable)
})


const createFollowUp = asyncHandler( async (req,res) => {
    const {startTime,endTime,doctorpatient}=req.body;
    const {doctorName,patientName,patient}=doctorpatient;
    const doctor =req.user.id;

    try {
        operlappingAppointment = await AppointmentModel.findOne({
            $and: [
                {
                    $or: [
                        {
                            doctor: doctor
                        },
                        {
                            patient: patient
                        }
                    ]
                },
                {
                    $or: [
                        {
                            startTime: {$lte: startTime},
                            endTime: {$gte: startTime},
                        },
                        {
                            startTime: {$gte: appointmentBody.startTime},
                            endTime: {$lte: endTime},
                        },
                        {
                            startTime: {$lte: endTime},
                            endTime: {$gte: startTime},
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
        const appointment = await AppointmentModel.create({
            patient: patient,
            doctor: doctor ,
            doctorName: doctorName ,
            patientName: patientName,
            startTime: startTime,
            endTime: endTime,
          });
          await appointment.save()
          res.status(200).json(appointment);
        
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {
    getUpcomingPatientsOfDoctor,
    createAppointment,
    getAppointment,
    getAppointments,
    getAppointmentsByDateAndStatus,
    createFollowUp
};
