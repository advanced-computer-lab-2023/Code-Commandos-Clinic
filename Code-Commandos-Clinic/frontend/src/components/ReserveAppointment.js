import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
        const body = { id: id, familyMemberId: selectedMemberId };
        console.log("member id is ", selectedMemberId);
        console.log(body.id);
        try {
            const response = await axios.put(`/api/appointment/reserveAppointment/${paymentMethod}`, body);
            if (paymentMethod === "credit_card") {
                if (response.status === 200) {
                    const session = response.data;
                    window.location.href = session.url;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.msg,
                    });
                }
            } else {
                if (response.status === 200) {
                    navigate('/AppointmentSuccess');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.msg,
                    });
                    console.log(response.data);
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Wallet balance insufficient',
            });
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
        <div className="container red-text text-center">
            <h2 className="mb-4">
                <hr className="lineAround"></hr>Reserve Appointment<hr className="lineAround"></hr>
            </h2>

            <div className="form-group blue-text">
                <label htmlFor="familyMemberSelect">Choose to Reserve Appointment for Myself or Different ID</label>
                <select
                    id="familyMemberSelect"
                    name="familyMemberSelect"
                    value={selectedMemberId}
                    onChange={handleMemberSelect}
                    className="form-control"
                >
                    <option value="Myself">Current ID</option>
                    {members && members.map((familyMember) => (
                    <option key={familyMember._id} value={familyMember._id}>
                            {familyMember.name}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div className="healthPackages m-5 text-center">
<h2 className="mb-4"><hr className="lineAround"></hr>Select Payment Method<hr className="lineAround"></hr></h2>
                <div className="payment-methods-box">
                    <div className="row">
                        <div className="col-md-6">
                  <div style={{ border: '4px solid lightblue', borderRadius: '8px', padding: '30px', backgroundColor: 'white', width: '400px', marginRight: '100px',marginTop:'50px', height:'400px' }}>

                            <button
                                className={`btn btn-link ${paymentMethod === "wallet" && "selected"}`}
                                onClick={() => setPaymentMethod("wallet")}
                            >
                                Pay with Wallet (Current balance: {}) {paymentMethod === "wallet" && <span>(selected)</span>}
                            </button>
                            <img
                                         src={process.env.PUBLIC_URL + `/wallet1.gif`}
                                          style={{
                                          maxWidth: '300px',   // Adjust the maximum width as needed
                                          height: '',
                                          float: 'right',      // Float the image to the right
                                          marginRight: '10px', // Adjust the right margin as needed
                                          marginTop:'50px'

                                          }}
                                          />
                        </div>
                                                        </div>

                        <div className="col-md-6">
                  <div style={{ border: '4px solid lightblue', borderRadius: '8px', padding: '30px', backgroundColor: 'white', width: '400px', marginLeft: '300px',marginTop:'50px',height:'400px' }}>

                            <button
                                className={`btn btn-link ${paymentMethod === "credit_card" && "selected"}`}
                                onClick={() => setPaymentMethod("credit_card")}
                            >
                                Pay with Credit Card (Stripe) {paymentMethod === "credit_card" && <span>(selected)</span>}
                            </button>
                            <img
                             src={process.env.PUBLIC_URL + `/credit.gif`}
                             style={{
                             maxWidth: '300px',   // Adjust the maximum width as needed
                             height: '',
                             float: 'right',      // Float the image to the right
                             marginRight: '10px',  // Adjust the right margin as needed
                             marginTop:'50px'
                             }}
                           />
                            </div>

                        </div>
                    </div>
                </div>
                <br />

                {paymentMethod && (
                    <button className="btn btn-success text-center" onClick={() => handleReserve()}>
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReserveAppointment;
