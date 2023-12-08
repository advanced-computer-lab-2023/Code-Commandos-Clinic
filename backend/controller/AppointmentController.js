const asyncHandler = require("express-async-handler");
const DoctorModel = require("../model/Doctor");
const PatientModel = require("../model/Patient");
const AppointmentModel = require("../model/Appointment");
const FamilyMember = require("../model/FamilyMember");
const EmploymentContract = require("../model/EmploymentContract");
const HealthPackagePatientModel = require("../model/HealthPackagePatient");
const HealthPackageModel = require("../model/HealthPackage");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const createAppointment = asyncHandler(async (req, res) => {
  const contract = await EmploymentContract.findOne({ doctor: req.user.id });
  if (
    !contract ||
    contract.status === "REJECTED" ||
    contract.status === "PENDING"
  ) {
    res.status(400);
    throw new Error("You can add your slots only if your contract is accepted");
  }
  const appointmentBody = req.body;
  let operlappingAppointment;
  const currentDateTime = new Date();
  const convertedStartTime = new Date(appointmentBody.startTime);
  if (currentDateTime >= convertedStartTime) {
    res.status(400);
    throw new Error("The appointment has to start and end in the future");
  }

  if (appointmentBody.startTime >= appointmentBody.endTime) {
    res.status(400);
    throw new Error("End time has to be greater than start time");
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
              startTime: { $lte: appointmentBody.startTime },
              endTime: { $gte: appointmentBody.startTime },
            },
            {
              startTime: { $gte: appointmentBody.startTime },
              endTime: { $lte: appointmentBody.endTime },
            },
            {
              startTime: { $lte: appointmentBody.endTime },
              endTime: { $gte: appointmentBody.startTime },
            },
          ],
        },
      ],
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  if (operlappingAppointment) {
    res.status(400);
    throw new Error("The appointment overlapps with another appointment");
  }
  try {
    appointmentBody.doctor = req.user.id;
    const appointment = await AppointmentModel.create(appointmentBody);
    const doctor = await DoctorModel.findById(appointment.doctor);
    appointment.doctorName = doctor.name;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//requirement 35
// get the upcoming appointments of a doctor
const getUpcomingPatientsOfDoctor = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  let query = {
    $and: [
      { startTime: { $gt: currentDate } },
      { status: "RESERVED" },
      { doctor: req.user.id },
    ],
  };
  console.log(currentDate);
  try {
    const upcomingAppointments = await AppointmentModel.find(query);
    if (upcomingAppointments.length === 0) {
      throw new Error("No Upcoming Appointments");
    }
    const patientIds = upcomingAppointments.map(
      (appointment) => appointment.patient
    );
    const upcomingPatients = await PatientModel.find({
      _id: { $in: patientIds },
    });
    res.status(200).json(upcomingPatients);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const getAppointment = asyncHandler(async (req, res) => {
  let query = {};
  const currentDate = new Date();
  if (req.params.doctor !== "none" && req.params.doctor !== "none") {
    const { doctorid, patientid } = req.params;
    query = {
      $and: [
        { doctor: doctorid },
        { patient: patientid },
        { startTime: { $lt: currentDate } },
      ],
    };
    try {
      const previousAppointments = await AppointmentModel.find(query);
      res.status(200).json(previousAppointments);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const { appointmentID } = req.params;
  try {
    // Finds the appointment from mongoDB and sets its status to cancelled.
    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: appointmentID },
      { status: "CANCELLED" }
    );
    if (!appointment) throw new Error("Appointment not found");
    // Appointments cancelled less than 24 hours before the appointment do not receive a refund.
    const appointmentTime = new Date(appointment.startTime);
    const cancellationDeadline = appointmentTime - 24 * 60 * 60 * 1000;
    const now = new Date();
    if (now > cancellationDeadline) {
      res.status(200).json(appointment);
      return;
    }
    // Appointment cancelled early, so refund is given.
    const patient = await PatientModel.findById(appointment.patient);
    const doctor = await DoctorModel.findById(appointment.doctor);
    const healthPackagePatient = await HealthPackagePatientModel.findOne({
      patientID: appointment.patient,
    });
    let amount = 0;
    if (!healthPackagePatient) {
      amount = doctor.hourlyRate + doctor.hourlyRate * 0.1;
    } else {
      const healthPackageID = healthPackagePatient.healthPackageID;
      const healthPackage = await HealthPackageModel.findOne({
        _id: healthPackageID,
      });
      amount = doctor.hourlyRate + doctor.hourlyRate * 0.1;
      amount = amount * (1 - healthPackage.doctorSessionDiscount);
    }
    patient.wallet = patient.wallet + amount;
    await patient.save();
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const getAppointmentsByDateAndStatus = asyncHandler(async (req, res) => {
  try {
    const { appointmentDate, status } = req.params;
    const _appointmentDate = new Date(appointmentDate);
    const _appointmentDateEnd = new Date(_appointmentDate);
    _appointmentDateEnd.setHours(23);
    _appointmentDateEnd.setMinutes(59);
    const appointmentsAvailable = await AppointmentModel.find({
      startTime: { $gte: _appointmentDate, $lte: _appointmentDateEnd },
      status: status,
    });

    if (appointmentsAvailable.length == 0) {
      res.status(404);
      throw new Error("No appointments found");
    }
    res.status(200).json(appointmentsAvailable);
  } catch (error) {
    res.status(400);
    //alert(error.message)
    throw new Error(error.message);
  }
});

const getAppointments = asyncHandler(async (req, res) => {
  //const {appointmentDate,status} = req.params
  const appointmentsAvailable = await AppointmentModel.find({});

  if (appointmentsAvailable.length == 0) {
    res.status(404);
    throw new Error("No appointments found");
  }
  res.status(200).json(appointmentsAvailable);
});

const viewAvailableAppointmentsOfDoctor = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  try {
    const availableAppointments = await AppointmentModel.find({
      doctor: doctorId,
      status: "FREE",
    });
    res.status(200).json(availableAppointments);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const reserveAppointment = asyncHandler(async (req, res) => {
  const { id, familyMemberId } = req.body;
  try {
    const appointment = await AppointmentModel.findById(id);
    const doctorid = appointment.doctor;
    const doctor = await DoctorModel.findById(doctorid);
    const healthPackagePatient = await HealthPackagePatientModel.findOne({
      patientID: req.user.id,
    });
    let amount = 0;
    if (!healthPackagePatient) {
      amount = doctor.hourlyRate + doctor.hourlyRate * 0.1;
    } else {
      const healthPackageID = healthPackagePatient.healthPackageID;
      const healthPackage = await HealthPackageModel.findOne({
        _id: healthPackageID,
      });
      amount = doctor.hourlyRate + doctor.hourlyRate * 0.1;
      amount = amount * (1 - healthPackage.doctorSessionDiscount);
    }
    const patient = await PatientModel.findById(req.user.id);
    if (req.params.paymentMethod === "wallet") {
      if (patient.wallet < amount) {
        return res.status(400).json({ msg: "Wallet balance insufficient" });
        // throw new Error("Wallet balance insufficient.")
      } else {
        const newWallet = patient.wallet - amount;
        const newPatient = await PatientModel.findOneAndUpdate(
          { _id: req.user.id },
          { wallet: newWallet }
        );
      }
      //update status of appoinmtent
      appointment.patient = req.user.id;
      appointment.patientName = patient.name;
      if (familyMemberId) {
        appointment.familyMember = familyMemberId;
        const member = await FamilyMember.findById(familyMemberId);
        appointment.familyMemberName = member.name;
      }
      appointment.status = "RESERVED";
      await appointment.save();
      res.status(200).json(appointment);
    } else if (req.params.paymentMethod === "credit_card") {
      //create a stripe session
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        line_items: [
          {
            price_data: {
              product_data: {
                name: "appointment with doctor" + doctor.name,
              },
              unit_amount: parseInt(amount * 100, 10),
              currency: "egp",
              //remove recurring variable if not a subscription
            },
            quantity: 1,
          },
        ],
        //change mode to 'payment' if not a subscription
        mode: "payment",
        //redirection url after success, query contains session id
        success_url: `http://localhost:3000/AppointmentSuccess?sessionID={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:3000/AppointmentFailure",
        //metadata containing your product's id and its purchaser (important for later)
        metadata: {
          patientID: req.user.id.toString(),
          doctorId: doctor._id.toString(),
          appointmentid: appointment._id.toString(),
          familyMemberId: familyMemberId ? familyMemberId.toString() : "null",
        },
      });
      console.log(session);
      res.status(200).json(session);
    } else {
      return res.status(400).json({ error: "Invalid payment method" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const success = asyncHandler(async (req, res) => {
  const { sessionID } = req.params;
  const session = await stripe.checkout.sessions.retrieve(sessionID, {
    expand: ["line_items"],
  });
  if (session.payment_status === "paid") {
    const appointmentid = session.metadata.appointmentid;
    const familyMemberId = session.metadata.familyMemberId;
    const patientID = session.metadata.patientID;
    const appointment = await AppointmentModel.findById(appointmentid);
    const patient = await PatientModel.findById(patientID);
    try {
      appointment.patient = patientID;
      appointment.patientName = patient.name;
      if (familyMemberId != "null") {
        appointment.familyMember = familyMemberId;
        const member = await FamilyMember.findById(familyMemberId);
        appointment.familyMemberName = member.name;
      }
      appointment.status = "RESERVED";
      await appointment.save();
      res.status(200).json(appointment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(400).json({ error: "payment unsuccessful" });
  }
});

const upcomingPastAppointmentsOfDoctor = asyncHandler(async (req, res) => {
  try {
    const upcomingAppointments = await AppointmentModel.find({
      doctor: req.user.id,
      status: "RESERVED",
    });
    const pastAppointments = await AppointmentModel.find({
      doctor: req.user.id,
      status: { $in: ["COMPLETED", "CANCELLED"] },
    });
    res
      .status(200)
      .json({ upcoming: upcomingAppointments, past: pastAppointments });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const upcomingPastAppointmentsOfPatient = asyncHandler(async (req, res) => {
  try {
    const upcomingAppointments = await AppointmentModel.find({
      patient: req.user.id,
      status: "RESERVED",
    });
    const pastAppointments = await AppointmentModel.find({
      patient: req.user.id,
      status: { $in: ["COMPLETED", "CANCELLED"] },
    });
    res
      .status(200)
      .json({ upcoming: upcomingAppointments, past: pastAppointments });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const filterAppointmentsByDateOrStatus = asyncHandler(async (req, res) => {
  const { date, status } = req.params;
  var query;
  const _appointmentDate = new Date(date);
  const _appointmentDateEnd = new Date(_appointmentDate);
  _appointmentDateEnd.setHours(23);
  _appointmentDateEnd.setMinutes(59);
  if (date != "none" && status != "none") {
    query = {
      $or: [
        { startTime: { $gte: _appointmentDate, $lte: _appointmentDateEnd } },
        { status: status },
      ],
    };
  } else if (date != "none") {
    query = {
      startTime: { $gte: _appointmentDate, $lte: _appointmentDateEnd },
    };
  } else if (status != "none") {
    query = { status: status };
  }
  try {
    const appointments = await AppointmentModel.find(query);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const scheduleFollowUp = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const appointmentBody = req.body;
  let operlappingAppointment;
  const currentDateTime = new Date();
  const convertedStartTime = new Date(appointmentBody.startTime);
  if (currentDateTime >= convertedStartTime) {
    res.status(400);
    throw new Error("The appointment has to start and end in the future");
  }

  if (appointmentBody.startTime >= appointmentBody.endTime) {
    res.status(400);
    throw new Error("End time has to be greater than start time");
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
              startTime: { $lte: appointmentBody.startTime },
              endTime: { $gte: appointmentBody.startTime },
            },
            {
              startTime: { $gte: appointmentBody.startTime },
              endTime: { $lte: appointmentBody.endTime },
            },
            {
              startTime: { $lte: appointmentBody.endTime },
              endTime: { $gte: appointmentBody.startTime },
            },
          ],
        },
      ],
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  if (operlappingAppointment) {
    res.status(400);
    throw new Error("The appointment overlapps with another appointment");
  }
  try {
    appointmentBody.doctor = req.user.id;
    const appointment = await AppointmentModel.create(appointmentBody);
    const doctor = await DoctorModel.findById(req.user.id);
    const patient = await PatientModel.findById(patientId);
    appointment.doctorName = doctor.name;
    appointment.patientName = patient.name;
    appointment.patient = patientId;
    appointment.status = "RESERVED";
    appointment.type = "FOLLOWUP";
    appointment.patient = patientId;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

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
  filterAppointmentsByDateOrStatus,
  scheduleFollowUp,
  success,
  cancelAppointment,
};
