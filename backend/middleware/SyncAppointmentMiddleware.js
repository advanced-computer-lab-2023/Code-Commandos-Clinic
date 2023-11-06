const Appointment = require("../model/Appointment")
const asyncHandler = require('express-async-handler')

const updateAppointmentsStatus = asyncHandler( async () => {
    try {
        const currentTime = new Date();
        const appointmentsToUpdate = await Appointment.find({
            startTime: { $lt: currentTime },
            status: { $ne: 'COMPLETED' }
        });
        for (const appointment of appointmentsToUpdate) {
            appointment.status = 'COMPLETED';
            await appointment.save();
        }
    }
    catch (error){
        throw new Error(error.message)
    }
})

module.exports = updateAppointmentsStatus