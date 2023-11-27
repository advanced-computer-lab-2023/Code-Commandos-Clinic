import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DoctorRequestDetails = ({ doctorRequest }) => {

    const handleAccept = async () => {
        try {
            const response = await fetch('/api/doctorRegistration/acceptDoctorRequests/'+doctorRequest._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Doctor request accepted successfully!');
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error accepting doctor request:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/api/doctorRegistration/rejectDoctorRequests/${doctorRequest._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Doctor request rejected successfully!');
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error rejecting doctor request:', error);
        }
    };

    const [idFileInfo, setIdFileInfo] = useState({ fileName: '', filePath: '' });
    const [licenseFileInfo, setLicenseFileInfo] = useState({ fileName: '', filePath: '' });
    const [degreeFileInfo, setDegreeFileInfo] = useState({ fileName: '', filePath: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(doctorRequest)
                // Fetch file names based on file IDs
                const idFileInfoResponse = await axios.get(`/api/file/getFileById/${doctorRequest.medicalID}`);
                const licenseFileInfoResponse = await axios.get(`/api/file/getFileById/${doctorRequest.medicalLicenses}`);
                const degreeFileInfoResponse = await axios.get(`/api/file/getFileById/${doctorRequest.medicalDegree}`);
            
                // Set file names in state
                setIdFileInfo({
                    fileName: idFileInfoResponse.data.fileName,
                    filePath: idFileInfoResponse.data.filePath,
                });
                setLicenseFileInfo({
                    fileName: licenseFileInfoResponse.data.fileName,
                    filePath: licenseFileInfoResponse.data.filePath,
                });
                setDegreeFileInfo({
                    fileName: degreeFileInfoResponse.data.fileName,
                    filePath: degreeFileInfoResponse.data.filePath,
                });
        
            } catch (error) {
                console.error('Error fetching file names:', error.message);
            }
        };

        fetchData();
    }, [doctorRequest.medicalID, doctorRequest.medicalLicenses, doctorRequest.medicalDegree]);

    const createFileLink = (fileInfo) => {
        return (
            <a href={`http://localhost:4000${fileInfo.filePath}`} target="_blank" rel="noopener noreferrer">
                {fileInfo.fileName}
            </a>
        );
    };


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title" style={{ color: '#1aac83' }}>{doctorRequest.name}</h5>
                <p className="card-text">Username: {doctorRequest.username}</p>
                <p className="card-text">Email: {doctorRequest.email}</p>
                <p className="card-text">Date of Birth: {doctorRequest.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${doctorRequest.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {doctorRequest.affiliation}</p>
                <p className="card-text">Educational Background: {doctorRequest.educationalBackground}</p>
                <p className="card-text">Speciality: {doctorRequest.speciality}</p>
                <p className="card-text">Medical ID: {createFileLink(idFileInfo)}</p>
                <p className="card-text">Medical License: {createFileLink(licenseFileInfo)}</p>
                <p className="card-text">Medical Degree: {createFileLink(degreeFileInfo)}</p>
                <p className="card-text">Request Status: {doctorRequest.status}</p>
                <p className="card-text">Created At: {doctorRequest.createdAt}</p>
                <button className="btn btn-success" onClick={handleAccept}>Accept</button>
                <button className="btn btn-danger" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default DoctorRequestDetails;