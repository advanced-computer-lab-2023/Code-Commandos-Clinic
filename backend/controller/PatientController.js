const DoctorPatientModel = require('../model/DoctorPatient.js');
const HealthRecord = require ('../model/HealthRecord.js');
const PatientModel = require('../model/Patient')
const UserModel = require('../model/User')
const HealthPackageModel = require('../model/HealthPackage')
const HealthPackagePatientModel = require('../model/HealthPackagePatient')
const FamilyMemberModel = require('../model/FamilyMember')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

//requirement-33 Nour
const getPatientsOfADoctor = asyncHandler ( async (req,res) =>{
    try{
        const allPatients= await DoctorPatientModel.find({ doctor: req.params.doctorId });
        if(allPatients.length===0){
            throw new Error("No Patients found")
        }
        let _allPatients = []
        for(const patient of allPatients){
          _allPatients.push(await PatientModel.findOne({_id: patient.patient}))
        }
        res.status(200).json(_allPatients);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

//requirement-25 Nour
const getInfoHealthPatient = asyncHandler ( async (req , res) =>{
    try{
        const HealthRecords = await HealthRecord.findOne({ patient: req.params.id })
        res.status(200).json(HealthRecords);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

// get all patients
const getPatients = asyncHandler(async (req, res) => {
  try {
    const Patients = await PatientModel.find({}).sort({createdAt: -1})
    res.status(200).json(Patients)
  }
  catch (error){
    res.status(400)
    throw new Error(error.message)
  }
  
})

// get a single patient
const getPatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findById(id)
    if (!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

// create a new patient
const createPatient = asyncHandler(async (req, res) => {
  const patientBody = req.body
  patientBody.wallet = 0.00
  try {
    const patient = await PatientModel.create(patientBody)
    const user = await UserModel.create({username: patientBody.username, password: patientBody.password, role:"PATIENT"})
    res.status(200).json(patient)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

// delete a patient
const deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findOneAndDelete({_id: id})
    if(!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

// update a patient
const updatePatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findOneAndUpdate({_id: id}, {...req.body})
    if (!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

//requirement 34 Nour
//search for a patient by name in the list of patients of a specific doctor
const searchByName = asyncHandler( async (req,res) =>{
  let query = {};
  const {name,doctorId} = req.params
  if(name !== "none"){
    query = {
      $and:[
          {patientName: {$regex: new RegExp(name , 'i')}},
          {doctor:doctorId}
      ]
    };
  }
  else{
    res.status(400);
    throw new Error('Please enter a name')
  }
  try {
    const patients = await DoctorPatientModel.find(query)
    if(patients.length === 0 ){
      res.status(400);
      throw new Error("No patients found!")
    }
    let allPatients = []
        for(const patient of patients){
          allPatients.push(await PatientModel.findOne({_id: patient.patient}))
        }
    res.status(200).json(allPatients)
  }
  catch (err){
    res.status(400)
    throw new Error(err.message)
  }

})

//choose to pay with wallet, or credit card (using Stripe)
const payForSubscription = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { familyMemberID, packageID, paymentMethod } = req.params; // Extract payment method and amount from request body
  try {
    const patient = await PatientModel.findById(id)
    const healthPackage = await HealthPackageModel.findOne({_id:packageID})
    if(!healthPackage){
      throw new Error("invalid package")
    }
    const amount = await healthPackage.yearlySubscription
    if (paymentMethod === 'wallet') {
      if(patient.wallet < amount){
        res.status(400)
        throw new Error("Wallet balance insufficient.")
      } else {
        const newWallet = patient.wallet - amount;
        PatientModel.findOneAndUpdate({_id:id},{wallet:newWallet})

        res.status(200).json({ success: true, message: 'Wallet payment processed successfully.' });
      }
    }
    else if (paymentMethod === 'credit_card') {
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price_data: {
              product_data: {
                name: healthPackage.packageName + ' Health Package',
              },
              unit_amount: amount*100,
              currency: 'egp',
              recurring: { //remove if not a subscription
                interval: 'year',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription', //change to 'payment' if not a subscription
        success_url: `http://localhost:3000/HealthPackages/Subscribe/success?sessionID={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/HealthPackages/Subscribe/cancel',
        metadata: {
          'patientID': req.user.id.toString(),
          'familyMemberID': familyMemberID.toString(),
          'packageID': packageID.toString()
        }
      });
      res.status(200).json(session)
    }
    else {
      return res.status(400).json({ error: 'Invalid payment method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const subscribeToPackage = asyncHandler(async (req, res) => {
  const { sessionID } = req.params
  const session = await stripe.checkout.sessions.retrieve(
    sessionID,
    {
      expand: ['line_items'],
    }
  );
  console.log(await session)
  console.log(await session.payment_status)
  const familyMemberID = session.metadata.familyMemberID
  const patientID = session.metadata.patientID
  const packageID = session.metadata.packageID
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear() + 1;
  const renewalDate = yyyy+'/'+mm+'/'+dd
  try{
    if(familyMemberID==="user"){
      const healthPackagePatient = await HealthPackagePatientModel.create({patientID:patientID,healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate})
      res.status(200).json(healthPackagePatient)
    } else {
      const familyMember = await FamilyMemberModel.findOneAndUpdate({_id:familyMemberID},{healthPackage:{healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate}})
      res.status(200).json(familyMember)
    }
  }
  catch (error) {
    res.status(400).json(error.message)
  }
})

module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient,
    getPatientsOfADoctor,
    getInfoHealthPatient,
    searchByName,
    payForSubscription,
    subscribeToPackage
}
