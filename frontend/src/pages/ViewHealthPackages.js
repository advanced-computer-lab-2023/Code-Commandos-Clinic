import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

import PackageDetails from '../components/PackageDetails'

const HealthPackages = () => {
    const [healthPackages, setHealthPackages] = useState(null)
    const [subscribedPackage, setSubscribedPackage] = useState({})
    const [subscribedPackageStatus, setSubscribedPackageStatus] = useState({})
    const [selectedPackage, setSelectedPackage] = useState({})
    const [familyMembers, setFamilyMembers] = useState(null)
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)
    const navigate = useNavigate()

    const fetchAll = () => {
        const fetchHealthPackages = async () => {
            const response = await fetch('api/healthPackage/getPackages')
            const json = await response.json()

            if(response.ok){
                setHealthPackages(json)
            }
            else if(!response.ok){
                alert(await response.text())
            }
        }
        const fetchSubscribedPackage = async () => {
            const response = await fetch('api/healthPackagePatient/getSubscribedPackage')
            const json = await response.json()

            if(response.ok){
                setSubscribedPackage(json)
                setSelectedPackage(json)
            }
            else {
                setSubscribedPackage({})
                setSelectedPackage({})
            }
        }
        const fetchFamilyMembers = async () => {
            const response = await fetch('api/familyMember/getSubscribedPackagesForFamilyMembers')
            const json = await response.json()

            if(response.ok){
                setFamilyMembers(json)
            }
            else {
                setFamilyMembers(null)
            }
        }
        fetchHealthPackages()
        fetchSubscribedPackage()
        fetchFamilyMembers()
        setSelectedFamilyMember(null)
    }

    useEffect(() => {
        fetchAll()
        const fetchSubscribedPackageStatus = async () => {
            const response = await fetch('api/healthPackagePatient/getSubscribedPackageStatus')
            const json = await response.json()

            if(response.ok){
                setSubscribedPackageStatus(json)
            }
            else {
                setSubscribedPackageStatus({})
            }
        }
        fetchSubscribedPackageStatus()
    }, [])

    const handleSubmit = async () => {
        let url = "/HealthPackages/Subscribe"
        if(selectedPackage)
            url+= "?package=" + selectedPackage._id
        if(selectedFamilyMember)
            url+= "&familyMember=" + selectedFamilyMember._id
        navigate(url)
    }

    const selectFamilyMember = (familyMember) => {
        console.log(familyMember.healthPackage)
        if(familyMember.healthPackage){
            setSubscribedPackage(familyMember.healthPackage.healthPackageID)
            setSelectedPackage(familyMember.healthPackage.healthPackageID)
        } else {
            setSubscribedPackage({})
            setSelectedPackage({})
        }
        setSelectedFamilyMember(familyMember)
    }

    return (
        <div className="healthPackages m-5">
            <h3>Select Family Member:</h3>
            <ul className="list-group">
                <li className="list-group-item">
                <button
                    className="btn btn-link"
                    onClick={() => fetchAll()} 
                    style={{ fontSize: "20px", textDecoration:"none" }}>
                    You {!selectedFamilyMember && <b>(selected)</b>}
                </button>
                </li>
                <li className="list-group-item">
                    Subscription Status:&nbsp;
                    {subscribedPackageStatus._id? 
                    <span><span className="badge bg-primary"><b>{subscribedPackageStatus.status}</b></span> <span className="badge bg-primary"><b>{(new Date(subscribedPackageStatus.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>: 
                    <span className="badge bg-secondary"><b>UNSUBSCRIBED</b></span>}
                </li>
                {familyMembers &&
                    familyMembers.map((familyMember) => (
                        <div><li key={familyMember._id} className="list-group-item">
                        <button
                            key={familyMember._id}
                            className="btn btn-link"
                            onClick={() => selectFamilyMember(familyMember)} 
                            style={{ fontSize: "20px", textDecoration:"none" }}>
                            {familyMember.name} {familyMember===selectedFamilyMember && <b>(selected)</b>}
                        </button>
                        </li>
                        <li className="list-group-item">
                            Subscription Status: &nbsp;
                            {familyMember.healthPackage? 
                            <span><span className="badge bg-primary"><b>{familyMember.healthPackage.status}</b></span> <span className="badge bg-primary"><b>{(new Date(familyMember.healthPackage.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>: 
                            <span className="badge bg-secondary"><b>UNSUBSCRIBED</b></span>}
                        </li></div>
                    ))}
            
            <br/><li className="list-group-item">
            {subscribedPackage._id? <h4>Change or Cancel Current Health Package:</h4>: <h4>Subscribe to a Health Package:</h4> }
            <div>
                {healthPackages && healthPackages.map((healthPackage) => (
                    <div
                    onClick={() => setSelectedPackage(healthPackage)}
                    style={{cursor: "pointer"}}
                    >
                    {selectedPackage._id===healthPackage._id?
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={true}/>:
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={false}/>}
                    <br/>
                    </div>
                ))}
                {(selectedPackage._id && subscribedPackage._id!=selectedPackage._id)?
                    <button className="btn btn-success" onClick={() => handleSubmit()}>
                        Continue
                    </button>:
                    <button className="btn btn-success" disabled>
                        Continue
                    </button>
                }
            </div></li>
            </ul>
        </div>
    )
}

export default HealthPackages;