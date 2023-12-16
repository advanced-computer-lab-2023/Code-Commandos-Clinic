import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import PackageDetails from '../components/PackageDetails'

const HealthPackages = () => {
    const [healthPackages, setHealthPackages] = useState(null)
    const [discountedHealthPackages, setDiscountedHealthPackages] = useState(null)
    const [subscribedPackage, setSubscribedPackage] = useState({})
    const [subscribedPackageStatus, setSubscribedPackageStatus] = useState({})
    const [selectedPackage, setSelectedPackage] = useState({})
    const [familyMembers, setFamilyMembers] = useState(null)
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)
    const navigate = useNavigate()

    const fetchAll = () => {
        const fetchSubscribedPackage = async () => {
            const response = await fetch('api/healthPackagePatient/getSubscribedPackage')

            if(response.ok){
                const json = await response.json()
                setSubscribedPackage(json)
                setSelectedPackage(json)
            }
            else {
                setSubscribedPackage({})
                setSelectedPackage({})
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }
        const fetchFamilyMembers = async () => {
            const response = await fetch('api/familyMember/getSubscribedPackagesForFamilyMembers')

            if(response.ok){
                const json = await response.json()
                setFamilyMembers(json)
            }
            else {
                setFamilyMembers(null)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }
        fetchSubscribedPackage()
        fetchFamilyMembers()
        setSelectedFamilyMember(null)
    }

    useEffect(() => {
        fetchAll()
        const fetchSubscribedPackageStatus = async () => {
            const response = await fetch('api/healthPackagePatient/getSubscribedPackageStatus')

            if(response.ok){
                const json = await response.json()
                setSubscribedPackageStatus(json)
            }
            else {
                setSubscribedPackageStatus({})
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }
        const fetchHealthPackages = async () => {
            const response = await fetch('api/healthPackage/getPackages')

            if(response.ok){
                const json = await response.json()
                setHealthPackages(json)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }
        const fetchDiscountedHealthPackages = async () => {
            const response = await fetch('api/healthPackage/getPackagesWithDiscount')

            if(response.ok){
                const json = await response.json()
                setDiscountedHealthPackages(json)
            }
            else {
                setDiscountedHealthPackages(null)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }
        fetchSubscribedPackageStatus()
        fetchHealthPackages()
        fetchDiscountedHealthPackages()
    }, [])

    const handleSubmit = async () => {
        let url = "/HealthPackages/Subscribe"
        if(selectedPackage)
            url+= "?package=" + selectedPackage._id
        if(selectedFamilyMember)
            url+= "&familyMember=" + selectedFamilyMember._id
        navigate(url)
    }

    const handleDelete = async () => {
        const familyMemberID = selectedFamilyMember? selectedFamilyMember._id: "user"
        const response = await fetch(`http://localhost:3000/api/healthPackagePatient/cancelSubscription/${familyMemberID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: await response.text(),
            });
            window.location.reload()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: await response.text(),
            });
        }
    }

    const selectFamilyMember = (familyMember) => {
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
                    {(subscribedPackageStatus._id&&subscribedPackageStatus.status==="SUBSCRIBED")?
                        <span><span className="badge bg-primary"><b>{subscribedPackageStatus.status}</b></span> <span className="badge bg-primary"><b>renews {(new Date(subscribedPackageStatus.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                        :(subscribedPackageStatus._id&&subscribedPackageStatus.status==="CANCELLED")?
                            <span><span className="badge bg-danger"><b>{subscribedPackageStatus.status}</b></span> <span className="badge bg-danger"><b>ends {(new Date(subscribedPackageStatus.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                            :
                            <span className="badge bg-secondary"><b>UNSUBSCRIBED</b></span>
                    }
                </li>
                {familyMembers &&
                    familyMembers.map((familyMember) => (
                        <div key={familyMember._id}><li key={familyMember._id} className="list-group-item">
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
                                {(familyMember.healthPackage&&familyMember.healthPackage.status==="SUBSCRIBED")?
                                    <span><span className="badge bg-primary"><b>{familyMember.healthPackage.status}</b></span> <span className="badge bg-primary"><b>renews {(new Date(familyMember.healthPackage.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                                    :(familyMember.healthPackage&&familyMember.healthPackage.status==="CANCELLED")?
                                        <span><span className="badge bg-danger"><b>{familyMember.healthPackage.status}</b></span> <span className="badge bg-danger"><b>ends {(new Date(familyMember.healthPackage.renewalDate)).toLocaleDateString("en-GB")}</b></span></span>
                                        :
                                        <span className="badge bg-secondary"><b>UNSUBSCRIBED</b></span>
                                }
                            </li></div>
                    ))}

                <br/><li className="list-group-item">
                {subscribedPackage && subscribedPackage._id?
                    <h4>Change or Cancel Current Health Package:</h4>: <h4>Subscribe to a Health Package:</h4>
                }
                <div>
                    {(discountedHealthPackages&&selectedFamilyMember)?
                        discountedHealthPackages.map((healthPackage) => (
                            <div
                                onClick={() => setSelectedPackage(healthPackage)}
                                style={{cursor: "pointer"}}
                                key={healthPackage._id}
                            >
                                {selectedPackage._id===healthPackage._id?
                                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={true}/>:
                                    <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={false}/>}
                                <br/>
                            </div>
                        ))
                        :healthPackages?
                            healthPackages.map((healthPackage) => (
                                <div
                                    onClick={() => setSelectedPackage(healthPackage)}
                                    style={{cursor: "pointer"}}
                                    key={healthPackage._id}
                                >
                                    {selectedPackage._id===healthPackage._id?
                                        <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={true}/>:
                                        <PackageDetails key={healthPackage._id} healthPackage={healthPackage} currentPlan={healthPackage._id===subscribedPackage._id} selected={false}/>}
                                    <br/>
                                </div>
                            ))
                            :<br/>}
                    {(selectedPackage._id && subscribedPackage._id!==selectedPackage._id)?
                        <button className="btn btn-success" onClick={() => handleSubmit()}>
                            Continue
                        </button>
                        :
                        <button className="btn btn-success" disabled>
                            Continue
                        </button>
                    }&nbsp;
                    {(subscribedPackage._id&&( (selectedFamilyMember&&selectedFamilyMember.healthPackage.status!=="CANCELLED")||(!selectedFamilyMember&&subscribedPackageStatus.status!=="CANCELLED") )) &&
                        <button className="btn btn-danger" onClick={() => handleDelete()}>
                            Cancel Subscription
                        </button>
                    }
                </div></li>
            </ul>
        </div>
    )
}

export default HealthPackages;