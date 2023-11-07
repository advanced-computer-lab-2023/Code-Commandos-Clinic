const asyncHandler = require('express-async-handler')
const DoctorModel = require("../model/Doctor");
const PatientModel = require('../model/Patient');
const AppointmentModel = require('../model/Appointment');

const createAppointment =asyncHandler( async (req,res) => {
    const appointmentBody = req.body
    let operlappingAppointment
    const currentDateTime = new Date();
    console.log(currentDateTime)
    const convertedStartTime = new Date(appointmentBody.startTime)
    console.log(convertedStartTime)
    if(currentDateTime >= convertedStartTime){
        res.status(400)
        throw new Error("The appointment has to start and end in the future")
    }

    if(appointmentBody.startTime >= appointmentBody.endTime){
        res.status(400)
        throw new Error("Start time has to be greater than end time")
    }

    try {
        operlappingAppointment = await AppointmentModel.findOne({
            $and: [
                {
                    doctor: req.user.id,
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

            ]
        })
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
    if (operlappingAppointment){
        res.status(400)
        throw new Error('The appointment overlapps with another appointment')
    }
    try {
        appointmentBody.doctor = req.user.id
        const appointment = await AppointmentModel.create(appointmentBody)
        const doctor = await DoctorModel.findById(appointment.doctor)
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
            { doctor : doctorid },
            {status: "RESERVED"}
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

const viewAvailableAppointmentsOfDoctor = asyncHandler(async (req,res) => {
    const {doctorId} = req.params
    try {
        const availableAppointments = await AppointmentModel.find({doctor:doctorId,status:'FREE'})
        console.log(availableAppointments)
        console.log(doctorId)
        console.log("hello")
        res.status(200).json(availableAppointments)
        console.log("after")
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const reserveAppointment = asyncHandler(async (req,res) => {
    const {id , familyMemberId} = req.body
    try {
        const appointment = await AppointmentModel.findById(id)
        appointment.patient = req.user.id
        if(familyMemberId){
            appointment.familyMember = familyMemberId
        }
        appointment.status = 'RESERVED'
        await appointment.save()
        res.status(200).json(appointment)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }


})

const upcomingPastAppointmentsOfDoctor = asyncHandler(async (req,res) => {
    try {
        const upcomingAppointments = await AppointmentModel.find({doctor:req.user.id,status:'RESERVED'})
        const pastAppointments = await AppointmentModel.find({doctor:req.user.id,status:'COMPLETED'})
        res.status(200).json({upcoming: upcomingAppointments, past: pastAppointments})
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const upcomingPastAppointmentsOfPatient = asyncHandler(async (req,res) => {
    try {
        const upcomingAppointments = await AppointmentModel.find({patient:req.user.id,status:'RESERVED'})
        const pastAppointments = await AppointmentModel.find({patient:req.user.id,status:'COMPLETED'})
        res.status(200).json({upcoming: upcomingAppointments, past: pastAppointments})
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const filterAppointmentsByDateOrStatus = asyncHandler(async (req,res) => {
    const {date,status} = req.params
    var query
    const _appointmentDate = new Date(date)
    const _appointmentDateEnd = new Date(_appointmentDate)
    _appointmentDateEnd.setHours(23)
    _appointmentDateEnd.setMinutes(59)
    if (date != "none" && status != "none") {
        query = {
            $or: [
                {startTime:{$gte:_appointmentDate,$lte:_appointmentDateEnd}},
                {status: status}
            ]
        }
    }
    else if (date != "none") {
        query = {startTime:{$gte:_appointmentDate,$lte:_appointmentDateEnd}}
    }
    else if (status != "none") {
        query = {status : status};
    }
    try {
        const appointments = await AppointmentModel.find(query);
        res.status(200).json(appointments)
    }
    catch (error){
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
    viewAvailableAppointmentsOfDoctor,
    reserveAppointment,
    upcomingPastAppointmentsOfDoctor,
    upcomingPastAppointmentsOfPatient,
    filterAppointmentsByDateOrStatus
};
