import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ReserveAppointment = () => {
    const { id} = useParams()
    console.log("app id is ",id)
    const [members,setMembers] = useState([])
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [selectedMemberId,setSelectedMemberId] = useState(null)
    const navigate = useNavigate()
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
        console.log(body.id)
        try {
            const response = await axios.put(`/api/appointment/reserveAppointment/${paymentMethod}`, body)
            if(paymentMethod==="credit_card"){
                if(response.status===200){
                    const session = response.data
                    window.location.href = session.url;
                } else {
                    alert(response.data.msg)
                }
            } else {
                if(response.status===200){
                    navigate('/AppointmentSuccess')
                } else {
                    alert(response.data.msg)
                    console.log(response.data)
                }
            }
            
        }
        catch (error){
            alert("Wallet balance insufficient")
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
            <div className="healthPackages m-5">
            <h2>Select Payment Method:</h2>
            <ul className="list-group">
                <li className="list-group-item">
                <button
                    className="btn btn-link"
                    onClick={() => setPaymentMethod("wallet")} 
                    style={{ fontSize: "20px", textDecoration:"none" }}>
                    Pay with Wallet (Current balance: {}) {paymentMethod==="wallet" && <span>(selected)</span>}
                </button>
                </li>
                <li className="list-group-item">
                <button
                    className="btn btn-link"
                    onClick={() => setPaymentMethod("credit_card")} 
                    style={{ fontSize: "20px", textDecoration:"none" }}>
                    Pay with Credit Card (Stripe) {paymentMethod==="credit_card" && <span>(selected)</span>}
                </button>
                </li>
            </ul>
            <br/>
            {paymentMethod &&
                <button className="btn btn-success" onClick={() => handleReserve()}>
                    Continue
                </button>
            }
        </div>

        </div>
    );
};

export default ReserveAppointment;
