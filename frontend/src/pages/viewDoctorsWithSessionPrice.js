import {useEffect, useState} from "react";
import DoctorSessionDetails from "../components/DoctorSessionDetails";
import Swal from "sweetalert2";

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'We encountered an issue while fetching the search results. Please try again later.',
                });
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response2.text(),
                });
                setHealthPackage(null)
            }
        }

        fetchDoctors()
    },[])


    return (
        <div className="view-doctors m-6 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2 className="mb-4">
              <hr className="linearound"></hr> List of Doctors <hr className="linearound"></hr>
            </h2>
            {healthPackage && <h3>Session price is calculated based on your {healthPackage.packageName} package</h3>}
            <div className="col-md-13">
              {doctors && doctors.map((doctor) => <DoctorSessionDetails key={doctor._id} doctor={doctor} />)}
            </div>
          </div>
        </div>
      );
    };

export default ViewDoctorsWithSessionPrice