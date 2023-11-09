import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {currentPassword:currentPassword,newPassword:newPassword,confirmPassword:confirmPassword}
        try{
            const response = await fetch('api/user/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                console.log(responseData);
                window.localStorage.removeItem("logged");
                alert(responseData);
                navigate('/Login')
            } else {
                alert(responseData.error);
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    return (
        <div className="container justify-content-center">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5 card border-danger box">
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                required={true}
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                required={true}
                                type="password"
                                className="form-control"
                                id="newPassword"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                required={true}
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-danger buttons">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
