import { useEffect, useState } from "react";

import DoctorRequestDetails from '../components/DoctorRequestDetails'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const DoctorRegistrationRequests = () => {
    const [doctorRequests, setDoctorRequests] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDoctorRequests = async () => {
            const response = await fetch('api/doctorRegistration/getDoctorRequests',{
                method: 'GET',
                headers: {
                'Content-Type':'application/json',
            },
            });

            if(response.ok){
                const json = await response.json()
                setDoctorRequests(json)
            }
            else if(!response.ok){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }

        fetchDoctorRequests()
    }, [])

    return (
        <div className="doctorRegistrationRequests m-5">
          <h2 className="mb-4">
            <hr className="lineAround"></hr>Doctors applying to join the platform
            <hr className="lineAround"></hr>
          </h2>
          <div className="box">
          <div class="req-page">
            <div className="requests-container">
          
              {doctorRequests &&
                doctorRequests.map((doctorRequest, index) => (
                  <div key={doctorRequest._id} className="request-card">
                    <DoctorRequestDetails doctorRequest={doctorRequest} />
                  </div>
                ))}
                   </div>
            </div>
          </div>
        </div>
      );
                }
export default DoctorRegistrationRequests;