# Code-Commandos-Clinic

# Project Title:
El7a2ni

# Project description: 
El7a2ni is a software solution for clinics, doctors, and patients alike to streamline and automate the interactions between patients and medical doctors. This encompasses everything from trying to schedule meetings with doctors, conducting on-premise or online meetings, getting prescriptions, and accessing medical history.

# Motivation:
The need to modernize healthcare interactions gave rise to El7a2ni. Traditional approaches frequently require a lot of paperwork, which causes delays and inefficiencies. The goal of this project is to provide a seamless digital solution by streamlining and improving communication between doctors and patients.



# Build Status:

<ol>

<li>
 Website can't upload multiple files together
 </li>

 <li>
The data takes time to be fetched from backend and MongoDB
 </li>

 <li>
The project needs in the near future to be deployed through AWS Services or alike.
 </li>

 <li>
To create a zoom video call you need to login with a specific account. This will change after zoom approves our app 
 </li>

</ol>

# Technologies:

*Frontend (Client-Side):
React,
Bootstrap,
SweetAlert2

*Backend (Server-Side):
Node.js,
Express,
MongoDB

# Installation:


- Clone the link of repository from github.
- install node.js
- cd to the repo location
- `npm install`
- `cd backend` then `npm install`  
- `cd frontend` then `npm install` 

## Tests

### Running Tests

We use Postman for testing our clinic application. Follow these steps to run the tests:

1. Ensure that the clinic application is running locally or on a specified server.
2. Open Postman the navigate to My WorkSpace. Click on "New"  
3. Click on "New" 

### Test Cases

#### 1. User Registration As Patient

- *Description:* Verifies that users can successfully register for an account.
- *Steps:*
  1. Send a POST request to the /api/patient/registerPatient endpoint with valid user information.
  2. click on "Body", then Text , the choose JSON . Then write your data in json format
  3. Check that the response status is 201 (Created).
  4. In mongoDB , browse the collections then go to 'Patients' collection and 'Users' collection
  5. You will find a new document with the data you entered in postman in both collections.


#### 2. Login 
- *Description:* Verifies that users can successfully login for an account.
- *Steps:*
  1. Send a POST request to the /api/user/login endpoint with valid user information.
  2. click on "Body", then Text , then choose JSON . Then write your data in json format.
  follow this example when writing data:
  {
  "username" : "your_username",
  "password" : "your_password"
  }
  3. Check that the response status is 200. 
  4. Postman will print the following :
     - the "_id" in your document.
     - the "role" in your document.
     - the "token" in your document.
     - the "username" in your document.
  5.If you wrote a wrong password , postman will print "Invalid Password"

<details>
<summary>Testing Example</summary>
  
![This is an image](https://github.com/advanced-computer-lab-2023/Code-Commandos-Clinic/blob/main/Screenshots/Screenshot%202023-12-17%20040211.png?raw=true)
    
</details>
 

### Additional Information

- Use port 4000 for the backend
- You can use the same methodolgy used in the test cases examples above for testing every endpoint in the system.
You may find the routes in API references section.

*Important Note:* Ensure that the clinic application server is running and accessible before running the tests.


# Code Style:

The code style is enforced using `eslint`  and `prettier`. The code style is enforced using `pre-commit` hooks and `pre-commit github action`.


# Features:

* ADMIN
       
         a) can add/remove another admin
         b) can remove doctor/patient
         c) can accept/reject doctor's request to join platform 
         d) add/update/delete health package 
* GUEST

           a) submit request to join as a doctor
           b) upload and submit required documents upon regitration
           c) register as a patient 

* PATIENT 

           a) upload/remove document such as PDF for medical history
           b) filter appointments
           c) view/link family member
           d) filter a doctor by speciality/name 
           e) view/subscribe health package status 
           f) reschedule/cancel an appointment 
           g) chat with doctor/patient
           h) view/filter/download prescription
           i) view upcoming/past appointments list 
           
