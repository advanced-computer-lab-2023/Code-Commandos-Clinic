import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const ReserveAppointment = () => {
    const {id} = useParams()
    console.log("app id is ",id)
    const [members,setMembers] = useState([])
    const [selectedMemberId,setSelectedMemberId] = useState(null)
    useEffect(() => {
        fetchMembers()
    }, []);

    const fetchMembers = async () =>{
        try {
            const response = await axios.get('/api/familyMember/getFamilyMembers')
            if (response.status === 200) {
                const result = response.data
                setMembers(result)
            } else {
                alert(response.data)
            }
        }
        catch (error){
            alert(error.message)
        }
    }

    const handleReserve = async () => {
        const body = {id: id, familyMemberId: selectedMemberId}
        console.log("member id is ",selectedMemberId)
        try {
            const response = await axios.put('/api/appointment/reserveAppointment', body)
            if (response.status === 200) {
                alert("Appointment reserved successfully")
            } else {
                alert(response.data)
            }
        }
        catch (error){
            alert(error.message)
        }
    }

    const handleMemberSelect = (e) => {
        if (e.target.value === 'Myself') {
            setSelectedMemberId(null);
        } else {
            setSelectedMemberId(e.target.value);
        }
    };

    return (
        <div className="container">
            <h2>Reserve Appointment</h2>
            <div className="form-group">
                <label htmlFor="familyMemberSelect">Reserve for your self or select a family member</label>
                <select
                    id="familyMemberSelect"
                    name="familyMemberSelect"
                    value={selectedMemberId}
                    onChange={handleMemberSelect}
                    className="form-control"
                >
                    <option value="Myself">Myself</option>
                    {members && members.map((familyMember) => (
                        <option key={familyMember._id} value={familyMember._id}>
                            {familyMember.name}
                        </option>
                    ))}
                </select>
            </div>
            <br/>
            <button onClick={handleReserve} className="btn btn-success">
                Confirm Reservation
            </button>
        </div>
    );
};

export default ReserveAppointment;
