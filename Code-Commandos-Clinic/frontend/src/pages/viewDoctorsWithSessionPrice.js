import {useEffect, useState} from "react";
import DoctorSessionDetails from "../components/DoctorSessionDetails";

const ViewDoctorsWithSessionPrice = ()=> {
    const [doctors, setDoctors] = useState(null)
    const [healthPackage, setHealthPackage] = useState(null)

    useEffect( () => {
        const fetchDoctors = async () => {
            let url = '/api/doctor/getSessionPrice/';
            //url += patientID;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                setDoctors(results)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage)
            }

            url = '/api/healthPackagePatient/getSubscribedPackage/'
            //url += patientID;
            const response2 = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response2.ok) {
                const result = await response2.json();
                setHealthPackage(result)
            } else {
                setHealthPackage(null)
            }
        }

        fetchDoctors()
    },[])


    return (
        <div className="view-doctors m-5">
            <h2>List of Doctors:</h2>
            { healthPackage && <h3>Session price is calculated based on your {healthPackage.packageName} package</h3> }
            <div>
                {doctors && doctors.map((doctor) => (
                    <DoctorSessionDetails key={doctor._id} doctor={doctor}/>
                ))}
            </div>
        </div>
    );
};

export default ViewDoctorsWithSessionPrice