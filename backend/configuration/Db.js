const mongoose = require('mongoose')

const connectToDb = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToDb;