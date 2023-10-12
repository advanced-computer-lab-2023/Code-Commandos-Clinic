import React, { useState } from 'react';
const PreviousAppointments = ({appointment}) => {
    const[result,setResults]=useState(null)
    const fetchResults= async() =>{
        try{
           const doctorid=appointment.doctorid
           const patientid=appointment.patientid
            let url = 'api/appointment/getAppointment/'
           url+=`${patientid}`
           url+="/"
           url+=`${doctorid}`
            const response = await fetch (url,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        })
        if (response.ok){
            const results = await response.json();
            setResults(results)
        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage)
            throw new Error(errorMessage)
        }
        }
        catch (error){
            console.log(error)
        }
    }
    fetchResults()
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">AllergicHistory: </p>
                <p className="card-text">Main Complaint:</p>
                <p className="card-text">Blood Type: </p>
            </div>
        </div>
        );
    }
   

   
    

 
export default PreviousAppointments ;