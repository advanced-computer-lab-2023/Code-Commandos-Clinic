import { useEffect, useState } from "react";

import DoctorRequestDetails from '../components/DoctorRequestDetails'
import { useNavigate } from 'react-router-dom';
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
            const res = response.clone();
            const json = await response.json()

            if(response.ok){
                setDoctorRequests(json)
            }
            else if(!response.ok){
                alert(await res.text())
            }
        }

        fetchDoctorRequests()
    }, [])
    const handleBack=  () => {
      
      navigate('/Login');
  };

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
          <button className="back-btn" onClick={handleBack}>
                       Back
                    </button>
        </div>
      );
                }
export default DoctorRegistrationRequests;