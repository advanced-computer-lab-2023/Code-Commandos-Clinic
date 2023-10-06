const express = require('express')
const {getPrescriptions , addPrescription} = require("../controller/PrescriptionController")
const {addDoctor} = require("../controller/DoctorController")
const {addPatient} = require("../controller/PatientController")
const {addMedication} = require("../controller/MedicationController") 
const router = express.Router();

//view all prescriptions
router.get('/prescriptionList' , getPrescriptions)

// add a prescription
router.post('/addPrescription' , addPrescription)

//add a doctor
router.post('/addDoctor' , addDoctor)

//add a patient
router.post('/addPatient' , addPatient)

// add a medication
router.post('/addMedication' , addMedication)

module.exports = router


// {
//   "patient": {
//       "username": "patient123",
//       "name": "Jane Patient",
//       "email": "jane.patient@example.com",
//       "password": "securepassword",
//       "dateOfBirth": "1990-05-15",
//       "gender": "FEMALE",
//       "mobileNumber": "1234567890",
//       "emergencyContact": {
//           "fullName": "Emergency Contact",
//           "mobileNumber": "9876543210"
//       }
//   },
//   "doctor": {
//       "username": "john_doe",
//       "name": "John Doe",
//       "email": "john.doe@example.com",
//       "password": "password123",
//       "dateOfBirth": "1980-01-01",
//       "hourlyRate": 100,
//       "affiliation": "Some Hospital",
//       "educationalBackground": "Medical School Graduate"
//   },
//   "medication": {
//       "name": "Aspirin",
//       "dosage": "10mg",
//       "frequency": "Once a day",
//       "duration": "1 week",
//       "route": "Oral"
//   },
//   "filled": false,
//   "issueDate": "2023-09-25",
//   "refillInfo": "Refill information goes here",
//   "diagnosis": "Diagnosis information goes here",
//   "specialInstructions": "Special instructions go here",
//   "allergies": "Known allergies go here",
//   "precautions": "Precautions go here",
//   "notes": "Additional notes go here"
// }



// patiendID : "651fcbbd61e24c7badde8dda"
// doctorID :"651fcfce61e24c7badde8ddc"
// medicationId : "651fd0d661e24c7badde8ddf" 