* DOCTOR 

           a) edit/update Email,Affliation, or Hourly Rate 
           b) view uploaded health records
           c) filter appointments 
           d) view upcoming/past appointments list 
           e) reschedule/cancel appointment 
           f) schedule follow-up for patient 
           g) start/end video call with patient/doctor 
           h) add/update medice dosage 
           i) add new health record for patient



# Code Examples
*Frontend

<ol>
<li>

    import { useEffect, useState } from "react";
    import Swal from "sweetalert2";
    import HealthRecordDetails from "../components/HealthRecordDetails"; 


    const ViewpatientHealthRecord = () =>{
        const [healthRecord , setHealthRecord] = useState(null)
        useEffect(() => {
            const fetchHealthRecord = async () =>{
                const response = await fetch('api/healthRecord/getHealthRecordOfPatient')
                    if(response.ok){
                        const json = await response.json()
                        console.log("patients are ",json)
                        setHealthRecord(json)
                    }
                    else {
                        const errorMessage = await response.text();
                        Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "No health record found",
                        });
                    }
            }    
            fetchHealthRecord()
    },[])

    

    return (
        <div className="container justify-content-center col-md-7 ">
            <h2 className="mb-4"> <hr className="linearound"></hr> Your HealthRecord <hr className="linearound"></hr> </h2>
            {healthRecord && <HealthRecordDetails healthRecord={healthRecord} />}
        </div>
    );
    }
    
    export default ViewpatientHealthRecord;

