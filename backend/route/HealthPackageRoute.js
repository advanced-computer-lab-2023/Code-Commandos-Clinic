const express = require('express')

const router = express.Router()


//get all packages
router.get('/',(req,res) => {
    res.json({mssg: 'get all packages'})
})

//get a single package
router.get('/:id',(req,res) => {
    res.json({mssg: 'get single package'})
})

//post a new package
router.post('/',(req,res) => {
    // const {packageType} = req.body
    res.json({mssg: 'post a new package'})
})

//delete a  package
router.delete('/:id',(req,res) => {
    res.json({mssg: 'delete a package'})
})

//update a package
router.patch('/:id',(req,res) => {
    res.json({mssg: 'update a package'})
})

module.exports = router;
