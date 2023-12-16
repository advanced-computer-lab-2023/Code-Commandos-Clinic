const DoctorPatient = require('../model/DoctorPatient');
const DoctorModel = require('../model/Doctor')
const UserModel = require('../model/User')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const HealthPackageModel = require('../model/HealthPackage')
const HealthPackagePatientModel = require('../model/HealthPackagePatient')
const PatientModel = require('../model/Patient')
const AppointmentModel = require('../model/Appointment')
const bcrypt = require("bcryptjs");

//requirement 67  -> akram
const getAmount = asyncHandler(async (req, res) => {
    
    try {
      un = req.user.username;  
      const doctor = await DoctorModel.findOne({ username : un });
      if (!doctor) {
        res.status(400)
        throw new Error('Doctor not found')
      }
  
      res.status(200).json(doctor.wallet) 
    }
    catch (error) {
      res.status(400)
      throw new Error(error.message)
    }
  });

const createDoctorPatients= asyncHandler( async(req,res) =>{
    const {patientUsername,doctorUsername} = req.body
    try{
        if(!patientUsername || !doctorUsername){
            res.status(400)
            throw new Error('You have to provide both patient username and doctor username')
        }
        const patient = await PatientModel.findOne({username: patientUsername})
        const doctor = await DoctorModel.findOne({username: doctorUsername})
        if(!patient || !doctor){
            res.status(400)
            throw new Error('Invalid doctor/patient')
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

const searchDoctorsToChatClinic = asyncHandler(async (req, res) => {
  const { name, speciality } = req.params;
  let query = {};
  if (name !== "none" && speciality !== "none") {
    query = {
      $and: [
        { name: { $regex: new RegExp(name, "i") } },
        { speciality: { $regex: new RegExp(speciality, "i") } },
      ],
    };
  } else if (name !== "none") {
    query = { name: { $regex: new RegExp(name, "i") } };
  } else if (speciality !== "none") {
    query = { speciality: { $regex: new RegExp(speciality, "i") } };
  } 
  try {
    const doctors = await DoctorModel.find(query);
    let doctorList = []
    for (const doctorJSON of doctors) {
        const doctor = doctorJSON._doc
        const doctorPatient = await DoctorPatient.findOne({doctor: doctor._id, patient: req.user.id})
        if(doctorPatient){
            const user = await UserModel.findOne({username:doctor.username});
            if(user)
                doctorList.push({...doctor,userId:user._id, role:user.role})
        }
    }
    res.status(200).json(doctorList);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const searchDoctorsToChat = asyncHandler(async (req, res) => {
    const { name, speciality } = req.params;
    let query = {};
    if (name !== "none" && speciality !== "none") {
      query = {
        $and: [
          { name: { $regex: new RegExp(name, "i") } },
          { speciality: { $regex: new RegExp(speciality, "i") } },
        ],
      };
    } else if (name !== "none") {
      query = { name: { $regex: new RegExp(name, "i") } };
    } else if (speciality !== "none") {
      query = { speciality: { $regex: new RegExp(speciality, "i") } };
    } 
    try {
      const doctors = await DoctorModel.find(query);
      let doctorList = []
      for (const doctorJSON of doctors) {
        const doctor = doctorJSON._doc
        const user = await UserModel.findOne({username:doctor.username});
        if(user)
            doctorList.push({...doctor,userId:user._id, role:user.role})
      }
      res.status(200).json(doctorList);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});

const createDoctor = asyncHandler(async (req,res) =>{
    const doctorBody = req.body
    try {
        if (doctorBody.password.search(/[a-z]/) < 0 || doctorBody.password.search(/[A-Z]/) < 0 || doctorBody.password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(doctorBody.password,salt)
        const doctor = await DoctorModel.create(doctorBody)
        const user = await UserModel.create({username: doctorBody.username, password: hashedPassword, role:"DOCTOR"})
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
        await UserModel.findOneAndDelete({username:doctor.username})
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
    const { email, hourlyRate, affiliation } = req.body
    const id  = req.user.id
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
        doctor = await DoctorModel.findOneAndUpdate({_id: id}, {...query})    
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
    const { id } = req.user

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
                    affiliation
                } = doctor;
                
                let calculatedSessionPrice = hourlyRate + hourlyRate*0.1
                
                // Add the doctor details with the calculated session price to the doctorsList array
                doctorsList.push({
                    name,
                    speciality,
                    hourlyRate,
                    affiliation,
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
                    affiliation
                } = doctor;
                
                let calculatedSessionPrice = hourlyRate + hourlyRate*0.1
                
                calculatedSessionPrice = calculatedSessionPrice * ( 1 - healthPackage.doctorSessionDiscount); 
                
                // Add the doctor details with the calculated session price to the doctorsList array
                doctorsList.push({
                    name,
                    speciality,
                    hourlyRate,
                    affiliation,
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
                status: "RESERVED"
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
                status: "RESERVED"
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

const getPatientDoctors = asyncHandler(async (req,res) => {
    try{
        const allPatientDoctors = await DoctorPatient.find({ patient: req.user.id });
        console.log(allPatientDoctors)
        let allDoctors = []
        for(const doctor of allPatientDoctors){
            const doc = await DoctorModel.findOne({_id: doctor.doctor})
            if(doc)
                allDoctors.push(doc)
        }
        res.status(200).json(allDoctors);
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }

})

module.exports = {
    searchByNameAndOrSpeciality,
    searchDoctorsToChatClinic,
    searchDoctorsToChat,
    createDoctor,
    updateDoctor,
    getDoctors,
    viewDoctor,
    filterBySpecialityAndDate,
    getDoctorsSessionPrice,
    removeDoctor,
    createDoctorPatients,
    getDoctor,
    getPatientDoctors,
    getAmount,
}