</li>
<li>

    import {useState,useEffect} from "react";
    import PatientDetails from "../components/PatientDetails";
    import Swal from 'sweetalert2';


    const ViewAndRemovePatients = ()=> {
    const [patients, setPatients] = useState([]);
    const [selectedPatient,setSelectedPatient] = useState(null)
    console.log("in method")

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try{
            const response = await fetch('api/patient/getPatients',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setPatients(results)
                console.log(patients)
            }
            else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Could not fetch results. Please try again later.',
                });
                throw new Error(errorMessage)
            }
        }
        catch (error){
            setSelectedPatient(null)
        }
    };

    const handleRemovePatient = async (patientId) => {
        try {
            const response = await fetch(`/api/patient/deletePatient/${patientId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchResults();
                setSelectedPatient(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'The patient has been removed successfully.',
                });
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                    <h2 className="mb-4"> <hr className="linearound"></hr> System patients <hr className="linearound"></hr> </h2>
                <div className="col-md-5">
                    <ul className="list-group">
                        {patients.map((patient) => (
                            <li key={patient._id} className="list-group-item">
                                <button
                                    className="btn btn-link btn-lg"
                                    onClick={() => setSelectedPatient(patient)}
                                    style={{ textDecoration: "none", color:'#1B3236' }}
                                >
                                    {patient.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-5 mt-5"> 
                    {selectedPatient && (
                        <>
                            <div style={{ marginLeft: '10px' }}> {/* Add margin to the bottom */}
                                <PatientDetails patient={selectedPatient} />
                            </div>
                            <button className="custom-btn wider-button" style={{ marginLeft: '30px', marginTop:'5px', width:'150px' }} onClick={() => handleRemovePatient(selectedPatient._id)}>Remove</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    };

    export default ViewAndRemovePatients

</li>
</ol>
        

*Backend

<ol>
<li>

    const getDoctorRequests = asyncHandler(async (req, res) => {
        try {
            const DoctorRequests = await DoctorRegistrationModel.find({}).sort({createdAt: -1})
            res.status(200).json(DoctorRequests)
        }
        catch (error){
            res.status(400)
            throw new Error(error.message)
        }
    })

</li>
<li>

    const rejectContract = asyncHandler(async (req,res) => {
        try {
            const contract = await 
            EmploymentContract.findOne({doctor:req.user.id});
            if (!contract) {
                res.status(404)
                throw new Error("Contract not found")
            }
            contract.status = "REJECTED"
            await contract.save()
            res.status(200).json(contract)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    })

</li>
</ol>

# Screenshots

<details>
<summary>Updating Your Info as Doctor</summary>

![This is an image](https://github.com/advanced-computer-lab-2023/Code-Commandos-Clinic/blob/main/Screenshots/IMG-20231217-WA0020.jpg?raw=true)
    
</details>

<details>
<summary>Filtering Doctors as Patient</summary>

![This is an image](https://github.com/advanced-computer-lab-2023/Code-Commandos-Clinic/blob/main/Screenshots/IMG-20231217-WA0018.jpg?raw=true)
    
</details>

<details>
<summary>Edit/Delete Health Packages as Admin</summary>

![This is an image](https://github.com/advanced-computer-lab-2023/Code-Commandos-Clinic/blob/main/Screenshots/IMG-20231217-WA0019.jpg?raw=true)
    
</details>

<details>
<summary>Filter Appointments</summary>

![This is an image](https://github.com/advanced-computer-lab-2023/Code-Commandos-Clinic/blob/main/Screenshots/IMG-20231217-WA0021.jpg?raw=true)
    
</details>

<details>
<summary>Follow-Up</summary>

![This is an image](https://github.com/advanced-computer-lab-2023/Code-Commandos-Clinic/blob/main/Screenshots/IMG-20231217-WA0017.jpg?raw=true)
    
</details>



# How to Use ?

After finishing the Installation process you need to create an .env file in the backend folder.
-	Open new terminal.
-	`cd backend`
-	`node server.js` “wait until MongoDB connected”.
-	Open new terminal.
-	`cd frontend`
-	`npm start` “wait until your browser open automatically”.


Then you will be able to become one of the four primary users of our
website (User, Admin, Doctor, Patient, and ). You can make an 
account and login to the website by using the sign up page to
create an account, After that, you will be able to utilize 
our features, log in, and change your password.

# Contribute

We welcome and appreciate contributions from the community to enhance El7a2ni and make it more robust. Whether it's fixing bugs, adding new features, or improving documentation, your contributions are valuable to us.


# Credits
    https://www.youtube.com/@NetNinja
    https://www.w3schools.com/html/default.asp
    https://www.youtube.com/playlist
    list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

# License    
The project is licensed under the Apache License 2.0.

[MIT](https://choosealicense.com/licenses/mit/)

Zoom has video call service has been used in this

[Zoom](https://explore.zoom.us/en/terms/)

## API Reference

#### Get Admin

- Admin:

```http
  GET api/admin/getAdmin/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. You need to be an admin |

#### Get All Admins

```http
  GET api/admin/getAlladmins
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `None`      | `None`     | **Required**. You need to be an admin |

#### Post Add Admins

```http
  POST api/admin/addAdmin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `None`      | `None`     | **Required**. You need to be an admin |

#### Delete Add Admin

```http
  DELETE api/admin/deleteAdmin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | **Required**. You need to be an admin |

- Doctor:

#### Search Doctors

```http
  GET api/doctor/searchByNameAndOrSpeciality/:name/:speciality
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `String`     | **Required**. You need to be an patient |
| `speciality`      | `String`     | **Required**. You need to be a patient |

#### Create Doctor

```http
  POST api/doctor/createDoctor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | Create doctor |

#### View Doctor

```http
  GET api/doctor/viewDoctor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string`     |  **Required** the doctor's ID |

#### Filter Doctors

```http
  GET api/doctor/filterBySpecialityAndDate/:speciality/:date
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `speciality`      | `string`     |  **Required** Doctor speciality  |
| `date`      | `date`     |  **Required** docotr name|


#### Remove Doctor

```http
  DELETE api/doctor/removeDoctor/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string`     |  **Required** the doctor's ID |


#### Get All Doctors

```http
  GET api/doctor/getDoctors
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### Update Doctor

```http
  GET api/doctor/getDoctors
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | **Required**. You need to be a doctor |

#### View Doctors Session Price

```http
  GET api/doctor/getSessionPrice
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | **Required**. You need to be a patient |

#### Create a Doctor Patient Relation

```http
  POST api/doctor/getSessionPrice
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### View Doctors with patients

```http
  GET api/doctor/getPatientDoctors
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | **Required**. You need to be a patient |

#### View Doctor balance

```http
  GET api/doctor/getAmount
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | **Required**. You need to be a Doctor |

#### View Doctors To chat with in clinic

```http
  GET api/doctor/searchDoctorsToChatClinic/:name/:specialty
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string`     | Doctor name |
| `speciality`      | `string`     | Doctor Speciality |

#### View Doctors To chat with

```http
  GET api/doctor/searchDoctorsToChat/:name/:specialty
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string`     | Doctor name |
| `speciality`      | `string`     | Doctor Speciality |

- File:

#### Add a File

```http
  POST api/file/addSingleFile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |


#### Add a File as a Guest

```http
  POST api/file/addSingleFileGuest/:username
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `String`     | Guest Username |

#### View single File

```http
  GET api/file/getSingleFiles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |


#### View File by ID

```http
  GET api/file/getFileById/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | File ID |

#### Add Multiple Files 

```http
   POST api/file/addMultipleFiles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### View Multiple Files 

```http
  GET api/file/getMultipleFiles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |


#### Delete Single File 

```http
  DELETE api/file/deleteSingleFile/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     |  File ID|

#### Delete alll Single Files

```http
  DELETE api/file/deleteAllSingleFiles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### get uploads by file name

```http
  GET api/file/uploads/:filename
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `filename`      | `String`     | File Name|

- Health Package Patient:

#### Subscribe to pacakge

```http
  POST api/healthPackage/subscribeToPackage
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### Get packages you are subscribed to

```http
  GET api/healthPackage/getSubscribedPackage
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### Get status to packages you are subscribed to

```http
  GET api/healthPackage/getSubscribedPackageStatus
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### get all patient packages

```http
  GET api/healthPackage/getPatientPackages
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### Cancel package subscrip

```http
  DELETE api/healthPackage/cancelSubscription/:familyMemberID
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Family Member ID |


- Health Record:

#### Create new health record

```http
  POST api/healthPackage/createHealthRecord
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### get health record of patient 

```http
  GET api/healthPackage/getHealthRecordOfPatient
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### get health record of patients

```http
  GET api/healthPackage/getHealthRecordOfPatients
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### add health record by patient ID

```http
  POST api/healthPackage/AddHealthRecord/:patientid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Patient ID |


- Patient:

#### Get Patients

```http
  GET api/patient/getPatients
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### Get Patient by ID

```http
  GET api/patient/getPatient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Patient ID |

#### Register as a patient
```http
  POST api/patient/registerPatient
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     |  |

#### DELETE a patient by ID
```http
  DELETE api/patient/deletePatient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Patient ID |

#### update patient by ID
```http
  PUT api/patient/updatePatient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Patient ID |

#### get patients of doctor
```http
  GET api/patient/getPatientsOfADoctor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### get current balance of patient
```http
  GET api/patient/getAmount
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### get info a patinet's health by ID
```http
  GET api/patient/getInfoHealthPatient/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Patient ID|

#### get a patinet by name
```http
  GET api/patient/searchByName/:name
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `String`     | Patient name|

#### pay for a health package subscription 
```http
  GET api/patient/payForSubscription/:familyMemberID/:packageID/:paymentMethod
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Family member ID|
| `id`      | `String`     | Package ID|
| `paymentMethod`      | `String`     | Payment Method|

#### Subscrbie for a health package 
```http
  POST api/patient/subscribeToPackage/:sessionID
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Session ID|


- Prescription:

#### view all prescriptions for patient
```http
  GET api/prescription/getPrescriptionsbyPatient
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     | |

#### view prescription by ID
```http
  GET api/prescription/getPrescriptionbyId/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Prescription ID|

#### add a prescription
```http
  POST api/prescription/addPrescription
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none`     ||

#### Filter prescriptions by Doctor ID
```http
  GET api/prescription/filterByDoctor/:doctorId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String`     | Doctor ID|

#### Filter prescriptions by date
```http
  GET api/prescription/filterByDate/:createdAt
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `date`     | The date prescriptions were created at |

#### Filter prescriptions by ststus
```http
  GET api/prescription/filterbyStatus/:status
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `String`     | The status of prescriptions |

- Doctor Registration:

#### Post Doctor Registration Request

```http
  POST api/doctorRegistration/doctorRegistrationRequest
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `None`    | `None`   |                                   |

*Body*:

- doctor (object): The doctor object containing registration details.

#### Get All Doctor Registration Requests

```http
  GET api/doctorRegistration/getDoctorRequests
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `None`    | `None`   | You need to be an admin               |

#### Accept Doctor Request

```http
  POST api/doctorRegistration/acceptDoctorRequests/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Doctor Request ID   |

#### Reject Doctor Request

```http
  DELETE api/doctorRegistration/rejectDoctorRequests/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Doctor Request ID   |


- Employment Contract:

#### Create Employment Contract

```http
  POST api/employmentContracts/createContracts
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |  You need to be an admin |	

*Body*:

- employmentContract (object): The employment contract details.

#### Get All Employment Contracts
```http
  GET api/employmentContracts/getContracts
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be an admin |

#### Get Doctor Employment Contract

```http
  GET api/employmentContracts/getDoctorContract
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be a doctor  |

#### Accept Employment Contract
```http
  PUT api/employmentContracts/acceptContract
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be a doctor  |

#### Reject Employment Contract
```http
  PUT api/employmentContracts/rejectContract
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be a doctor  |

- Chat:

#### Access or Create a Chat

```http
  POST api/chat/accessChat
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be a doctor or patient  |

*Body*:

- userId (string): ID of the requested user.

#### Get All Chats
```http
  GET api/chat/fetchChats
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be a doctor or patient  |

#### Access or Create a Chat (From Pharmacy)
```http
  POST api/chat/accesChatFromPharmacy
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

*Body*:
- userId (string): ID of the requested user.
- pharmacistUsername (string): Username of the pharmacist requesting the chat.
- pharmacyChatId (string): ID of the chat in the pharmacy's database.

Note: This route does not use the protect middleware because it is accessed by pharmacy users.

- Health Package:

#### Add Package
```http
  POST api/healthPackage/addPackage
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be an admin  |

*Body*:
- healthPackage (object): contains details about health package

#### Get Health Package
```http
  GET api/healthPackage/getPackage/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Health Package ID  |

#### Get All Health Packages
```http
  GET api/healthPackage/getPackages
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

#### Update Health Package
```http
  PUT api/healthPackage/updatePackage/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`    | `string`   | **Required**. Health Package ID  |

*Body*:
- packageName (string): updated name of the package
- yearlySubscription (float): updated yearly subscription price
- doctorSessionDiscount (float): updated appointment discount
- medicineDiscount (float): updated medicine discount
- familyDiscount (float): updated health package discount for family members

#### Delete Health Package
```http
  DELETE api/healthPackage/deletePackage/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`    | `string`   | **Required**. Health Package ID  |

#### Get All Health Packages With Discount
```http
  GET api/healthPackage/getPackagesWithDiscount
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   | You need to be a patient  |

*Description*: 
- Gets all packages and adds discountedYearlySubscription attribute, but returns empty string if no discount.

- Notification

#### Get All User Notifications
```http
  GET api/notification/getUserNotifications
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

#### Delete Notification
```http
  DELETE api/notification/deleteNotificationById/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Notification ID  |

- User:

#### User Login
```http
  POST api/user/login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

*Body*:
- username (string)
- password (string)

#### User Logout
```http
  POST api/user/logout
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

#### Generate OTP for User
```http
  POST api/user/generateOTP
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

*Body*:
- email (string): E-mail of the user that is requesting the OTP

#### Reset Password of User
```http
  POST api/user/resetPassword
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

*Body*:
- email (string): E-mail of the user that is requesting the password reset.
- newPassword (string): Must contain at least one number, one capital letter and one small letter.

#### Change Password of User
```http
  POST api/user/changePassword
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

*Body*:
- currentPassword (string): Current password of the user.
- newPassword (string): Must contain at least one number, one capital letter and one small letter.
- confirmPassword (string): Must be equal to newPassword.

#### Get Current User
```http
  GET api/user/getUser
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |   |

- Appointment:

#### create Appointment 

```http
  POST/api/appointment/createAppointment
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Doctor role |

#### Get patients of a doctor

```http
  GET/api/appointment/getUpcomingPatientsOfDoctor
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Doctor role |

#### Get Appointments
```http
  GET/api/appointment/getAppointment/:patientid/:doctorid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `patientid` | `string` | **Required**. patient ID |
| `doctorid` | `string` | **Required**. Doctor ID |

#### Get Appointments by date or status
```http
  GET/api/appointment/getAppointmentsByDateAndStatus/:appointmentDate/:status
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `appointmentDate` | `Date` | **Required**. appointment |
| `status` | `String` | **Required**. status |

#### Get All appointments
```http
  GET/api/appointment/getAppointments
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Doctor role |

####  View Available Appointments of a doctor

```http
  GET/api/appointment/viewAvailableAppointmentsOfDoctor/:doctorId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `doctorId` | `String` | **Required**. Patient role |

#### Reserve Appointment 

```http
  PUT/api/appointment/reserveAppointment/:paymentMethod
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `paymentMethod` | `String` | **Required**. Patient role , paymentMethod |

#### Successful Payment 

```http
  POST/api/appointment/success/:sessionID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sessionID` | `String` | **Required**. Patient role ,sessionID |


#### Get past and upcoming appointments for a doctor

```http
  GET/api/appointment/upcomingPastAppointmentsOfDoctor
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Doctor role |

#### Get past and upcoming appointments for a patient

```http
  GET/api/appointment/upcomingPastAppointmentsOfPatient
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Patient role |

#### Filter Appointments By Date Or Status

```http
  GET/api/appointment/filterAppointmentsByDateOrStatus/:date/:status
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `Date` | **Required**. date  , patient doctor role|
| `status` | `String` | **Required**. status , patient doctor role|


#### Schedule a followUp

```http
  POST/api/appointment/scheduleFollowUp/:patientId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `patientId` | `String` | **Required**. Doctor role ,patientId |


#### Make a follow up request

```http
  PUT/api/appointment/updateStatusToPending/:id/:whichMember
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `String` | **Required**. id  , patient  role|
| `whichMember` | `String` | **Required**. whichMember , patient  role|

#### Revoke a follow up request

```http
  PUT/api/appointment/updateStatusToFree/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `String` | **Required**. id  , Doctor  role|

 
#### Accept a follow up request

```http
  PUT/api/appointment/acceptFollowUp/:followUpId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `followUpId` | `String` | **Required**. id  , Doctor  role|


-Family Member: 
 
#### Get family members of a patient

```http
GET/api/familyMember/getFamilyMembers
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Patient  role|

#### add a family Member 

```http
POST/api/familyMember/addFamilyMember
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Patient  role|

#### link a family Member 

```http
POST/api/familyMember/linkFamilyMember
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Patient  role|


#### Get Subscribed Packages For family Members 

```http
POST/api/familyMember/getSubscribedPackagesForFamilyMembers
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None | **Required**. Patient  role|



- Message:


#### Get all messages 

```http 
 GET/api/message/allMessages/:chatId
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `chatId` | `String` | **Required**. Patient Doctor role|

#### send a message 

```http 
 POST/api/message/sendMessage
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|

#### send a message from pharmacy

```http 
 POST/api/message/sendMessageFromPharmacy
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Paharmacist role|


- Video Call:

#### Add a video Call

```http
 POST/api/videoCall/addVideoCall

```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|

#### Get a video Call

```http
 GET/api/videoCall/getVideoCall
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|

#### Delete a video Call

```http
 DELETE/api/videoCall/deleteVideoCall
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|


#### update a socket ID

```http
 PUT/api/videoCall/setSocketID
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|


#### Authenticate Zoom

```http
 PUT/api/videoCall/authZoomAPI
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|


#### Create a meeting

```http
 POST/api/videoCall/createMeeting
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|

#### Get a meeting

```http
 GET/api/videoCall/getMeetings
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| None | None| **Required**. Patient Doctor role|











