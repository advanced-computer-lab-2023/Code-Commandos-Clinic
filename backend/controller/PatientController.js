const DoctorPatientModel = require('../model/DoctorPatient.js');
const HealthRecord = require ('../model/HealthRecord.js');
const PatientModel = require('../model/Patient')
const UserModel = require('../model/User')
const HealthPackageModel = require('../model/HealthPackage')
const HealthPackagePatientModel = require('../model/HealthPackagePatient')
const FamilyMemberModel = require('../model/FamilyMember')
const mongoose = require('mongoose')
const User = require("../model/User");
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


//requirement-33 Nour
const getPatientsOfADoctor = asyncHandler ( async (req,res) =>{
    try{
        const allPatients= await DoctorPatientModel.find({ doctor: req.user.id });
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

const searchPatientsToChat = asyncHandler(async (req, res) => {
  const { name } = req.params;
  let query = {};
  if (name !== "none") {
    query = { name: { $regex: new RegExp(name, "i") } };
  }
  try {
    const patients = await PatientModel.find(query);
    let patientList = []
    for (const patientJSON of patients) {
      const patient = patientJSON._doc
      const user = await UserModel.findOne({username:patient.username});
      if(user)
        patientList.push({...patient, userId:user._id})
    }
    res.status(200).json(patientList);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

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
    if (patientBody.password.search(/[a-z]/) < 0 || patientBody.password.search(/[A-Z]/) < 0 || patientBody.password.search(/[0-9]/) < 0) {
      res.status(400)
      throw new Error("Password must contain at least one number, one capital letter and one small letter")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(patientBody.password,salt)
    const patient = await PatientModel.create(patientBody)
    const user = await UserModel.create({username: patientBody.username, password: hashedPassword, role:"PATIENT"})
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
    await User.findOneAndDelete({username:patient.username})
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
  const {name} = req.params
  if(name !== "none"){
    query = {
      $and:[
          {patientName: {$regex: new RegExp(name , 'i')}},
          {doctor:req.user.id}
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
  // Extract family member, package, and payment method from request parameters
  const { id } = req.user
  const { familyMemberID, packageID, paymentMethod } = req.params; 
  try {
    //get the patient and the health package from our database
    const patient = await PatientModel.findById(id)
    const healthPackage = await HealthPackageModel.findOne({_id:packageID})
    if(!healthPackage){
      throw new Error("invalid package")
    }
    //get the yearly subscription amount from health package
    let amount;
    const HealthPackagePatient = await HealthPackagePatientModel.findOne({patientID: id})
    if(HealthPackagePatient && familyMemberID!="user"){
      const subscribedHealthPackage = await HealthPackageModel.findOne({_id:HealthPackagePatient.healthPackageID})
      const discount = subscribedHealthPackage.familyDiscount
      amount = healthPackage.yearlySubscription*(1-discount)
    } else {
      amount = await healthPackage.yearlySubscription
    }
    //check if payment is wallet or credit
    if (paymentMethod === 'wallet') {
      //update database if wallet balance is sufficient
      if(patient.wallet < amount){
        res.status(400).json({error:"Wallet balance insufficient"})
        throw new Error("Wallet balance insufficient.")
      } else {
        const newWallet = patient.wallet - amount;
        const newPatient = await PatientModel.findOneAndUpdate({_id:id},{wallet:newWallet})
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear() + 1;
        const renewalDate = yyyy+'/'+mm+'/'+dd
        if(familyMemberID==="user"){
          // Check if the patient already has a subscription
          var existingPackage = await HealthPackagePatientModel.findOne({ patientID: id });
          if (existingPackage) {
            existingPackage = await HealthPackagePatientModel.findOneAndDelete({ patientID: id });
          }
          const healthPackagePatient = await HealthPackagePatientModel.create({patientID:id,healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate})
          res.status(200).json(healthPackagePatient)
        } else {
          const familyMember = await FamilyMemberModel.findOneAndUpdate({_id:familyMemberID},{healthPackage:{healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate}})
          if(!familyMember)
            return res.status(404).json({error:"Family member not found"})
          //======checks if the family member has a linked account======
          if(familyMember.account){
            var existingPackage = await HealthPackagePatientModel.findOne({ patientID: familyMember.account });
            if (existingPackage) {
              existingPackage = await HealthPackagePatientModel.findOneAndDelete({ patientID: familyMember.account });
            }
            const healthPackagePatient = await HealthPackagePatientModel.create({patientID:familyMember.account, healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate})
          }
          //============================================================
          res.status(200).json(familyMember)
        }     
      }
    }
    else if (paymentMethod === 'credit_card') {
      //create a stripe session
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
              //remove recurring variable if not a subscription
              recurring: {         
                interval: 'year',
              },
            },
            quantity: 1,
          },
        ],
        //change mode to 'payment' if not a subscription
        mode: 'subscription', 
        //redirection url after success, query contains session id
        success_url: `http://localhost:3000/HealthPackages/Subscribe/success?sessionID={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/HealthPackages/Subscribe/cancel',
        //metadata containing your product's id and its purchaser (important for later)
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

//requirement 67  -> akram
const getAmount = asyncHandler(async (req, res) => {
  try {
    un = req.user.username;
    const patient = await PatientModel.findOne({username: un});
    if (!patient) {
      res.status(404).json({ message: 'Patient not found', userId: un });
      return;
    }
    res.status(200).json(patient.wallet);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
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
  if(session.payment_status==="paid"){
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
        // Check if the patient already has a subscription
        var existingPackage = await HealthPackagePatientModel.findOne({ patientID: patientID });
        if (existingPackage) {
          existingPackage = await HealthPackagePatientModel.findOneAndDelete({ patientID: patientID });
        }
        const healthPackagePatient = await HealthPackagePatientModel.create({patientID:patientID,healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate})
        res.status(200).json(healthPackagePatient)
      } else {
        const familyMember = await FamilyMemberModel.findOneAndUpdate({_id:familyMemberID},{healthPackage:{healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate}})
        if(!familyMember)
            return res.status(404).json({error:"Family member not found"})
        //======checks if the family member has a linked account======
        if(familyMember.account){
          var existingPackage = await HealthPackagePatientModel.findOne({ patientID: familyMember.account });
          if (existingPackage) {
            existingPackage = await HealthPackagePatientModel.findOneAndDelete({ patientID: familyMember.account });
          }
          const healthPackagePatient = await HealthPackagePatientModel.create({patientID:familyMember.account, healthPackageID:packageID, status:"SUBSCRIBED", renewalDate:renewalDate})
        }
        //============================================================
        res.status(200).json(familyMember)
      }
    }
    catch (error) {
      res.status(400).json(error.message)
    }
  } else {
    res.status(400).json({error:"payment unsuccessful"})
  }
})

module.exports = {
    getPatients,
    searchPatientsToChat,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient,
    getPatientsOfADoctor,
    getInfoHealthPatient,
    searchByName,
    payForSubscription,
    subscribeToPackage,
    getAmount
}
