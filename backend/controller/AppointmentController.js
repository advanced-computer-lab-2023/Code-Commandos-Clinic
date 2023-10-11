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

const getAppointment = asyncHandler( async (req , res) => {
    try {
        const {appointmentDate,status} = req.params
        const _appointmentDate = new Date(appointmentDate)
        const _appointmentDateEnd = new Date(_appointmentDate)
        _appointmentDateEnd.setHours(23)
        _appointmentDateEnd.setMinutes(59)
        const appointmentsAvailable = await Appointment.find({startTime:{$gt:_appointmentDate}, endTime:{$lt:_appointmentDateEnd}, status:status})

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
    const appointmentsAvailable = await Appointment.find({})

    if(appointmentsAvailable.length == 0){
        res.status(404)
        throw new Error('No appointments found')
    }
    res.status(200).json(appointmentsAvailable)
})

module.exports = {
    createAppointment,
    getAppointment,
    getAppointments
};
