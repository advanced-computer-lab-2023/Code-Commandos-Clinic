const asyncHandler = require("express-async-handler");

const checkPatientRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'PATIENT') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Patient role.')
    }
})

const checkDoctorRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'DOCTOR') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Doctor role.')
    }
})

const checkAdminRole = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403)
        throw new Error('Access denied. You do not have the Admin role.')
    }
})

module.exports = {
    checkPatientRole,
    checkDoctorRole,
    checkAdminRole
}