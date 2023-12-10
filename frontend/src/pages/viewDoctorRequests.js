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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
                    </button>
        </div>
      );
                }
export default DoctorRegistrationRequests;