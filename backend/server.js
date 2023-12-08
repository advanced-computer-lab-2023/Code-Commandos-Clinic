const express = require("express")
const path = require('path');
const server = express();
const dotenv = require("dotenv").config();
const connectToDb = require("./configuration/Db");
const {errorHandler} = require('./middleware/ErrorHandler')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(cors())

const httpServer = require("http").createServer(server);
httpServer.listen(port,() => console.log(`Http server is listening on port ${port}`))
//server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectToDb()

server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})


const patientRoutes = require('./route/PatientRoute')
const doctorRoutes = require('./route/DoctorRoute')
const appointmentRoutes = require('./route/AppointmentRoute')
const adminRoutes=require('./route/AdminRoute')
const familyMemberRoutes=require("./route/FamilyMemberRoute")
const doctorRegisterationRoutes = require('./route/DoctorRegistrationRoute')
const healthPackageRoutes = require('./route/HealthPackageRoute');
const healthPackagePatientRoutes = require('./route/HealthPackagePatientRoute');
const prescriptionRoute = require('./route/PrescriptionRoute')
const healthRecordRoutes = require('./route/HealthRecordRoute')
const userRoutes= require('./route/UserRoute')
const employmentContractRoutes = require('./route/employmentContractRoutes')
const fileRoutes = require('./route/FileRoute')
const updateAppointmentStatus = require('./middleware/SyncAppointmentMiddleware')
const videoCallRoutes = require('./route/VideoCallRoute')
const messageRoutes = require('./route/MessageRoute')
const chatRoutes = require('./route/ChatRoute')

updateAppointmentStatus()

server.use('/api/appointment',appointmentRoutes)
server.use('/api/admin',adminRoutes)
server.use('/api/doctor',doctorRoutes)
server.use('/api/familyMember',familyMemberRoutes);
server.use('/api/patient', patientRoutes)
server.use('/api/doctorRegistration', doctorRegisterationRoutes)
server.use('/api/healthPackage', healthPackageRoutes)
server.use('/api/healthPackagePatient', healthPackagePatientRoutes)
server.use('/api/healthRecord',healthRecordRoutes)
server.use('/api/prescription',prescriptionRoute)
server.use('/api/user',userRoutes)
server.use('/api/employmentContract',employmentContractRoutes)
server.use('/api/videoCall', videoCallRoutes)
server.use('/api/message',messageRoutes)
server.use('/api/chat',chatRoutes)

server.use('/api/file',fileRoutes.routes)
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use(errorHandler)

const io = require("socket.io")(httpServer, {
    cors: {
        origin: [`http://localhost:${port}`,'http://localhost:3000'],
        methods: ["GET","POST","DELETE","PUT"]
    }
})
io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	  });
	
	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User Joined Room: " + room);
	});
	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
	var chat = newMessageRecieved.chat;

	if (!chat.users) return console.log("chat.users not defined");

	chat.users.forEach((user) => {
		if (user._id == newMessageRecieved.sender._id) return;

		socket.in(user._id).emit("message recieved", newMessageRecieved);
	});
	});

	socket.off("setup", () => {
	console.log("USER DISCONNECTED");
	socket.leave(userData._id);
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
        console.log("hello from backend callUser")
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

	socket.on("callEnded", () => {
		io.to(data.to).emit("callEnded")
	});
});