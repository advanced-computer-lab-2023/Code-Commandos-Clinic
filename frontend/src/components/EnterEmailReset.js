import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const EnterEmailReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async () => {
        const response = await axios.post('api/user/generateOTP',{email:email})
        if(response.status == 200){
            navigate('/ResetPassword')
        }
        else {
            alert(response.data)
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 border-danger box">
                        <h1 className="text-center">Get OTP</h1>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        required={true}
                                        type="email"
                                        className="form-control input-danger fontMed"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <br />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block buttons"
                                    onClick={handleSubmit}
                                >
                                    Send OTP
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterEmailReset;
