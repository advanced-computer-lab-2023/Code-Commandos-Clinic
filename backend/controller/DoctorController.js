const AppointmentModel = require('../model/Appointment')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

//requirement 38
//search for a doctor by name and/or speciality
const searchByNameAndOrSpeciality = asyncHandler( async (req,res) => {
    const {name,speciality} = req.body
    let query = {}
    if(name && speciality){
        query = {
            $and: [
                { name: { $regex: new RegExp(name, 'i') } },
                { speciality: { $regex: new RegExp(speciality, 'i') } },
            ],
        };
    }
    else if(name){
        query = {name: {$regex: new RegExp(name, 'i')}};
    }
    else if (speciality) {
        query = { speciality: { $regex: new RegExp(speciality, 'i') } };
    }
    else {
        res.status(400)
        throw new Error('You need to provide name and speciality or at least one of them')
    }
    try {
        const doctors = await DoctorModel.find(query);
        if (doctors.length === 0){
            res.status(404)
            throw new Error('No doctors found!')
        }
        res.status(200).json(doctors)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const createDoctor = asyncHandler(async (req,res) =>{
    const doctorBody = req.body
    try {
        const doctor = await DoctorModel.create(doctorBody)
        res.status(200).json(doctor)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})


//req41
// view all details of selected doctor including specilaty, affiliation (hospital), educational background
const viewDoctor = asyncHandler(async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid mongoose id!')
    }
    try {
        const doctor = await DoctorModel.findById(id).select('-password')
        if(!doctor){
            throw new Error('Doctor not found')
        }
        res.status(200).json(doctor)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

//ziad: requirement 14
//update doctor's email, hourlyRate, affiliation
//function updates a doctor's email, hourlyRate, affiliation using an ID
const updateDoctor = asyncHandler(async (req, res) => {
    const { id, email, hourlyRate, affiliation } = req.body
    try{
        let query = {}
        if(email){
            query.email = email
        }
        if(hourlyRate){
            query.hourlyRate = hourlyRate        
        }
        if(affiliation){
            query.affiliation = affiliation
        }
        if(!email && !hourlyRate && !affiliation){
            throw new Error('You need to provide a new email, hourly rate or affiliation to continue')
        }
        const doctor = await DoctorModel.findOneAndUpdate({_id: id}, {...query})
        if (!doctor) {
            res.status(400)
            throw new Error('Doctor not found')
        }
        res.status(200).json(doctor)
    } 
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

//req39
//filter  a doctor by speciality and/or availability on a certain date and at a specific time
//A doctor is available ona certain date if he/she has no Appointment where the given date is in between the start and end time of that given date
const filterBySpecialityAndDate = asyncHandler(async (req,res) => {
    const {speciality,date} = req.body
    let doctorsBySpeciality
    let nonFreeAppointments
    let doctorsWhoHaveAppointmentsOnTheDate
    let freeDoctors
    if(speciality && date){
        try {
            doctorsBySpeciality = await DoctorModel.find({speciality})
            const doctorsIds = doctorsBySpeciality.map((doctor) => doctor.id)
            nonFreeAppointments = await AppointmentModel.find({
                doctor: {$in: doctorsIds},
                startTime: {$lte: date},
                endTime: {$gte: date},
                status: "PENDING"
            })
            doctorsWhoHaveAppointmentsOnTheDate = nonFreeAppointments.map((appointment) => appointment.doctor)
            freeDoctors = doctorsBySpeciality.filter((doctor) => !doctorsWhoHaveAppointmentsOnTheDate.some((appointmentDoctorId) => appointmentDoctorId.equals(doctor.id)))
        }
        catch (error){
            throw new Error(error.message)
        }
    }
    else if(speciality){
        try {
            freeDoctors = await DoctorModel.find({speciality})
            res.status(200).json(freeDoctors)
        }
        catch (error){
            throw new Error(error.message)
        }
    }
    else if(date){
        try {
            const doctors = await DoctorModel.find()
            nonFreeAppointments = await AppointmentModel.find({
                startTime: {$lte: date},
                endTime: {$gte: date},
                status: "PENDING"
            })
            doctorsWhoHaveAppointmentsOnTheDate = nonFreeAppointments.map((appointment) => appointment.doctor)
            freeDoctors = doctors.filter((doctor) =>
                !doctorsWhoHaveAppointmentsOnTheDate.some((appointmentDoctorId) => appointmentDoctorId.equals(doctor.id))
            )

        }
        catch (error){
            throw new Error(error.message)
        }
    }
    res.status(200).json(freeDoctors)
})

module.exports = {
    searchByNameAndOrSpeciality,
    createDoctor,
    viewDoctor,
    filterBySpecialityAndDate,
    updateDoctor
}
