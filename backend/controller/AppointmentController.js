const AppointmentModel = require('../model/Appointment')
const asyncHandler = require('express-async-handler')
const DoctorModel = require("../model/Doctor");

const createAppointment = asyncHandler(async (req,res) => {
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
                            startTime: {gte: appointmentBody.startTime},
                            startTime: {lte: appointmentBody.endTime},
                        },
                        {
                            startTime: {lte: appointmentBody.startTime},
                            endTime: {gte: appointmentBody.endTime},
                        },
                        {
                            endTime: {gte: appointmentBody.startTime},
                            endTime: {lte: appointmentBody.endTime},
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
        throw new Error('The appointment overlapps with another appointment with the doctor/patient')
    }
    try {
        const appointment = await AppointmentModel.create(appointmentBody)
        res.status(200).json(appointment)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {
    createAppointment
};
