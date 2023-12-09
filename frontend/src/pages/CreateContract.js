import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateContract = () => {
    const [doctors,setDoctors] = useState([])
    const [selectedDoctorId,setSelectedDoctorId] = useState(null)
    const [monthlySalary, setMonthlySalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const [markup, setMarkup] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetchDoctors()
    }, []);

    const fetchDoctors = async () =>{
        try {
            const response = await axios.get('/api/doctor/getDoctors')
            if (response.status === 200) {
                const result = response.data
                setDoctors(result)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response.text(),
                  });
            }
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
            console.error(error);
            // Handle any other necessary error logic here
        }
    };
    const handleBack=  () => {
      
        navigate('/Login');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const contractData = {
                doctor: selectedDoctorId,
                monthlySalary,
                startDate,
                endDate,
                responsibilities,
                termsAndConditions,
                markup,
            };
            console.log(contractData);
            const response = await fetch('/api/employmentContract/createContracts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contractData),
            });
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Employment contract created.',
                    showConfirmButton: true,
               
                    
                });
            } else {
                const errorText = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorText,
                });
            }
        } catch (error) {
            console.error('Error creating employment contract:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while creating the employment contract.',
            });
        }
    };
    

    return (
        <div class="contract-page">
        <div className="container">
        <div className="col-lg-8">
        <div className="container">

       
                <form onSubmit={handleSubmit}>
                <h2 className="mb-4"><hr className="lineAround"></hr>create contract<hr className="lineAround"></hr></h2>
      
               
        
            <div className="box">
                <div className="col-md-8 mb-3">
                        <label htmlFor="doctor" className="form-label">
                            Select Doctor:
                        </label>
                        <select
                            name="doctor"
                            value={selectedDoctorId}
                            onChange={(e) => setSelectedDoctorId(e.target.value)}
                            className="form-select"
                          
                        >
                            <option value="" disabled>
                                Select a doctor
                            </option>
                            {doctors && doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-8 mb-3">
                        <label htmlFor="monthlySalary" className="form-label">
                            Monthly Salary:
                        </label>
                        <input
                            type="number"
                            name="monthlySalary"
                            value={monthlySalary}
                            onChange={(e) => setMonthlySalary(e.target.value)}
                            className="form-control"
                            
                        />
                    </div>
                    <div className="col-md-8 mb-3">
                        <label htmlFor="startDate" className="form-label">
                            Start Date:
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="form-control"
                            
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <label htmlFor="endDate" className="form-label">
                            End Date:
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="form-control"
                            
                        />
                    </div>

                    <div className="col-md-8 mb-3">
                        <label htmlFor="responsibilities" className="form-label">
                            Responsibilities:
                        </label>
                        <textarea
                            name="responsibilities"
                            value={responsibilities}
                            onChange={(e) => setResponsibilities(e.target.value)}
                            className="form-control"
                           
                        ></textarea>
                    </div>

                    <div className="col-md-8 mb-3">
                        <label htmlFor="termsAndConditions" className="form-label">
                            Terms and Conditions:
                        </label>
                        <textarea
                            name="termsAndConditions"
                            value={termsAndConditions}
                            onChange={(e) => setTermsAndConditions(e.target.value)}
                            className="form-control"
                            
                        ></textarea>
                    </div>

                    <div className="col-md-8 mb-3">
                        <label htmlFor="markup" className="form-label">
                            Markup:
                        </label>
                        <input
                            type="number"
                            name="markup"
                            value={markup}
                            onChange={(e) => setMarkup(e.target.value)}
                            className="form-control"
                            
                        />
                    </div>
                    </div>
                   
                    

                    <div>
               <button type="submit" button className="button-reg ">Create</button>
                </div>
                <button className="back-btn" onClick={handleBack}>
                       Back
                    </button>
                </form>
        </div>
        </div>
         </div>
        </div>
     
    );
};

export default CreateContract;
