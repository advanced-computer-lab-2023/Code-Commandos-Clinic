const DoctorPatient = require('../model/DoctorPatient');
const DoctorModel = require('../model/Doctor')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const HealthPackageModel = require('../model/HealthPackage')
const HealthPackagePatientModel = require('../model/HealthPackagePatient')
const PatientModel = require('../model/Patient')

const createDoctorPatients= asyncHandler( async(req,res) =>{
    const {patientUsername,doctorUsername} = req.body
    try{
        const patient = await PatientModel.findOne({username: patientUsername})
        const doctor = await DoctorModel.findOne({username: doctorUsername})
        if(!patient || !doctor){
            res.status(400)
            throw new Error('You have to provide both patient username and doctor username')
        }
        const patientDoctor = {
            patient:patient._id,
            doctor:doctor._id,
            patientName:patient.name,
            doctorName:doctor.name
        }
        const newPatientDoctor = await DoctorPatient.create(patientDoctor)
        res.status(200).json(newPatientDoctor);
    }
    catch(error){
        res.status(400)
        throw new Error(error.message)
    }
})


//requirement 38
//search for a doctor by name and/or speciality
const searchByNameAndOrSpeciality = asyncHandler( async (req,res) => {
    const {name,speciality} = req.params
    let query = {}
    if(name !== "none" && speciality !== "none"){
        query = {
            $and: [
                { name: { $regex: new RegExp(name, 'i') } },
                { speciality: { $regex: new RegExp(speciality, 'i') } },
            ],
        };
    }
    else if(name !== "none"){
        query = {name: {$regex: new RegExp(name, 'i')}};
    }
    else if (speciality !== "none") {
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

const removeDoctor =asyncHandler( async (req,res) => {
    const { id } =req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Doctor not found')
    }
    try {
        const doctor =await DoctorModel.findByIdAndDelete(id)
        if(!doctor){
            res.status(400)
            throw new Error('Doctor not found')
        }
        res.status(200).json(doctor)
    }
    catch (error){
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
//function updates a doctor's info using an ID or username
const updateDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { username, email, hourlyRate, affiliation } = req.body
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
        var doctor;
        if(id) {
            doctor = await DoctorModel.findOneAndUpdate({_id: id}, {...query})
        }
        else {
            doctor = await DoctorModel.findOneAndUpdate({username: username}, {...query})
        }    
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

//for testing
const getDoctors = asyncHandler(async (req, res) => {
    
    try {
      const Doctors = await DoctorModel.find({}).sort({createdAt: -1})
      res.status(200).json(Doctors)
    }
    catch (error){
      res.status(400)
      throw new Error(error.message)
    }
})

// req ID #37
// get the doctor's session price depending on the patient's health package
const getDoctorsSessionPrice = asyncHandler(async (req, res) => {
    const{ id } = req.params

    try {
        // Retrieve all doctors from the database
        const doctors = await DoctorModel.find();

        // Create an array to store the doctor details
        const doctorsList = [];

        // Retrieve the subscribed health package of the patient (if available)
        const healthPackagePatient = await HealthPackagePatientModel.findOne({ patientID: id });
        if(!healthPackagePatient){
            for (const doctor of doctors) {
                const { name, 
                    speciality,
                    hourlyRate,
                } = doctor;
                
                let calculatedSessionPrice = hourlyRate + hourlyRate*0.1
                
                // Add the doctor details with the calculated session price to the doctorsList array
                doctorsList.push({
                    name,
                    speciality,
                    hourlyRate,
                    sessionPrice: calculatedSessionPrice,
                });
            }
        } else {
            const healthPackageID = healthPackagePatient.healthPackageID
            const healthPackage = await HealthPackageModel.findOne({ _id: healthPackageID });
            
            // Iterate over each doctor and calculate the session price based on the subscribed health package
            for (const doctor of doctors) {
                const { name, 
                    speciality,
                    hourlyRate,
                } = doctor;
                
                let calculatedSessionPrice = hourlyRate + hourlyRate*0.1
                
                calculatedSessionPrice = calculatedSessionPrice * ( 1 - healthPackage.doctorSessionDiscount); 
                
                // Add the doctor details with the calculated session price to the doctorsList array
                doctorsList.push({
                    name,
                    speciality,
                    hourlyRate,
                    sessionPrice: calculatedSessionPrice,
                });
            }
        }
        res.status(200).json(doctorsList);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//req39
//filter  a doctor by speciality and/or availability on a certain date and at a specific time
//A doctor is available ona certain date if he/she has no Appointment where the given date is in between the start and end time of that given date
const filterBySpecialityAndDate = asyncHandler(async (req,res) => {
    const {speciality,date} = req.params
    let doctorsBySpeciality
    let nonFreeAppointments
    let doctorsWhoHaveAppointmentsOnTheDate
    let freeDoctors
    if(speciality !== "none" && date !== "none"){
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
    else if(speciality !== "none"){
        try {
            freeDoctors = await DoctorModel.find({speciality})
            res.status(200).json(freeDoctors)
        }
        catch (error){
            throw new Error(error.message)
        }
    }
    else if(date !== "none"){
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

const getDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400)
      throw new Error('Doctor not found')
    }
    try{
      const doctor = await DoctorModel.findById(id)
      if (!doctor) {
        res.status(400)
        throw new Error('Doctor not found')
      }
      res.status(200).json(doctor)
    } catch (error){
      res.status(400)
      throw new Error(error.message)
    }
  })

module.exports = {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor,
    getDoctors,
    viewDoctor,
    filterBySpecialityAndDate,
    getDoctorsSessionPrice,
    removeDoctor,
    createDoctorPatients,
    getDoctor
}
