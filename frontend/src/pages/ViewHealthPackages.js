import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PackageDetails from '../components/PackageDetails'

const HealthPackages = () => {
    const [healthPackages, setHealthPackages] = useState(null)
    const [subscribedPackage, setSubscribedPackage] = useState(null)
    const [selectedPackage, setSelectedPackage] = useState(null)
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
                if(healthPackages)
                for(const healthPackage in healthPackages){
                    if(healthPackage===subscribedPackage){
                        healthPackage.currentPlan = true
                    } else {
                        healthPackage.currentPlan = false
                    }
                }
            }
            else {
                setSubscribedPackage(null)
                setSelectedPackage(null)
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
    }, [])

    const handleSubmit = async () => {
        let url = "/HealthPackages/Subscribe"
        if(selectedPackage)
            url+= "?package=" + selectedPackage._id
        if(selectedFamilyMember)
            url+= "&familyMember=" + selectedFamilyMember._id
    }

    const selectFamilyMember = (familyMember) => {
        if(familyMember.healthPackage){
            setSubscribedPackage(familyMember.healthPackage.healthPackageID)
            setSelectedPackage(familyMember.healthPackage.healthPackageID)
        }
        setSelectedFamilyMember(familyMember)
    }

    return (
        <div className="healthPackages m-5">
            <h2>Select Family Member:</h2>
            <ul className="list-group">
                <li className="list-group-item">
                <button
                    className="btn btn-link"
                    onClick={() => fetchAll()} 
                    style={{ fontSize: "20px", textDecoration:"none" }}>
                    You {!selectedFamilyMember && <span>(selected)</span>}
                </button>
                </li>
                {familyMembers &&
                    familyMembers.map((familyMember) => (
                        <li key={familyMember._id} className="list-group-item">
                        <button
                            key={familyMember._id}
                            className="btn btn-link"
                            onClick={() => selectFamilyMember(familyMember)} 
                            style={{ fontSize: "20px", textDecoration:"none" }}>
                            {familyMember.name} {familyMember===selectedFamilyMember && <span>(selected)</span>}
                        </button>
                        </li>
                    ))}
            </ul>
            <br/>
            {subscribedPackage? <h2>Change Health Package:</h2>: <h2>Subscribe to a Health Package:</h2> }
            <div>
                {healthPackages && healthPackages.map((healthPackage) => (
                    <div
                    onClick={() => setSelectedPackage(healthPackage)}
                    style={{cursor: "pointer"}}
                    >
                    {selectedPackage===healthPackage?
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage===subscribedPackage} selected={true}/>:
                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage===subscribedPackage} selected={false}/>}
                    <br/>
                    </div>
                ))}
                {(selectedPackage && subscribedPackage!=selectedPackage)?
                    <button className="btn btn-success" onClick={() => handleSubmit()}>
                        Continue
                    </button>:
                    <button className="btn btn-success" disabled>
                        Continue
                    </button>
                }
            </div>
        </div>
    )
}

export default HealthPackages;